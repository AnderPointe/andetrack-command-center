import { Snowflake, Flame, FileSignature, PackageOpen, type LucideIcon } from "lucide-react";

interface Badge {
  icon: LucideIcon;
  label: string;
  cls: string;
}

const BADGES: Badge[] = [
  {
    icon: PackageOpen,
    label: "Fragile",
    cls: "bg-amber-500/15 text-amber-300 ring-amber-400/30",
  },
  {
    icon: Snowflake,
    label: "Temp Controlled",
    cls: "bg-sky-500/15 text-sky-300 ring-sky-400/30",
  },
  {
    icon: Flame,
    label: "Priority",
    cls: "bg-orange-500/15 text-orange-300 ring-orange-400/30",
  },
  {
    icon: FileSignature,
    label: "Signature Required",
    cls: "bg-teal-500/15 text-teal-300 ring-teal-400/30",
  },
];

export function CargoHandlingBadges() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {BADGES.map(({ icon: Icon, label, cls }) => (
        <span
          key={label}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ring-1 ${cls}`}
        >
          <Icon className="h-3 w-3" />
          {label}
        </span>
      ))}
    </div>
  );
}
