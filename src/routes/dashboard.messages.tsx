import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MessengerTab } from "@/components/messenger/MessengerTab";

export const Route = createFileRoute("/dashboard/messages")({
  head: () => ({
    meta: [
      { title: "Messages — Anderoute Messenger" },
      {
        name: "description",
        content:
          "Anderoute Messenger — courier communication center for dispatch, drivers, carriers, brokers, warehouses, and customers.",
      },
      { property: "og:title", content: "Messages — Anderoute Messenger" },
      {
        property: "og:description",
        content:
          "Courier communication center for dispatch, drivers, carriers, brokers, warehouses, and customers.",
      },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  return (
    <AppShell>
      <MessengerTab />
    </AppShell>
  );
}
