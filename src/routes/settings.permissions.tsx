import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ShieldCheck, Save, RotateCcw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings/permissions")({
  head: () => ({ meta: [{ title: "Roles & Permissions — Anderoute" }] }),
  component: PermissionsPage,
});

const MODULES = [
  { key: "dispatch", label: "Dispatch" },
  { key: "drivers", label: "Drivers" },
  { key: "vehicles", label: "Vehicles" },
  { key: "reports", label: "Reports" },
  { key: "settings", label: "Settings" },
] as const;

const ACTIONS = [
  { key: "can_view", label: "View" },
  { key: "can_create", label: "Create" },
  { key: "can_edit", label: "Edit" },
  { key: "can_delete", label: "Delete" },
] as const;

type ActionKey = (typeof ACTIONS)[number]["key"];

type Role = {
  id: string;
  role_key: string;
  role_name: string;
  description: string | null;
  is_system_role: boolean | null;
  company_id: string | null;
};

type Perm = {
  can_view: boolean;
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
};

type Matrix = Record<string, Record<string, Perm>>; // [roleId][module] -> perm

const emptyPerm = (): Perm => ({
  can_view: false,
  can_create: false,
  can_edit: false,
  can_delete: false,
});

function PermissionsPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [matrix, setMatrix] = useState<Matrix>({});
  const [baseline, setBaseline] = useState<Matrix>({});
  const [activeRoleId, setActiveRoleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const [rolesRes, permsRes] = await Promise.all([
      supabase
        .from("roles")
        .select("id, role_key, role_name, description, is_system_role, company_id")
        .order("role_key"),
      supabase
        .from("role_permissions")
        .select("role_id, permission_key, can_view, can_create, can_edit, can_delete"),
    ]);

    if (rolesRes.error) {
      toast.error("Failed to load roles", { description: rolesRes.error.message });
      setLoading(false);
      return;
    }
    if (permsRes.error) {
      toast.error("Failed to load permissions", { description: permsRes.error.message });
      setLoading(false);
      return;
    }

    const rs = (rolesRes.data ?? []) as Role[];
    const next: Matrix = {};
    for (const r of rs) {
      next[r.id] = {};
      for (const m of MODULES) next[r.id][m.key] = emptyPerm();
    }
    for (const p of permsRes.data ?? []) {
      if (!next[p.role_id]) next[p.role_id] = {};
      next[p.role_id][p.permission_key] = {
        can_view: !!p.can_view,
        can_create: !!p.can_create,
        can_edit: !!p.can_edit,
        can_delete: !!p.can_delete,
      };
    }

    setRoles(rs);
    setMatrix(next);
    setBaseline(JSON.parse(JSON.stringify(next)));
    setActiveRoleId((prev) => prev ?? rs[0]?.id ?? null);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dirtyKeys = useMemo(() => {
    const out: { roleId: string; module: string }[] = [];
    for (const roleId of Object.keys(matrix)) {
      for (const m of MODULES) {
        const a = matrix[roleId]?.[m.key] ?? emptyPerm();
        const b = baseline[roleId]?.[m.key] ?? emptyPerm();
        if (
          a.can_view !== b.can_view ||
          a.can_create !== b.can_create ||
          a.can_edit !== b.can_edit ||
          a.can_delete !== b.can_delete
        ) {
          out.push({ roleId, module: m.key });
        }
      }
    }
    return out;
  }, [matrix, baseline]);

  const toggle = (roleId: string, module: string, action: ActionKey, value: boolean) => {
    setMatrix((prev) => {
      const role = { ...(prev[roleId] ?? {}) };
      const cur = { ...(role[module] ?? emptyPerm()) };
      cur[action] = value;
      // If higher action enabled, ensure view is on for sanity
      if (action !== "can_view" && value) cur.can_view = true;
      // If view disabled, clear other actions
      if (action === "can_view" && !value) {
        cur.can_create = false;
        cur.can_edit = false;
        cur.can_delete = false;
      }
      role[module] = cur;
      return { ...prev, [roleId]: role };
    });
  };

  const reset = () => {
    setMatrix(JSON.parse(JSON.stringify(baseline)));
  };

  const save = async () => {
    if (dirtyKeys.length === 0) return;
    setSaving(true);

    const payload = dirtyKeys.map(({ roleId, module }) => {
      const p = matrix[roleId][module];
      return {
        role_id: roleId,
        permission_key: module,
        can_view: p.can_view,
        can_create: p.can_create,
        can_edit: p.can_edit,
        can_delete: p.can_delete,
      };
    });

    // Delete then insert the changed rows (no unique index on (role_id, permission_key))
    const deletions = await Promise.all(
      dirtyKeys.map(({ roleId, module }) =>
        supabase
          .from("role_permissions")
          .delete()
          .eq("role_id", roleId)
          .eq("permission_key", module),
      ),
    );
    const delErr = deletions.find((d) => d.error);
    if (delErr?.error) {
      toast.error("Failed to save", { description: delErr.error.message });
      setSaving(false);
      return;
    }

    const { error } = await supabase.from("role_permissions").insert(payload);
    if (error) {
      toast.error("Failed to save", { description: error.message });
      setSaving(false);
      return;
    }

    toast.success(`Saved ${dirtyKeys.length} permission change${dirtyKeys.length === 1 ? "" : "s"}`);
    setSaving(false);
    await load();
  };

  const activeRole = roles.find((r) => r.id === activeRoleId) ?? null;
  const isDirty = dirtyKeys.length > 0;

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6 max-w-6xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <ShieldCheck className="size-6 text-teal" />
              Roles &amp; Permissions
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Configure what each role can view, create, edit and delete across modules.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={reset}
              disabled={!isDirty || saving}
            >
              <RotateCcw className="size-3.5" /> Reset
            </Button>
            <Button size="sm" onClick={save} disabled={!isDirty || saving}>
              {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
              {isDirty ? `Save ${dirtyKeys.length} change${dirtyKeys.length === 1 ? "" : "s"}` : "Saved"}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-xl border border-border bg-card p-10 flex items-center justify-center text-sm text-muted-foreground gap-2">
            <Loader2 className="size-4 animate-spin" /> Loading permissions…
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4">
            {/* Roles list */}
            <div className="rounded-xl border border-border bg-card overflow-hidden h-fit">
              <div className="px-3 py-2.5 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Roles ({roles.length})
              </div>
              <ul className="divide-y divide-border max-h-[70vh] overflow-y-auto">
                {roles.map((r) => {
                  const isActive = r.id === activeRoleId;
                  const roleDirty = dirtyKeys.some((d) => d.roleId === r.id);
                  return (
                    <li key={r.id}>
                      <button
                        onClick={() => setActiveRoleId(r.id)}
                        className={cn(
                          "w-full text-left px-3 py-2.5 hover:bg-secondary/40 transition flex items-center justify-between gap-2",
                          isActive && "bg-secondary/60",
                        )}
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate flex items-center gap-1.5">
                            {r.role_name}
                            {roleDirty && (
                              <span className="size-1.5 rounded-full bg-orange" title="Unsaved changes" />
                            )}
                          </div>
                          <div className="text-[11px] text-muted-foreground font-mono">{r.role_key}</div>
                        </div>
                        {r.is_system_role && (
                          <Badge variant="outline" className="text-[9px] uppercase tracking-wider">
                            System
                          </Badge>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Matrix for active role */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {activeRole ? (
                <>
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        {activeRole.role_name}
                        <span className="text-[11px] text-muted-foreground font-mono">
                          {activeRole.role_key}
                        </span>
                      </h3>
                      {activeRole.description && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {activeRole.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-secondary/30">
                          <th className="text-left px-4 py-2.5 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                            Module
                          </th>
                          {ACTIONS.map((a) => (
                            <th
                              key={a.key}
                              className="px-3 py-2.5 font-semibold text-xs uppercase tracking-wider text-muted-foreground text-center"
                            >
                              {a.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {MODULES.map((m) => {
                          const perm = matrix[activeRole.id]?.[m.key] ?? emptyPerm();
                          const base = baseline[activeRole.id]?.[m.key] ?? emptyPerm();
                          return (
                            <tr key={m.key} className="border-b border-border last:border-0 hover:bg-secondary/20">
                              <td className="px-4 py-3 font-medium">{m.label}</td>
                              {ACTIONS.map((a) => {
                                const checked = perm[a.key];
                                const changed = checked !== base[a.key];
                                return (
                                  <td key={a.key} className="px-3 py-3 text-center">
                                    <div className="inline-flex items-center justify-center">
                                      <Checkbox
                                        checked={checked}
                                        onCheckedChange={(v) =>
                                          toggle(activeRole.id, m.key, a.key, v === true)
                                        }
                                        className={cn(
                                          changed && "ring-2 ring-orange ring-offset-2 ring-offset-card",
                                        )}
                                      />
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="px-4 py-2.5 border-t border-border text-[11px] text-muted-foreground bg-secondary/20">
                    Tip: enabling Create / Edit / Delete automatically grants View. Disabling View clears the row.
                  </div>
                </>
              ) : (
                <div className="p-10 text-center text-sm text-muted-foreground">
                  Select a role to edit its permissions.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
