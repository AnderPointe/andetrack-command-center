import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, KeyRound, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin-change-password")({
  head: () => ({ meta: [{ title: "Change password — Anderoute Admin" }] }),
  component: ChangePasswordPage,
});

const TEMP_PASSWORD = "Admin!2026Anderoute";

type Rule = { id: string; label: string; test: (pw: string) => boolean };

const RULES: Rule[] = [
  { id: "len", label: "At least 10 characters", test: (p) => p.length >= 10 },
  { id: "upper", label: "An uppercase letter (A–Z)", test: (p) => /[A-Z]/.test(p) },
  { id: "lower", label: "A lowercase letter (a–z)", test: (p) => /[a-z]/.test(p) },
  { id: "num", label: "A number (0–9)", test: (p) => /\d/.test(p) },
  { id: "sym", label: "A symbol (e.g. ! @ # $)", test: (p) => /[^A-Za-z0-9]/.test(p) },
  { id: "temp", label: "Different from the temporary password", test: (p) => p.length > 0 && p !== TEMP_PASSWORD },
];

function scorePassword(pw: string) {
  if (!pw) return 0;
  const passed = RULES.filter((r) => r.test(pw)).length;
  let score = passed; // 0..6
  if (pw.length >= 14) score += 1;
  if (pw.length >= 18) score += 1;
  return Math.min(score, 8);
}

const STRENGTH_LEVELS = [
  { min: 0, label: "Too weak", tone: "bg-destructive", text: "text-destructive" },
  { min: 4, label: "Weak", tone: "bg-orange-500", text: "text-orange-500" },
  { min: 6, label: "Good", tone: "bg-yellow-500", text: "text-yellow-600" },
  { min: 7, label: "Strong", tone: "bg-emerald-500", text: "text-emerald-600" },
  { min: 8, label: "Excellent", tone: "bg-emerald-600", text: "text-emerald-700" },
];

function levelFor(score: number) {
  return [...STRENGTH_LEVELS].reverse().find((l) => score >= l.min) ?? STRENGTH_LEVELS[0];
}

function ChangePasswordPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/admin-login" });
  }, [loading, user, navigate]);

  const checks = useMemo(() => RULES.map((r) => ({ ...r, passed: r.test(pw) })), [pw]);
  const score = useMemo(() => scorePassword(pw), [pw]);
  const level = levelFor(score);
  const allRulesPassed = checks.every((c) => c.passed);
  const matches = pw.length > 0 && pw === pw2;
  const canSubmit = allRulesPassed && matches && !busy;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!allRulesPassed) return setErr("Password doesn't meet all requirements yet.");
    if (!matches) return setErr("Passwords do not match.");

    setBusy(true);
    const { error } = await supabase.auth.updateUser({
      password: pw,
      data: { must_change_password: false },
    });
    setBusy(false);
    if (error) return setErr(error.message);
    navigate({ to: "/admin" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Set a new password</h1>
            <p className="text-xs text-muted-foreground">
              Required before you can access the admin console.
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="new-pw">New password</Label>
            <Input
              id="new-pw"
              type="password"
              autoComplete="new-password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              maxLength={128}
              required
            />

            {/* Strength meter */}
            <div className="pt-2">
              <div className="flex h-1.5 gap-1">
                {Array.from({ length: 4 }).map((_, i) => {
                  const seg = (i + 1) * 2; // 2,4,6,8
                  const active = score >= seg - 1;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "h-full flex-1 rounded-full transition-colors",
                        active ? level.tone : "bg-muted",
                      )}
                    />
                  );
                })}
              </div>
              <div className="mt-1.5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Password strength</span>
                <span className={cn("font-medium", pw ? level.text : "text-muted-foreground")}>
                  {pw ? level.label : "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="new-pw2">Confirm password</Label>
            <Input
              id="new-pw2"
              type="password"
              autoComplete="new-password"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              maxLength={128}
              required
            />
            {pw2.length > 0 && (
              <p
                className={cn(
                  "text-xs",
                  matches ? "text-emerald-600" : "text-destructive",
                )}
              >
                {matches ? "Passwords match" : "Passwords do not match"}
              </p>
            )}
          </div>

          {/* Checklist */}
          <ul className="space-y-1.5 rounded-md border border-border bg-muted/30 p-3">
            {checks.map((c) => (
              <li
                key={c.id}
                className={cn(
                  "flex items-center gap-2 text-xs",
                  c.passed ? "text-emerald-600" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "grid h-4 w-4 place-items-center rounded-full",
                    c.passed
                      ? "bg-emerald-500/15 text-emerald-600"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {c.passed ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                </span>
                <span>{c.label}</span>
              </li>
            ))}
          </ul>

          {err && (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {err}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={!canSubmit}>
            {busy ? "Updating password…" : "Update password & continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
