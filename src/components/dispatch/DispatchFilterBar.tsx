import { Search } from "lucide-react";

interface Props {
  filterSearch: string;
  onFilterSearch: (v: string) => void;
  driverStatus: string;
  onDriverStatus: (v: string) => void;
  loadStatus: string;
  onLoadStatus: (v: string) => void;
  loadType: string;
  onLoadType: (v: string) => void;
  vehicleType: string;
  onVehicleType: (v: string) => void;
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 rounded-md border border-slate-200 bg-white px-2.5 text-xs text-slate-700 focus:border-teal-400 focus:outline-none"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function DispatchFilterBar(p: Props) {
  return (
    <div className="flex h-full items-center gap-2 border-b border-slate-200 bg-slate-50/60 px-5">
      <div className="relative w-72">
        <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
        <input
          value={p.filterSearch}
          onChange={(e) => p.onFilterSearch(e.target.value)}
          placeholder="Search driver, load, customer, city…"
          className="h-8 w-full rounded-md border border-slate-200 bg-white pl-8 pr-2 text-xs placeholder:text-slate-400 focus:border-teal-400 focus:outline-none"
        />
      </div>

      <Select
        value={p.driverStatus}
        onChange={p.onDriverStatus}
        options={[
          { value: "all", label: "Driver Status (All)" },
          { value: "available", label: "Available" },
          { value: "assigned", label: "Assigned" },
          { value: "loaded", label: "Loaded" },
          { value: "break", label: "Break" },
          { value: "alert", label: "Alert" },
          { value: "offline", label: "Offline" },
        ]}
      />

      <Select
        value={p.loadType}
        onChange={p.onLoadType}
        options={[
          { value: "all", label: "Load Type (All)" },
          { value: "ftl", label: "FTL" },
          { value: "ltl", label: "LTL" },
          { value: "hotshot", label: "Hotshot" },
          { value: "expedited", label: "Expedited" },
        ]}
      />

      <Select
        value={p.loadStatus}
        onChange={p.onLoadStatus}
        options={[
          { value: "all", label: "Load Status (All)" },
          { value: "pending", label: "Pending" },
          { value: "offered", label: "Offered" },
          { value: "accepted", label: "Accepted" },
          { value: "in_progress", label: "In Progress" },
          { value: "delivered", label: "Delivered" },
          { value: "cancelled", label: "Cancelled" },
        ]}
      />

      <Select
        value={p.vehicleType}
        onChange={p.onVehicleType}
        options={[
          { value: "all", label: "Vehicle Type (All)" },
          { value: "semi", label: "Semi" },
          { value: "hotshot", label: "Hotshot" },
          { value: "box_truck", label: "Box Truck" },
          { value: "cargo_van", label: "Cargo Van" },
          { value: "personal_vehicle", label: "Personal Vehicle" },
        ]}
      />

      <button className="ml-auto flex h-8 items-center gap-1.5 rounded-md bg-teal-500 px-3 text-xs font-medium text-white hover:bg-teal-600">
        <Search className="size-3.5" />
        Search
      </button>
    </div>
  );
}
