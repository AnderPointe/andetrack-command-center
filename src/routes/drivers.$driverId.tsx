import { createFileRoute } from "@tanstack/react-router";
import DriverProfileCommandView from "@/pages/DriverProfileCommandView";

export const Route = createFileRoute("/drivers/$driverId")({
  head: () => ({
    meta: [
      { title: "Driver Profile — AnderRoute" },
      { name: "description", content: "AnderRoute driver profile command view." },
    ],
  }),
  component: DriverProfileCommandView,
});
