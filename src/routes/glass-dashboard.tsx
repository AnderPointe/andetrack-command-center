import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/context/ThemeContext";
import GlassDashboard from "@/components/anderroute/GlassDashboard";

export const Route = createFileRoute("/glass-dashboard")({
  head: () => ({ meta: [{ title: "CargoTrax · Glass Logistics Dashboard" }] }),
  component: () => (
    <ThemeProvider>
      <GlassDashboard />
    </ThemeProvider>
  ),
});
