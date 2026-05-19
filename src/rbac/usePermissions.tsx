/**
 * Phase 6 — usePermissions hook + PermissionGate component.
 */
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { hasPermission, permissionsForRoles, type AppRole, type Permission } from "./permissions";

export function usePermissions() {
  const { user } = useAuth();
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) { setRoles([]); setLoading(false); return; }
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      if (!cancelled) {
        setRoles((data ?? []).map((r: { role: string }) => r.role as AppRole));
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [user?.id]);

  return {
    roles,
    loading,
    permissions: permissionsForRoles(roles),
    can: (p: Permission) => hasPermission(roles, p),
  };
}

export function PermissionGate({
  permission, fallback = null, children,
}: { permission: Permission; fallback?: React.ReactNode; children: React.ReactNode }) {
  const { can, loading } = usePermissions();
  if (loading) return null;
  return can(permission) ? <>{children}</> : <>{fallback}</>;
}
