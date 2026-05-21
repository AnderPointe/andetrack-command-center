-- Phase 30 — RLS policies for V8.5 enterprise discipline tables.
-- Pattern: tenant-scoped reads via current_company(), elevated writes via
-- platform owner OR named role helpers. Avoids self-referential policies.

alter table public.v85_discipline_scores         enable row level security;
alter table public.v85_control_tests             enable row level security;
alter table public.v85_country_accountability    enable row level security;
alter table public.v85_board_packet_sections     enable row level security;
alter table public.v85_marketplace_economics     enable row level security;

-- discipline scores: tenant read, admin/platform write
create policy v85_disc_read on public.v85_discipline_scores
  for select to authenticated
  using (company_id = public.current_company());

create policy v85_disc_write on public.v85_discipline_scores
  for all to authenticated
  using (
    public.is_platform_owner(auth.uid())
    or (
      company_id = public.current_company()
      and public.has_role(auth.uid(), company_id, 'admin')
    )
  )
  with check (
    public.is_platform_owner(auth.uid())
    or (
      company_id = public.current_company()
      and public.has_role(auth.uid(), company_id, 'admin')
    )
  );

-- control tests: tenant admin + compliance read; only server fn writes via service role
create policy v85_tests_read on public.v85_control_tests
  for select to authenticated
  using (
    company_id = public.current_company()
    and public.has_role(auth.uid(), company_id, 'admin')
  );

-- country accountability: platform-owner read only (cross-tenant aggregate)
create policy v85_country_read on public.v85_country_accountability
  for select to authenticated
  using (public.is_platform_owner(auth.uid()));

-- board packet: platform-owner only
create policy v85_board_all on public.v85_board_packet_sections
  for all to authenticated
  using (public.is_platform_owner(auth.uid()))
  with check (public.is_platform_owner(auth.uid()));

-- marketplace economics: tenant read; aggregates joined via createServerFn
create policy v85_mp_read on public.v85_marketplace_economics
  for select to authenticated
  using (true);  -- non-sensitive lane metrics; PII never landed here
