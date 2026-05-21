import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { SimpleTable, StatusPill } from "@/components/v45/ui-bits";

const REPORTS = [
  { name: "V4.5 maturity rollup",       audience: "Exec",            cadence: "Weekly",  status: "scheduled" },
  { name: "Automation governance",      audience: "Security",        cadence: "Weekly",  status: "scheduled" },
  { name: "Marketplace operations",     audience: "Ops",             cadence: "Daily",   status: "scheduled" },
  { name: "Carrier quality",            audience: "Ops",             cadence: "Weekly",  status: "scheduled" },
  { name: "Disputes aging",             audience: "Ops",             cadence: "Daily",   status: "scheduled" },
  { name: "SOC 2 execution",            audience: "Security",        cadence: "Weekly",  status: "scheduled" },
  { name: "Mobile launch progress",     audience: "Mobile",          cadence: "Weekly",  status: "scheduled" },
  { name: "Acquisition readiness",      audience: "Platform owner",  cadence: "Monthly", status: "scheduled" },
  { name: "Revenue ops maturity",       audience: "Finance",         cadence: "Monthly", status: "scheduled" },
  { name: "Partner ecosystem health",   audience: "BizDev",          cadence: "Monthly", status: "scheduled" },
  { name: "National operating model",   audience: "Exec",            cadence: "Monthly", status: "scheduled" },
  { name: "AI governance",              audience: "Security/Legal",  cadence: "Weekly",  status: "scheduled" },
];

export const Route = createFileRoute("/v45/reports")({
  head: () => ({ meta: [{ title: "V4.5 Reports · Anderoute" }] }),
  component: () => (
    <V45Page icon={<FileBarChart className="size-6 text-violet-300" />} title="V4.5 Reports"
      blurb="Scheduled reports across maturity, automation, marketplace, certification, mobile, acquisition, revenue, partners, national ops, and AI governance.">
      <SimpleTable rows={REPORTS} columns={[
        { key: "name", label: "Report" },
        { key: "audience", label: "Audience" },
        { key: "cadence", label: "Cadence" },
        { key: "status", label: "Status", render: r => <StatusPill status={r.status} /> },
      ]} />
    </V45Page>
  ),
});
