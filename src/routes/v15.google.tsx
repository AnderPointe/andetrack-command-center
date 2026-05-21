import { createFileRoute } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GOOGLE_BOUNDARY } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/google")({
  head: () => ({ meta: [{ title: "V1.5 Google Provider · Anderoute" }] }),
  component: Page,
});

const FILES = [
  "src/navigation/providers/GoogleNavigationProvider.ts",
  "src/navigation/services/googleRouteService.ts",
  "src/navigation/utils/googleRouteParser.ts",
  "src/navigation/types/google.ts",
];

function Page() {
  return (
    <V15Page
      icon={<Compass className="size-6 text-cyan-300" />}
      title="Google Navigation Provider"
      blurb="Optional secondary provider. Web Directions API for route geometry + ETA. The full Google Navigation SDK handoff lives on native and is deferred. The platform is never hardwired to Google."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
        <h2 className="font-semibold">Boundary scope</h2>
        <ul className="mt-2 list-disc pl-5 text-muted-foreground">
          <li>API key configuration placeholder (server-side only)</li>
          <li>Route request boundary (Web Directions API)</li>
          <li>Route geometry support (encoded polyline parser)</li>
          <li>ETA + remaining distance parsing placeholder</li>
          <li>Mobile SDK handoff placeholder — native bridge in V2</li>
          <li>Provider health test + error handling + cost tracking placeholder</li>
        </ul>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Files</h2>
        <div className="mt-2 space-y-1 text-xs font-mono text-muted-foreground">
          {FILES.map((f) => <div key={f}>· {f}</div>)}
        </div>
      </Card>
    </V15Page>
  );
}
