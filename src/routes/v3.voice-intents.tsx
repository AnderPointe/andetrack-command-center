import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { VOICE_INTENTS_V3 } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/voice-intents")({
  head: () => ({ meta: [{ title: "Voice Intents · Anderoute V3" }] }),
  component: () => (
    <V3Page icon={<MessageSquare className="size-6 text-sky-300" />} title="Advanced Voice Intents"
      blurb="Intents supported across navigation, load, status, shipment, and system categories. All irreversible intents require confirmation.">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {VOICE_INTENTS_V3.map((g) => (
          <Card key={g.category} className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">{g.category}</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {g.intents.map((i) => (<li key={i} className="rounded border border-white/10 bg-black/20 px-2 py-1">{i}</li>))}
            </ul>
          </Card>
        ))}
      </div>
    </V3Page>
  ),
});
