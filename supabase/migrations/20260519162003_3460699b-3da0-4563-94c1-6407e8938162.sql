
do $$
begin
  if not exists (select 1 from pg_type t join pg_enum e on t.oid=e.enumtypid where t.typname='app_role' and e.enumlabel='platform_owner') then alter type app_role add value 'platform_owner'; end if;
  if not exists (select 1 from pg_type t join pg_enum e on t.oid=e.enumtypid where t.typname='app_role' and e.enumlabel='platform_support') then alter type app_role add value 'platform_support'; end if;
  if not exists (select 1 from pg_type t join pg_enum e on t.oid=e.enumtypid where t.typname='app_role' and e.enumlabel='company_owner') then alter type app_role add value 'company_owner'; end if;
  if not exists (select 1 from pg_type t join pg_enum e on t.oid=e.enumtypid where t.typname='app_role' and e.enumlabel='company_admin') then alter type app_role add value 'company_admin'; end if;
  if not exists (select 1 from pg_type t join pg_enum e on t.oid=e.enumtypid where t.typname='app_role' and e.enumlabel='billing_admin') then alter type app_role add value 'billing_admin'; end if;
  if not exists (select 1 from pg_type t join pg_enum e on t.oid=e.enumtypid where t.typname='app_role' and e.enumlabel='dispatcher_manager') then alter type app_role add value 'dispatcher_manager'; end if;
  if not exists (select 1 from pg_type t join pg_enum e on t.oid=e.enumtypid where t.typname='app_role' and e.enumlabel='mechanic') then alter type app_role add value 'mechanic'; end if;
  if not exists (select 1 from pg_type t join pg_enum e on t.oid=e.enumtypid where t.typname='app_role' and e.enumlabel='customer_admin') then alter type app_role add value 'customer_admin'; end if;
  if not exists (select 1 from pg_type t join pg_enum e on t.oid=e.enumtypid where t.typname='app_role' and e.enumlabel='customer_user') then alter type app_role add value 'customer_user'; end if;
  if not exists (select 1 from pg_type t join pg_enum e on t.oid=e.enumtypid where t.typname='app_role' and e.enumlabel='viewer') then alter type app_role add value 'viewer'; end if;
end$$;
