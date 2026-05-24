import { Crosshair, MapPin, Trash2, Maximize2, Layers } from "lucide-react";

interface Props {
  pinMode: boolean;
  onLocate: () => void;
  onTogglePin: () => void;
  onClearPins: () => void;
  onFullscreen: () => void;
}

export function MapLayerControls({
  pinMode,
  onLocate,
  onTogglePin,
  onClearPins,
  onFullscreen,
}: Props) {
  return (
    <div className="absolute left-4 top-4 z-[400] flex flex-col gap-1.5 rounded-xl border border-slate-200 bg-white/95 p-1.5 shadow-lg backdrop-blur">
      <Btn icon={Crosshair} label="Locate Me" onClick={onLocate} />
      <Btn
        icon={MapPin}
        label={pinMode ? "Click map to drop" : "Add Pin"}
        onClick={onTogglePin}
        active={pinMode}
      />
      <Btn icon={Trash2} label="Clear Pins" onClick={onClearPins} />
      <div className="my-0.5 h-px bg-slate-200" />
      <Btn icon={Layers} label="Layers" />
      <Btn icon={Maximize2} label="Fullscreen" onClick={onFullscreen} />
    </div>
  );
}

function Btn({
  icon: Icon,
  label,
  onClick,
  active,
}: {
  icon: typeof Crosshair;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`group relative grid size-9 place-items-center rounded-lg transition ${
        active
          ? "bg-orange-500 text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <Icon className="size-4" />
      <span className="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-[11px] font-medium text-slate-100 opacity-0 shadow-lg group-hover:opacity-100">
        {label}
      </span>
    </button>
  );
}
