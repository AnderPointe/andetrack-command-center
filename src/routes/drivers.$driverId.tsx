import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { DriverProfilePage } from "@/components/driver-profile/DriverProfilePage";
import { useLiveDriverCurrent } from "@/hooks/useLiveDriverLocations";
import { MOCK_DISPATCH_DRIVERS } from "@/data/mockDispatchDrivers";
import { buildDriverProfileDemo } from "@/data/driverProfileDemo";
import type { DispatchDriver } from "@/types/dispatch";

export const Route = createFileRoute("/drivers/$driverId")({
  ssr: false,
  head: ({ params }) => ({
    meta: [
      { title: `Driver ${params.driverId} — Anderoute Profile` },
      {
        name: "description",
        content:
          "Full driver profile dashboard with live shipment, vehicle telemetry, ETA, route map, pickup and destination context.",
      },
    ],
  }),
  component: DriverProfileRouteComponent,
});

function DriverProfileRouteComponent() {
  const { driverId } = Route.useParams();
  const navigate = useNavigate();
  const { drivers: liveById } = useLiveDriverCurrent();

  const driver: DispatchDriver | undefined = useMemo(() => {
    const live = liveById[driverId];
    if (live) return live as DispatchDriver;
    return MOCK_DISPATCH_DRIVERS.find((d) => d.driver_id === driverId);
  }, [liveById, driverId]);

  if (!driver) {
    return (
      <div className="fixed inset-0 grid place-items-center bg-slate-950 text-slate-100">
        <div className="max-w-sm rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-center">
          <h2 className="text-lg font-bold">Driver not found</h2>
          <p className="mt-1 text-sm text-slate-400">
            Driver <span className="font-mono text-teal-300">{driverId}</span> is not in the current fleet.
          </p>
          <button
            onClick={() => navigate({ to: "/dispatch-board" })}
            className="mt-4 rounded-lg bg-teal-400 px-4 py-2 text-xs font-bold text-slate-950"
          >
            Back to dispatch
          </button>
        </div>
      </div>
    );
  }

  const profile = buildDriverProfileDemo(driver);
  return <DriverProfilePage driver={driver} profile={profile} />;
}
