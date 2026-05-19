import type { PermissionStatus, PushProviderId } from "../types";

interface Props {
  permission: PermissionStatus;
  providerId: PushProviderId;
  hasToken: boolean;
}

export function PushTokenStatusBadge({ permission, providerId, hasToken }: Props) {
  const ok = permission === "granted" && hasToken;
  const tone = ok
    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
    : permission === "denied"
      ? "bg-rose-500/10 text-rose-300 border-rose-500/30"
      : "bg-amber-500/10 text-amber-300 border-amber-500/30";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] ${tone}`}>
      <span className="font-mono">{providerId}</span>
      <span>•</span>
      <span>{ok ? "token registered" : permission === "denied" ? "blocked" : "not registered"}</span>
    </span>
  );
}
