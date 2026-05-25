import { createFileRoute } from "@tanstack/react-router";
import DispatchDashboard from "@/pages/DispatchDashboard";

export const Route = createFileRoute("/dispatch")({
  head: () => ({
    meta: [
      { title: "Dispatch — AnderRoute" },
      { name: "description", content: "AnderRoute dispatch command center for live driver tracking." },
    ],
  }),
  component: DispatchDashboard,
});
