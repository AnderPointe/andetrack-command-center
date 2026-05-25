import { CheckCircle2, Circle, Navigation2 } from "lucide-react";

const steps = [
  {
    label: "Pickup Assigned",
    description: "Load assigned to Marcus Anderson",
    time: "10:18 AM",
    state: "completed",
  },
  {
    label: "Driver En Route",
    description: "Driver is heading toward pickup location",
    time: "10:24 AM",
    state: "completed",
  },
  {
    label: "Loaded",
    description: "Cargo confirmed and secured",
    time: "10:52 AM",
    state: "completed",
  },
  {
    label: "In Transit",
    description: "Driver is currently moving toward destination",
    time: "Now",
    state: "current",
  },
  {
    label: "Near Destination",
    description: "Driver enters destination geofence",
    time: "Pending",
    state: "upcoming",
  },
  {
    label: "Delivered",
    description: "Customer signature and proof of delivery",
    time: "Pending",
    state: "upcoming",
  },
];

export default function RouteTimelineCard() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-5 text-white shadow-2xl">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
          Shipment Movement
        </p>
        <h2 className="mt-1 text-xl font-bold">Route Timeline</h2>
      </div>

      <div className="space-y-5">
        {steps.map((step, index) => {
          const isCurrent = step.state === "current";
          const isCompleted = step.state === "completed";

          return (
            <div key={step.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`grid h-9 w-9 place-items-center rounded-full ${
                    isCompleted
                      ? "bg-teal-500 text-white"
                      : isCurrent
                      ? "bg-orange-500 text-white shadow-[0_0_25px_rgba(249,115,22,0.7)]"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : isCurrent ? (
                    <Navigation2 className="h-5 w-5" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </div>

                {index !== steps.length - 1 && (
                  <div className="mt-2 h-10 w-px bg-white/10" />
                )}
              </div>

              <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{step.label}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {step.description}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500">{step.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
