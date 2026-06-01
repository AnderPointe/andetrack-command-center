import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchBoardTrustReports,
  fetchCustomerTrustProfiles,
  fetchGovernanceReviews,
  fetchMarketplacePolicies,
  fetchPartnerTrustProfiles,
  fetchRevenueTrustIntelligence,
  fetchTrustAutomationRuns,
  fetchTrustScorecards,
  fetchTrustSignals,
} from "@/lib/trustService";
import type {
  BoardTrustReport,
  CustomerTrustProfile,
  GovernanceReview,
  MarketplacePolicy,
  PartnerTrustProfile,
  RevenueTrustRecord,
  TrustAutomationRun,
  TrustScorecard,
  TrustSignal,
} from "@/types/trust";

function useResource<T>(loader: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const v = await loader();
      setData(v);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useTrustScorecards(companyId: string) {
  const res = useResource<TrustScorecard[]>(() => fetchTrustScorecards(companyId), [companyId]);
  useEffect(() => {
    const ch = supabase
      .channel("trust_scorecards_rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "trust_scorecards" }, () => res.refresh())
      .subscribe();
    return () => {
      void supabase.removeChannel(ch);
    };
  }, [res]);
  return res;
}

export function useTrustSignals(companyId: string) {
  const res = useResource<TrustSignal[]>(() => fetchTrustSignals(companyId), [companyId]);
  useEffect(() => {
    const ch = supabase
      .channel("trust_signals_rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "trust_signals" }, () => res.refresh())
      .subscribe();
    return () => {
      void supabase.removeChannel(ch);
    };
  }, [res]);
  return res;
}

export function useCustomerTrustProfiles(companyId: string) {
  return useResource<CustomerTrustProfile[]>(() => fetchCustomerTrustProfiles(companyId), [companyId]);
}
export function usePartnerTrustProfiles(companyId: string) {
  return useResource<PartnerTrustProfile[]>(() => fetchPartnerTrustProfiles(companyId), [companyId]);
}
export function useBoardTrustReports(companyId: string) {
  const res = useResource<BoardTrustReport[]>(() => fetchBoardTrustReports(companyId), [companyId]);
  useEffect(() => {
    const ch = supabase
      .channel("board_trust_reports_rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "board_trust_reports" }, () => res.refresh())
      .subscribe();
    return () => {
      void supabase.removeChannel(ch);
    };
  }, [res]);
  return res;
}
export function useRevenueTrustIntelligence(companyId: string) {
  return useResource<RevenueTrustRecord[]>(() => fetchRevenueTrustIntelligence(companyId), [companyId]);
}
export function useMarketplacePolicies(companyId: string) {
  return useResource<MarketplacePolicy[]>(() => fetchMarketplacePolicies(companyId), [companyId]);
}
export function useGovernanceReviews(companyId: string) {
  return useResource<GovernanceReview[]>(() => fetchGovernanceReviews(companyId), [companyId]);
}
export function useTrustAutomationRuns(companyId: string) {
  return useResource<TrustAutomationRun[]>(() => fetchTrustAutomationRuns(companyId), [companyId]);
}
