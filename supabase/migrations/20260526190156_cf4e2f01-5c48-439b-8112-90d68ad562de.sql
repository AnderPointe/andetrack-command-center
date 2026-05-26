
-- Add requested columns to existing messenger tables (additive — keeps current columns and policies intact)

-- messenger_contacts: add full_name, role, status; backfill from existing
ALTER TABLE public.messenger_contacts
  ADD COLUMN IF NOT EXISTS full_name text,
  ADD COLUMN IF NOT EXISTS role text,
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'offline';

UPDATE public.messenger_contacts SET full_name = display_name WHERE full_name IS NULL;
UPDATE public.messenger_contacts SET role = contact_type::text WHERE role IS NULL;
UPDATE public.messenger_contacts SET status = CASE WHEN is_online THEN 'online' ELSE 'offline' END WHERE status IS NULL;

ALTER TABLE public.messenger_contacts
  ALTER COLUMN full_name SET NOT NULL,
  ALTER COLUMN role SET NOT NULL;

-- messenger_conversations: add conversation_type and order_id
ALTER TABLE public.messenger_conversations
  ADD COLUMN IF NOT EXISTS conversation_type text DEFAULT 'direct',
  ADD COLUMN IF NOT EXISTS order_id uuid;

-- messenger_conversation_members: alias table for participants per requested schema
CREATE TABLE IF NOT EXISTS public.messenger_conversation_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.messenger_conversations(id) ON DELETE CASCADE,
  contact_id uuid REFERENCES public.messenger_contacts(id) ON DELETE CASCADE,
  user_id uuid,
  role text DEFAULT 'member',
  joined_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_conversation_members TO authenticated;
GRANT ALL ON public.messenger_conversation_members TO service_role;

ALTER TABLE public.messenger_conversation_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members view conversation members" ON public.messenger_conversation_members
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.messenger_conversations c
                 WHERE c.id = conversation_id AND public.is_company_member(auth.uid(), c.company_id)));

CREATE POLICY "Members add conversation members" ON public.messenger_conversation_members
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.messenger_conversations c
                      WHERE c.id = conversation_id AND public.is_company_member(auth.uid(), c.company_id)));

CREATE POLICY "Managers update conversation members" ON public.messenger_conversation_members
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.messenger_conversations c
                 WHERE c.id = conversation_id AND public.can_manage_company(auth.uid(), c.company_id)));

CREATE POLICY "Managers remove conversation members" ON public.messenger_conversation_members
  FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.messenger_conversations c
                 WHERE c.id = conversation_id AND public.can_manage_company(auth.uid(), c.company_id)));

-- messenger_messages: add company_id, message_body, message_type, is_outgoing
ALTER TABLE public.messenger_messages
  ADD COLUMN IF NOT EXISTS company_id uuid,
  ADD COLUMN IF NOT EXISTS message_body text,
  ADD COLUMN IF NOT EXISTS message_type text DEFAULT 'text',
  ADD COLUMN IF NOT EXISTS is_outgoing boolean DEFAULT false;

UPDATE public.messenger_messages m
  SET company_id = c.company_id
  FROM public.messenger_conversations c
  WHERE m.conversation_id = c.id AND m.company_id IS NULL;

UPDATE public.messenger_messages SET message_body = body WHERE message_body IS NULL;

-- messenger_attachments: add file_type, file_url
ALTER TABLE public.messenger_attachments
  ADD COLUMN IF NOT EXISTS file_type text,
  ADD COLUMN IF NOT EXISTS file_url text;

UPDATE public.messenger_attachments SET file_type = mime_type WHERE file_type IS NULL;

-- message_read_receipts: add contact_id, allow nullable user_id
ALTER TABLE public.message_read_receipts
  ADD COLUMN IF NOT EXISTS contact_id uuid REFERENCES public.messenger_contacts(id) ON DELETE CASCADE,
  ALTER COLUMN user_id DROP NOT NULL;
