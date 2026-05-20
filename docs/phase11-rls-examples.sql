-- Phase 11 — RLS examples for planning tables.
-- Internal team (platform owner) manages everything. Pilot company admins
-- can view their own pilot data. Customers/drivers cannot see internal planning.

-- Helper assumption: public.is_platform_owner(_user_id uuid) already exists.
-- Pilot scoping uses pilot_launches.company_id + is_company_member().

alter table public.mvp_features                  enable row level security;
alter table public.engineering_backlog_items     enable row level security;
alter table public.technical_debt_items          enable row level security;
alter table public.architecture_decision_records enable row level security;
alter table public.sprints                       enable row level security;
alter table public.sprint_tasks                  enable row level security;
alter table public.user_stories                  enable row level security;
alter table public.qa_test_cases                 enable row level security;
alter table public.qa_test_runs                  enable row level security;
alter table public.qa_test_results               enable row level security;
alter table public.release_gates                 enable row level security;
alter table public.release_checklists            enable row level security;
alter table public.pilot_launches                enable row level security;
alter table public.pilot_success_metrics         enable row level security;
alter table public.pilot_risks                   enable row level security;
alter table public.pilot_feedback_items          enable row level security;
alter table public.pilot_training_sessions       enable row level security;
alter table public.product_risks                 enable row level security;
alter table public.implementation_roadmap_items  enable row level security;
alter table public.build_vs_buy_decisions        enable row level security;
alter table public.cost_model_items              enable row level security;

-- ---- Internal-only tables (platform owner manages everything) ----
do $$
declare t text;
begin
  foreach t in array array[
    'mvp_features','engineering_backlog_items','technical_debt_items',
    'architecture_decision_records','sprints','sprint_tasks','user_stories',
    'qa_test_cases','qa_test_runs','qa_test_results',
    'release_gates','release_checklists',
    'product_risks','implementation_roadmap_items',
    'build_vs_buy_decisions','cost_model_items'
  ]
  loop
    execute format($f$
      create policy "platform owner manages %1$s"
      on public.%1$I for all to authenticated
      using (public.is_platform_owner(auth.uid()))
      with check (public.is_platform_owner(auth.uid()));
    $f$, t);
  end loop;
end $$;

-- ---- Pilot tables (company-scoped read for the pilot customer) ----

-- Pilot admins can view their pilot launches
create policy "pilot company can view its pilot"
on public.pilot_launches for select to authenticated
using (
  public.is_platform_owner(auth.uid())
  or public.is_company_member(auth.uid(), company_id)
);

-- Pilot success metrics visible to pilot company members
create policy "pilot company can view its metrics"
on public.pilot_success_metrics for select to authenticated
using (
  public.is_platform_owner(auth.uid())
  or exists (
    select 1 from public.pilot_launches pl
    where pl.id = pilot_success_metrics.pilot_id
      and public.is_company_member(auth.uid(), pl.company_id)
  )
);

-- Pilot risks: read for pilot company, write only platform
create policy "pilot company can view its risks"
on public.pilot_risks for select to authenticated
using (
  public.is_platform_owner(auth.uid())
  or exists (
    select 1 from public.pilot_launches pl
    where pl.id = pilot_risks.pilot_id
      and public.is_company_member(auth.uid(), pl.company_id)
  )
);

-- Feedback: pilot users can submit their own, view their own
create policy "pilot users submit feedback"
on public.pilot_feedback_items for insert to authenticated
with check (submitted_by = auth.uid());

create policy "pilot users view their feedback"
on public.pilot_feedback_items for select to authenticated
using (submitted_by = auth.uid() or public.is_platform_owner(auth.uid()));

-- Training: pilot company members see their sessions
create policy "pilot company views its training"
on public.pilot_training_sessions for select to authenticated
using (
  public.is_platform_owner(auth.uid())
  or exists (
    select 1 from public.pilot_launches pl
    where pl.id = pilot_training_sessions.pilot_id
      and public.is_company_member(auth.uid(), pl.company_id)
  )
);
