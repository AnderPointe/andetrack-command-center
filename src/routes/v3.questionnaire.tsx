import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VENDOR_QUESTIONNAIRE_CATEGORIES, VENDOR_QUESTIONS_SAMPLE } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/questionnaire")({
  head: () => ({ meta: [{ title: "Security Questionnaire · Anderoute V3" }] }),
  component: () => (
    <V3Page icon={<ClipboardCheck className="size-6 text-sky-300" />} title="Vendor Security Questionnaire Builder"
      blurb="Reusable categories and an answer library so security responds in hours not weeks. Export to PDF is placeholder.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Categories</h2>
        <div className="mt-2 flex flex-wrap gap-1.5 text-sm">{VENDOR_QUESTIONNAIRE_CATEGORIES.map((c) => (
          <Badge key={c} variant="outline" className="border-white/15 text-muted-foreground">{c}</Badge>
        ))}</div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Sample answers</h2>
        <table className="mt-2 w-full text-sm"><thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Category</th><th className="p-2">Question</th><th className="p-2">Answer</th><th className="p-2">Evidence</th></tr></thead>
          <tbody>{VENDOR_QUESTIONS_SAMPLE.map((q) => (
            <tr key={q.id} className="border-t border-white/10"><td className="p-2 text-xs">{q.category}</td><td className="p-2">{q.question}</td><td className="p-2 text-muted-foreground">{q.answer}</td><td className="p-2 font-mono text-xs text-sky-300">{q.evidence}</td></tr>
          ))}</tbody></table>
      </Card>
    </V3Page>
  ),
});
