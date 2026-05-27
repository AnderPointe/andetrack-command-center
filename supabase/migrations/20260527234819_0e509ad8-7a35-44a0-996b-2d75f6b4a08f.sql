
-- =========================================================
-- FACILITIES / HUBS
-- =========================================================
CREATE TABLE public.facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name text NOT NULL,
  facility_type text NOT NULL DEFAULT 'hub', -- hub | warehouse | depot | terminal | cross_dock
  code text,
  address_line1 text,
  address_line2 text,
  city text,
  region text,
  postal_code text,
  country text,
  latitude numeric,
  longitude numeric,
  timezone text,
  contact_name text,
  contact_phone text,
  contact_email text,
  is_active boolean NOT NULL DEFAULT true,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX facilities_company_idx ON public.facilities (company_id, is_active);
CREATE INDEX facilities_type_idx ON public.facilities (company_id, facility_type);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.facilities TO authenticated;
GRANT ALL ON public.facilities TO service_role;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "company read facilities" ON public.facilities FOR SELECT TO authenticated
  USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "managers write facilities" ON public.facilities TO authenticated
  USING (public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));
CREATE TRIGGER facilities_touch BEFORE UPDATE ON public.facilities
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================================
-- ORDERS (customer-facing; one order -> one or more loads)
-- =========================================================
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES public.customers(id) ON DELETE SET NULL,
  order_number text NOT NULL,
  status text NOT NULL DEFAULT 'pending', -- pending | confirmed | in_progress | completed | cancelled
  service_type text, -- courier | freight | food | hotshot | dispatch
  origin_facility_id uuid REFERENCES public.facilities(id) ON DELETE SET NULL,
  destination_facility_id uuid REFERENCES public.facilities(id) ON DELETE SET NULL,
  requested_pickup_at timestamptz,
  requested_dropoff_at timestamptz,
  total_amount numeric(12,2),
  currency text NOT NULL DEFAULT 'USD',
  reference text,
  notes text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (company_id, order_number)
);
CREATE INDEX orders_company_status_idx ON public.orders (company_id, status, created_at DESC);
CREATE INDEX orders_customer_idx ON public.orders (customer_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "company read orders" ON public.orders FOR SELECT TO authenticated
  USING (public.is_company_member(auth.uid(), company_id)
    OR (customer_id IS NOT NULL AND public.is_customer_user(auth.uid(), customer_id)));
CREATE POLICY "managers write orders" ON public.orders TO authenticated
  USING (public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));
CREATE TRIGGER orders_touch BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Link loads to orders (optional)
ALTER TABLE public.loads ADD COLUMN IF NOT EXISTS order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS loads_order_idx ON public.loads (order_id);

-- =========================================================
-- EXTEND billing_invoices with full invoice fields
-- =========================================================
ALTER TABLE public.billing_invoices
  ADD COLUMN IF NOT EXISTS customer_id uuid REFERENCES public.customers(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS issue_date date,
  ADD COLUMN IF NOT EXISTS due_date date,
  ADD COLUMN IF NOT EXISTS paid_at timestamptz,
  ADD COLUMN IF NOT EXISTS subtotal numeric(12,2),
  ADD COLUMN IF NOT EXISTS tax_total numeric(12,2),
  ADD COLUMN IF NOT EXISTS discount_total numeric(12,2),
  ADD COLUMN IF NOT EXISTS total numeric(12,2),
  ADD COLUMN IF NOT EXISTS currency text NOT NULL DEFAULT 'USD',
  ADD COLUMN IF NOT EXISTS aging_status text, -- current | 1_30 | 31_60 | 61_90 | 90_plus
  ADD COLUMN IF NOT EXISTS payment_method_id uuid,
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();
CREATE INDEX IF NOT EXISTS billing_invoices_customer_idx ON public.billing_invoices (customer_id, status);
CREATE INDEX IF NOT EXISTS billing_invoices_due_idx ON public.billing_invoices (company_id, due_date) WHERE status NOT IN ('paid','void');
DROP TRIGGER IF EXISTS billing_invoices_touch ON public.billing_invoices;
CREATE TRIGGER billing_invoices_touch BEFORE UPDATE ON public.billing_invoices
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================================
-- INVOICE LINE ITEMS
-- =========================================================
CREATE TABLE public.invoice_line_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  invoice_id uuid NOT NULL REFERENCES public.billing_invoices(id) ON DELETE CASCADE,
  load_id uuid REFERENCES public.loads(id) ON DELETE SET NULL,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  description text NOT NULL,
  kind text NOT NULL DEFAULT 'delivery', -- delivery | accessorial | fuel_surcharge | tax | discount | subscription | other
  quantity numeric(12,3) NOT NULL DEFAULT 1,
  unit_price numeric(12,4) NOT NULL DEFAULT 0,
  amount numeric(12,2) NOT NULL DEFAULT 0,
  tax_rate_id uuid,
  tax_amount numeric(12,2) NOT NULL DEFAULT 0,
  accessorial_code text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX invoice_line_items_invoice_idx ON public.invoice_line_items (invoice_id);
CREATE INDEX invoice_line_items_company_idx ON public.invoice_line_items (company_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invoice_line_items TO authenticated;
GRANT ALL ON public.invoice_line_items TO service_role;
ALTER TABLE public.invoice_line_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "company read invoice items" ON public.invoice_line_items FOR SELECT TO authenticated
  USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "managers write invoice items" ON public.invoice_line_items TO authenticated
  USING (public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));

-- =========================================================
-- PAYMENT METHODS
-- =========================================================
CREATE TABLE public.payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES public.customers(id) ON DELETE CASCADE,
  provider text NOT NULL DEFAULT 'stripe', -- stripe | paddle | manual | ach | wire
  external_id text,
  method_type text NOT NULL, -- card | ach | wire | cash | check
  brand text,
  last4 text,
  exp_month int,
  exp_year int,
  holder_name text,
  is_default boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX payment_methods_company_idx ON public.payment_methods (company_id, customer_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payment_methods TO authenticated;
GRANT ALL ON public.payment_methods TO service_role;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
CREATE POLICY "company read payment methods" ON public.payment_methods FOR SELECT TO authenticated
  USING (public.is_company_member(auth.uid(), company_id)
    OR (customer_id IS NOT NULL AND public.is_customer_user(auth.uid(), customer_id)));
CREATE POLICY "managers write payment methods" ON public.payment_methods TO authenticated
  USING (public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));
CREATE TRIGGER payment_methods_touch BEFORE UPDATE ON public.payment_methods
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Now we can link invoices -> payment_methods
ALTER TABLE public.billing_invoices
  ADD CONSTRAINT billing_invoices_payment_method_fk
  FOREIGN KEY (payment_method_id) REFERENCES public.payment_methods(id) ON DELETE SET NULL;

-- =========================================================
-- PAYMENTS
-- =========================================================
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  invoice_id uuid REFERENCES public.billing_invoices(id) ON DELETE SET NULL,
  customer_id uuid REFERENCES public.customers(id) ON DELETE SET NULL,
  payment_method_id uuid REFERENCES public.payment_methods(id) ON DELETE SET NULL,
  amount numeric(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  status text NOT NULL DEFAULT 'pending', -- pending | succeeded | failed | refunded | partially_refunded
  provider text DEFAULT 'stripe',
  external_id text,
  received_at timestamptz NOT NULL DEFAULT now(),
  failure_reason text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX payments_company_idx ON public.payments (company_id, status, received_at DESC);
CREATE INDEX payments_invoice_idx ON public.payments (invoice_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "company read payments" ON public.payments FOR SELECT TO authenticated
  USING (public.is_company_member(auth.uid(), company_id)
    OR (customer_id IS NOT NULL AND public.is_customer_user(auth.uid(), customer_id)));
CREATE POLICY "managers write payments" ON public.payments TO authenticated
  USING (public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));
CREATE TRIGGER payments_touch BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================================
-- REFUNDS
-- =========================================================
CREATE TABLE public.refunds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  payment_id uuid NOT NULL REFERENCES public.payments(id) ON DELETE CASCADE,
  invoice_id uuid REFERENCES public.billing_invoices(id) ON DELETE SET NULL,
  amount numeric(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  reason text,
  status text NOT NULL DEFAULT 'pending', -- pending | succeeded | failed
  provider text DEFAULT 'stripe',
  external_id text,
  refunded_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX refunds_payment_idx ON public.refunds (payment_id);
CREATE INDEX refunds_company_idx ON public.refunds (company_id, status);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.refunds TO authenticated;
GRANT ALL ON public.refunds TO service_role;
ALTER TABLE public.refunds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "company read refunds" ON public.refunds FOR SELECT TO authenticated
  USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "managers write refunds" ON public.refunds TO authenticated
  USING (public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));
CREATE TRIGGER refunds_touch BEFORE UPDATE ON public.refunds
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================================
-- CREDIT NOTES
-- =========================================================
CREATE TABLE public.credit_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES public.customers(id) ON DELETE SET NULL,
  invoice_id uuid REFERENCES public.billing_invoices(id) ON DELETE SET NULL,
  number text,
  amount numeric(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  reason text,
  status text NOT NULL DEFAULT 'issued', -- issued | applied | void
  issued_at timestamptz NOT NULL DEFAULT now(),
  applied_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX credit_notes_company_idx ON public.credit_notes (company_id, status);
CREATE INDEX credit_notes_customer_idx ON public.credit_notes (customer_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.credit_notes TO authenticated;
GRANT ALL ON public.credit_notes TO service_role;
ALTER TABLE public.credit_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "company read credit notes" ON public.credit_notes FOR SELECT TO authenticated
  USING (public.is_company_member(auth.uid(), company_id)
    OR (customer_id IS NOT NULL AND public.is_customer_user(auth.uid(), customer_id)));
CREATE POLICY "managers write credit notes" ON public.credit_notes TO authenticated
  USING (public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));
CREATE TRIGGER credit_notes_touch BEFORE UPDATE ON public.credit_notes
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================================
-- TAX RATES
-- =========================================================
CREATE TABLE public.tax_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name text NOT NULL,
  code text,
  rate_pct numeric(6,3) NOT NULL, -- e.g. 8.875
  region text,
  country text,
  inclusive boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  effective_from date,
  effective_to date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX tax_rates_company_idx ON public.tax_rates (company_id, is_active);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tax_rates TO authenticated;
GRANT ALL ON public.tax_rates TO service_role;
ALTER TABLE public.tax_rates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "company read tax rates" ON public.tax_rates FOR SELECT TO authenticated
  USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "managers write tax rates" ON public.tax_rates TO authenticated
  USING (public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));
CREATE TRIGGER tax_rates_touch BEFORE UPDATE ON public.tax_rates
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Link invoice_line_items tax_rate_id
ALTER TABLE public.invoice_line_items
  ADD CONSTRAINT invoice_line_items_tax_rate_fk
  FOREIGN KEY (tax_rate_id) REFERENCES public.tax_rates(id) ON DELETE SET NULL;

-- =========================================================
-- RATE CARDS (published price lists)
-- =========================================================
CREATE TABLE public.rate_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name text NOT NULL,
  service_type text, -- courier | freight | food | hotshot
  currency text NOT NULL DEFAULT 'USD',
  is_active boolean NOT NULL DEFAULT true,
  effective_from date,
  effective_to date,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX rate_cards_company_idx ON public.rate_cards (company_id, is_active);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rate_cards TO authenticated;
GRANT ALL ON public.rate_cards TO service_role;
ALTER TABLE public.rate_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "company read rate cards" ON public.rate_cards FOR SELECT TO authenticated
  USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "managers write rate cards" ON public.rate_cards TO authenticated
  USING (public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));
CREATE TRIGGER rate_cards_touch BEFORE UPDATE ON public.rate_cards
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.rate_card_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  rate_card_id uuid NOT NULL REFERENCES public.rate_cards(id) ON DELETE CASCADE,
  label text NOT NULL,
  kind text NOT NULL DEFAULT 'distance', -- flat | distance | weight | time | accessorial | tier
  vehicle_type text,
  min_value numeric(12,3),
  max_value numeric(12,3),
  unit text, -- mi | km | lb | kg | hr | stop
  unit_price numeric(12,4) NOT NULL DEFAULT 0,
  flat_price numeric(12,2),
  minimum_charge numeric(12,2),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX rate_card_items_card_idx ON public.rate_card_items (rate_card_id);
CREATE INDEX rate_card_items_company_idx ON public.rate_card_items (company_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rate_card_items TO authenticated;
GRANT ALL ON public.rate_card_items TO service_role;
ALTER TABLE public.rate_card_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "company read rate card items" ON public.rate_card_items FOR SELECT TO authenticated
  USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "managers write rate card items" ON public.rate_card_items TO authenticated
  USING (public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));

-- =========================================================
-- DRIVER PAYOUTS
-- =========================================================
CREATE TABLE public.driver_payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  driver_id uuid NOT NULL REFERENCES public.drivers(id) ON DELETE CASCADE,
  period_start date NOT NULL,
  period_end date NOT NULL,
  status text NOT NULL DEFAULT 'pending', -- pending | approved | paid | failed | cancelled
  gross_amount numeric(12,2) NOT NULL DEFAULT 0,
  deductions numeric(12,2) NOT NULL DEFAULT 0,
  adjustments numeric(12,2) NOT NULL DEFAULT 0,
  net_amount numeric(12,2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  payment_method text, -- ach | check | wire | cash | external
  external_id text,
  paid_at timestamptz,
  notes text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX driver_payouts_company_idx ON public.driver_payouts (company_id, status, period_end DESC);
CREATE INDEX driver_payouts_driver_idx ON public.driver_payouts (driver_id, period_end DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.driver_payouts TO authenticated;
GRANT ALL ON public.driver_payouts TO service_role;
ALTER TABLE public.driver_payouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "company read payouts" ON public.driver_payouts FOR SELECT TO authenticated
  USING (public.is_company_member(auth.uid(), company_id)
    OR public.is_driver_self(auth.uid(), driver_id));
CREATE POLICY "managers write payouts" ON public.driver_payouts TO authenticated
  USING (public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));
CREATE TRIGGER driver_payouts_touch BEFORE UPDATE ON public.driver_payouts
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.driver_payout_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  payout_id uuid NOT NULL REFERENCES public.driver_payouts(id) ON DELETE CASCADE,
  load_id uuid REFERENCES public.loads(id) ON DELETE SET NULL,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  kind text NOT NULL DEFAULT 'load', -- load | accessorial | bonus | tip | deduction | adjustment
  description text,
  quantity numeric(12,3) NOT NULL DEFAULT 1,
  unit_amount numeric(12,4) NOT NULL DEFAULT 0,
  amount numeric(12,2) NOT NULL DEFAULT 0,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX driver_payout_items_payout_idx ON public.driver_payout_items (payout_id);
CREATE INDEX driver_payout_items_company_idx ON public.driver_payout_items (company_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.driver_payout_items TO authenticated;
GRANT ALL ON public.driver_payout_items TO service_role;
ALTER TABLE public.driver_payout_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "company read payout items" ON public.driver_payout_items FOR SELECT TO authenticated
  USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "managers write payout items" ON public.driver_payout_items TO authenticated
  USING (public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));
