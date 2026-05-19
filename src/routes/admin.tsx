import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, Building2, Activity, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Anderoute" }] }),
  component: AdminDashboard,
});

type RoleRow = { role: string };

function AdminDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"checking" | "ok" | "denied">("checking");
  const [stats, setStats] = useState<{ users: number; companies: number; admins: number } | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!user) {
        navigate({ to: "/admin-login" });
        return;
      }
      const mustChange = Boolean(
        (user.user_metadata as { must_change_password?: boolean } | null)
          ?.must_change_password,
      );
      if (mustChange) {
        navigate({ to: "/admin-change-password" });
        return;
      }
      await supabase.rpc("bootstrap_demo_membership");
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .in("role", ["admin", "owner"]);

      if (!active) return;
      if (error || !data || data.length === 0) {
        setStatus("denied");
        return;
      }
      setStatus("ok");

      const [{ count: usersCount }, { count: companiesCount }, { count: adminsCount }] =
        await Promise.all([
          supabase.from("profiles").select("*", { count: "exact", head: true }),
          supabase.from("companies").select("*", { count: "exact", head: true }),
          supabase
            .from("user_roles")
            .select("*", { count: "exact", head: true })
            .in("role", ["admin", "owner"]),
        ]);
      if (!active) return;
      setStats({
        users: usersCount ?? 0,
        companies: companiesCount ?? 0,
        admins: adminsCount ?? 0,
      });
    })();
    return () => {
      active = false;
    };
  }, [user, navigate]);

  if (status === "checking") {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">
        Verifying admin access…
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-4">
        <div className="max-w-md space-y-4 rounded-2xl border border-border bg-card p-8 text-center shadow-xl">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-destructive/10 text-destructive">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-lg font-semibold text-foreground">Admin access required</h1>
          <p className="text-sm text-muted-foreground">
            Your account doesn't have admin or owner privileges for this workspace.
          </p>
          <div className="flex justify-center gap-2">
            <Button asChild variant="outline">
              <Link to="/">Back to app</Link>
            </Button>
            <Button onClick={() => signOut().then(() => navigate({ to: "/admin-login" }))}>
              Sign out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-foreground">Anderoute Admin</h1>
              <p className="text-xs text-muted-foreground">Signed in as {user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/">Open app</Link>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => signOut().then(() => navigate({ to: "/admin-login" }))}
            >
              <LogOut className="mr-1.5 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        <section>
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Workspace overview
          </h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <StatTile icon={<Users className="h-4 w-4" />} label="Users" value={stats?.users} />
            <StatTile icon={<Building2 className="h-4 w-4" />} label="Companies" value={stats?.companies} />
            <StatTile icon={<Activity className="h-4 w-4" />} label="Admins & owners" value={stats?.admins} />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-base font-semibold text-foreground">Quick actions</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Admin tooling lives here. Add user management, role assignments, and audit logs as the
            platform grows.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm"><Link to="/drivers">Manage drivers</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/dispatch">Dispatch board</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/analytics">Analytics</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/settings">Settings</Link></Button>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatTile({ icon, label, value }: { icon: React.ReactNode; label: string; value?: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <div className="mt-2 text-2xl font-semibold text-foreground">
        {value ?? "—"}
      </div>
    </div>
  );
}
