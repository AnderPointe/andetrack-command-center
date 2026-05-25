import { useNavigate } from "@tanstack/react-router";

interface Driver {
  id: string;
  name: string;
  photoUrl: string;
  currentAssignment: string;
}

export function DriverCard({ driver }: { driver: Driver }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() =>
        navigate({ to: "/drivers/$driverId", params: { driverId: driver.id } })
      }
      className="w-full rounded-3xl border border-white/10 bg-slate-950 p-5 text-left text-white hover:border-orange-400/60"
    >
      <div className="flex items-center gap-4">
        <img
          src={driver.photoUrl}
          alt={driver.name}
          className="h-14 w-14 rounded-2xl object-cover"
        />
        <div>
          <p className="font-bold">{driver.name}</p>
          <p className="text-sm text-slate-400">{driver.currentAssignment}</p>
        </div>
      </div>
    </button>
  );
}
