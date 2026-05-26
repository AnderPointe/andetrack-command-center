import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/context/ThemeContext";
import GlassDashboard from "@/components/anderroute/GlassDashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "CargoTrax · Control Logistics — AnderRoute" },
      {
        name: "description",
        content:
          "CargoTrax glass logistics control center: live cargo tracking, delivery map, revenue, and shipment reports.",
      },
    ],
  }),
  component: () => (
    <ThemeProvider>
      <GlassDashboard />
    </ThemeProvider>
  ),
});
