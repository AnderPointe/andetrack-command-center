import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MessengerTab } from "@/components/messenger/MessengerTab";

export const Route = createFileRoute("/messenger")({
  head: () => ({
    meta: [
      { title: "Messenger — Anderoute" },
      {
        name: "description",
        content:
          "Chats between couriers, dispatchers, brokers, drivers, and customers.",
      },
    ],
  }),
  component: MessengerPage,
});

function MessengerPage() {
  return (
    <AppShell>
      <MessengerTab />
    </AppShell>
  );
}
