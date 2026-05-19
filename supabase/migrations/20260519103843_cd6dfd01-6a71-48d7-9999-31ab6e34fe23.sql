
-- Pin search_path on helpers
alter function public.touch_updated_at() set search_path = public;

-- Bootstrap function: any new authenticated user with no company gets demo membership
create or replace function public.bootstrap_demo_membership()
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  demo_id uuid;
  existing uuid;
begin
  if auth.uid() is null then
    return null;
  end if;

  select company_id into existing from public.profiles where id = auth.uid();
  if existing is not null then
    return existing;
  end if;

  select id into demo_id from public.companies where name = 'Anderoute Demo' limit 1;
  if demo_id is null then
    return null;
  end if;

  insert into public.profiles (id, company_id, display_name)
  values (auth.uid(), demo_id, coalesce((select email from auth.users where id = auth.uid()), 'New user'))
  on conflict (id) do update set company_id = excluded.company_id;

  insert into public.user_roles (user_id, company_id, role)
  values (auth.uid(), demo_id, 'dispatcher')
  on conflict do nothing;

  return demo_id;
end;
$$;
