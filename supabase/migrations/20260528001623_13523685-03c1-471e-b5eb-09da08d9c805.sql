-- Step 1: Rename existing user_roles to preserve during transition
ALTER TABLE IF EXISTS public.user_roles RENAME TO _legacy_user_roles;

-- Step 2: Create app_users table
CREATE TABLE public.app_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  auth_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  avatar_url text,
  user_type text NOT NULL DEFAULT 'dispatcher',
  status text DEFAULT 'active',
  last_login_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Step 3: Create roles table
CREATE TABLE public.roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
  role_name text NOT NULL,
  role_key text NOT NULL,
  description text,
  is_system_role boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Step 4: Create user_roles table (new RBAC junction)
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.app_users(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role_id)
);

-- Step 5: Create role_permissions table
CREATE TABLE public.role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id uuid NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  permission_key text NOT NULL,
  can_view boolean DEFAULT true,
  can_create boolean DEFAULT false,
  can_edit boolean DEFAULT false,
  can_delete boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Step 6: GRANTs
GRANT SELECT, INSERT, UPDATE, DELETE ON public.app_users TO authenticated;
GRANT ALL ON public.app_users TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.roles TO authenticated;
GRANT ALL ON public.roles TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.role_permissions TO authenticated;
GRANT ALL ON public.role_permissions TO service_role;

-- Step 7: Enable RLS
ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- Step 8: Create policies for app_users
CREATE POLICY "company members read app_users"
  ON public.app_users
  FOR SELECT
  TO authenticated
  USING (public.is_company_member(auth.uid(), company_id));

CREATE POLICY "admins manage app_users"
  ON public.app_users
  FOR ALL
  TO authenticated
  USING (public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));

-- Step 9: Create policies for roles
CREATE POLICY "company members read roles"
  ON public.roles
  FOR SELECT
  TO authenticated
  USING (company_id IS NULL OR public.is_company_member(auth.uid(), company_id));

CREATE POLICY "admins manage roles"
  ON public.roles
  FOR ALL
  TO authenticated
  USING (company_id IS NULL OR public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (company_id IS NULL OR public.can_manage_company(auth.uid(), company_id));

-- Step 10: Create policies for user_roles
CREATE POLICY "company members read user_roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (public.is_company_member(auth.uid(), company_id));

CREATE POLICY "admins manage user_roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));

-- Step 11: Create policies for role_permissions
CREATE POLICY "company members read role_permissions"
  ON public.role_permissions
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.roles r
    WHERE r.id = role_id
    AND (r.company_id IS NULL OR public.is_company_member(auth.uid(), r.company_id))
  ));

CREATE POLICY "admins manage role_permissions"
  ON public.role_permissions
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.roles r
    WHERE r.id = role_id
    AND (r.company_id IS NULL OR public.can_manage_company(auth.uid(), r.company_id))
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.roles r
    WHERE r.id = role_id
    AND (r.company_id IS NULL OR public.can_manage_company(auth.uid(), r.company_id))
  ));

-- Step 12: Add indexes for performance
CREATE INDEX idx_app_users_company ON public.app_users(company_id);
CREATE INDEX idx_app_users_auth ON public.app_users(auth_user_id);
CREATE INDEX idx_app_users_email ON public.app_users(email);
CREATE INDEX idx_app_users_status ON public.app_users(status);
CREATE INDEX idx_roles_company ON public.roles(company_id);
CREATE INDEX idx_roles_key ON public.roles(role_key);
CREATE INDEX idx_user_roles_company ON public.user_roles(company_id);
CREATE INDEX idx_user_roles_user ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role_id);
CREATE INDEX idx_role_permissions_role ON public.role_permissions(role_id);

-- Step 13: Seed system roles
INSERT INTO public.roles (role_name, role_key, description, is_system_role, company_id) VALUES
  ('Owner', 'owner', 'Full access to company settings and operations', true, NULL),
  ('Admin', 'admin', 'Administrative access to manage users and settings', true, NULL),
  ('Dispatcher', 'dispatcher', 'Can dispatch and manage loads', true, NULL),
  ('Driver', 'driver', 'Field operator with delivery access', true, NULL),
  ('Billing Admin', 'billing_admin', 'Can manage invoices and payments', true, NULL),
  ('Dispatcher Manager', 'dispatcher_manager', 'Oversees dispatch operations', true, NULL),
  ('Mechanic', 'mechanic', 'Can manage vehicle maintenance', true, NULL),
  ('Customer Admin', 'customer_admin', 'Customer-facing admin access', true, NULL),
  ('Customer User', 'customer_user', 'Standard customer portal access', true, NULL),
  ('Viewer', 'viewer', 'Read-only access', true, NULL),
  ('Platform Owner', 'platform_owner', 'SaaS platform super-admin', true, NULL),
  ('Platform Support', 'platform_support', 'Support staff access', true, NULL)
ON CONFLICT DO NOTHING;

-- Step 14: Migrate legacy user_roles data to new schema where possible
INSERT INTO public.app_users (company_id, auth_user_id, full_name, email, user_type, status)
SELECT 
  lur.company_id,
  lur.user_id as auth_user_id,
  COALESCE(p.display_name, 'Unknown') as full_name,
  COALESCE(u.email, 'unknown@example.com') as email,
  lur.role::text as user_type,
  'active' as status
FROM public._legacy_user_roles lur
LEFT JOIN auth.users u ON lur.user_id = u.id
LEFT JOIN public.profiles p ON lur.user_id = p.id
WHERE NOT EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.auth_user_id = lur.user_id AND au.company_id = lur.company_id
);

INSERT INTO public.user_roles (company_id, user_id, role_id)
SELECT 
  au.company_id,
  au.id as user_id,
  r.id as role_id
FROM public._legacy_user_roles lur
JOIN public.app_users au ON lur.user_id = au.auth_user_id AND lur.company_id = au.company_id
JOIN public.roles r ON r.role_key = lur.role::text
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_roles ur 
  WHERE ur.user_id = au.id AND ur.role_id = r.id
);

-- Step 15: Recreate helper functions to use new schema
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _company_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  select exists (
    select 1 from public.user_roles ur
    join public.app_users au on ur.user_id = au.id
    join public.roles r on ur.role_id = r.id
    where au.auth_user_id = _user_id
      and ur.company_id = _company_id
      and r.role_key = _role::text
  );
$$;

CREATE OR REPLACE FUNCTION public.can_manage_company(_user_id uuid, _company_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  select exists (
    select 1 from public.user_roles ur
    join public.app_users au on ur.user_id = au.id
    join public.roles r on ur.role_id = r.id
    where au.auth_user_id = _user_id
      and ur.company_id = _company_id
      and r.role_key in ('owner','admin','dispatcher')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_company_member(_user_id uuid, _company_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  select exists (
    select 1 from public.user_roles ur
    join public.app_users au on ur.user_id = au.id
    where au.auth_user_id = _user_id
      and ur.company_id = _company_id
  );
$$;

CREATE OR REPLACE FUNCTION public.is_platform_owner(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  select exists (
    select 1 from public.user_roles ur
    join public.app_users au on ur.user_id = au.id
    join public.roles r on ur.role_id = r.id
    where au.auth_user_id = _user_id
      and r.role_key = 'platform_owner'
  );
$$;
