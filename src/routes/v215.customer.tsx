import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { ControlPage } from "@/components/v215/ControlPage";
import * as H from "@/v215/hooks";
function Page() {
  return <ControlPage icon={<Users className="size-6 text-emerald-300" />}
    title="Customer Trust Lifecycle Intelligence Center"
    blurb="Prospect → onboarding → adoption → support → comms → proof → renewal → expansion → risk → offboarding. Evidence, comms approval, data boundary, concentration risk."
    data={H.useCustomerTrustLifecycle()} />;
}
export const Route = createFileRoute("/v215/customer")({ component: Page });
