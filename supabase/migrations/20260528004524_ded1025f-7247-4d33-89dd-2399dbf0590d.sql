
-- Map app_users.user_type -> default role_keys
CREATE OR REPLACE FUNCTION public._default_role_keys_for_user_type(_user_type text)
RETURNS text[]
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT CASE lower(coalesce(_user_type, ''))
    WHEN 'owner'         THEN ARRAY['owner','admin','dispatcher']
    WHEN 'admin'         THEN ARRAY['admin','dispatcher']
    WHEN 'billing_admin' THEN ARRAY['billing_admin','dispatcher']
    WHEN 'dispatcher'    THEN ARRAY['dispatcher']
    WHEN 'driver'        THEN ARRAY['driver']
    WHEN 'courier'       THEN ARRAY['courier']
    WHEN 'warehouse'     THEN ARRAY['warehouse']
    WHEN 'broker'        THEN ARRAY['broker']
    WHEN 'customer'      THEN ARRAY['customer']
    WHEN 'viewer'        THEN ARRAY['viewer']
    ELSE ARRAY['viewer']
  END;
$$;

-- Trigger function: assign default roles based on user_type
CREATE OR REPLACE FUNCTION public.assign_default_user_roles()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _keys text[];
BEGIN
  _keys := public._default_role_keys_for_user_type(NEW.user_type);

  INSERT INTO public.user_roles (company_id, user_id, role_id)
  SELECT NEW.company_id, NEW.id, r.id
  FROM public.roles r
  WHERE r.role_key = ANY(_keys)
    AND (r.company_id IS NULL OR r.company_id = NEW.company_id)
  ON CONFLICT (user_id, role_id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_app_users_default_roles ON public.app_users;
CREATE TRIGGER trg_app_users_default_roles
AFTER INSERT OR UPDATE OF user_type ON public.app_users
FOR EACH ROW
EXECUTE FUNCTION public.assign_default_user_roles();

-- Backfill: assign defaults to existing app_users that have no roles yet
INSERT INTO public.user_roles (company_id, user_id, role_id)
SELECT u.company_id, u.id, r.id
FROM public.app_users u
JOIN public.roles r
  ON r.role_key = ANY(public._default_role_keys_for_user_type(u.user_type))
 AND (r.company_id IS NULL OR r.company_id = u.company_id)
ON CONFLICT (user_id, role_id) DO NOTHING;
