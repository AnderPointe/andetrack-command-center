
-- Message Templates
CREATE TABLE public.messenger_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  template_name text NOT NULL,
  template_body text NOT NULL,
  category text,
  created_by uuid,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_templates TO authenticated;
GRANT ALL ON public.messenger_templates TO service_role;
ALTER TABLE public.messenger_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "templates_select_company" ON public.messenger_templates FOR SELECT TO authenticated USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "templates_insert_company" ON public.messenger_templates FOR INSERT TO authenticated WITH CHECK (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "templates_update_company" ON public.messenger_templates FOR UPDATE TO authenticated USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "templates_delete_company" ON public.messenger_templates FOR DELETE TO authenticated USING (public.can_manage_company(auth.uid(), company_id));

-- Conversation Tags
CREATE TABLE public.messenger_conversation_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  conversation_id uuid NOT NULL REFERENCES public.messenger_conversations(id) ON DELETE CASCADE,
  tag_name text NOT NULL,
  tag_color text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_conversation_tags TO authenticated;
GRANT ALL ON public.messenger_conversation_tags TO service_role;
ALTER TABLE public.messenger_conversation_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tags_select_company" ON public.messenger_conversation_tags FOR SELECT TO authenticated USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "tags_insert_company" ON public.messenger_conversation_tags FOR INSERT TO authenticated WITH CHECK (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "tags_delete_company" ON public.messenger_conversation_tags FOR DELETE TO authenticated USING (public.is_company_member(auth.uid(), company_id));

-- Message Tasks
CREATE TABLE public.messenger_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  conversation_id uuid REFERENCES public.messenger_conversations(id) ON DELETE CASCADE,
  message_id uuid REFERENCES public.messenger_messages(id) ON DELETE SET NULL,
  task_title text NOT NULL,
  task_description text,
  assigned_to uuid,
  status text NOT NULL DEFAULT 'open',
  priority text NOT NULL DEFAULT 'normal',
  due_at timestamptz,
  completed_at timestamptz,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_tasks TO authenticated;
GRANT ALL ON public.messenger_tasks TO service_role;
ALTER TABLE public.messenger_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tasks_select_company" ON public.messenger_tasks FOR SELECT TO authenticated USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "tasks_insert_company" ON public.messenger_tasks FOR INSERT TO authenticated WITH CHECK (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "tasks_update_company" ON public.messenger_tasks FOR UPDATE TO authenticated USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "tasks_delete_company" ON public.messenger_tasks FOR DELETE TO authenticated USING (public.can_manage_company(auth.uid(), company_id));

-- AI Summaries
CREATE TABLE public.messenger_ai_summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  conversation_id uuid NOT NULL REFERENCES public.messenger_conversations(id) ON DELETE CASCADE,
  summary_text text NOT NULL,
  risk_level text NOT NULL DEFAULT 'normal',
  suggested_action text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_ai_summaries TO authenticated;
GRANT ALL ON public.messenger_ai_summaries TO service_role;
ALTER TABLE public.messenger_ai_summaries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ai_summaries_select_company" ON public.messenger_ai_summaries FOR SELECT TO authenticated USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "ai_summaries_insert_company" ON public.messenger_ai_summaries FOR INSERT TO authenticated WITH CHECK (public.is_company_member(auth.uid(), company_id));

-- Call Logs
CREATE TABLE public.messenger_call_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  conversation_id uuid REFERENCES public.messenger_conversations(id) ON DELETE SET NULL,
  contact_user_id uuid,
  call_type text NOT NULL,
  call_status text NOT NULL DEFAULT 'completed',
  duration_seconds integer,
  notes text,
  linked_load_id uuid,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_call_logs TO authenticated;
GRANT ALL ON public.messenger_call_logs TO service_role;
ALTER TABLE public.messenger_call_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "call_logs_select_company" ON public.messenger_call_logs FOR SELECT TO authenticated USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "call_logs_insert_company" ON public.messenger_call_logs FOR INSERT TO authenticated WITH CHECK (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "call_logs_update_company" ON public.messenger_call_logs FOR UPDATE TO authenticated USING (public.is_company_member(auth.uid(), company_id));

-- Notification Preferences
CREATE TABLE public.messenger_notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  user_id uuid NOT NULL,
  conversation_id uuid REFERENCES public.messenger_conversations(id) ON DELETE CASCADE,
  notification_level text NOT NULL DEFAULT 'all',
  is_muted boolean NOT NULL DEFAULT false,
  muted_until timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, conversation_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_notification_preferences TO authenticated;
GRANT ALL ON public.messenger_notification_preferences TO service_role;
ALTER TABLE public.messenger_notification_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notif_prefs_select_own" ON public.messenger_notification_preferences FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "notif_prefs_insert_own" ON public.messenger_notification_preferences FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "notif_prefs_update_own" ON public.messenger_notification_preferences FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "notif_prefs_delete_own" ON public.messenger_notification_preferences FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Internal Notes (private notes inside a conversation, visible to company members only)
CREATE TABLE public.messenger_internal_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  conversation_id uuid NOT NULL REFERENCES public.messenger_conversations(id) ON DELETE CASCADE,
  author_id uuid NOT NULL,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_internal_notes TO authenticated;
GRANT ALL ON public.messenger_internal_notes TO service_role;
ALTER TABLE public.messenger_internal_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "internal_notes_select_company" ON public.messenger_internal_notes FOR SELECT TO authenticated USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "internal_notes_insert_company" ON public.messenger_internal_notes FOR INSERT TO authenticated WITH CHECK (public.is_company_member(auth.uid(), company_id) AND auth.uid() = author_id);
CREATE POLICY "internal_notes_delete_own" ON public.messenger_internal_notes FOR DELETE TO authenticated USING (auth.uid() = author_id);

-- Snooze field on conversation members (per-user snooze)
ALTER TABLE public.messenger_conversation_members ADD COLUMN IF NOT EXISTS snoozed_until timestamptz;

CREATE INDEX IF NOT EXISTS idx_messenger_templates_company ON public.messenger_templates(company_id);
CREATE INDEX IF NOT EXISTS idx_messenger_tasks_conversation ON public.messenger_tasks(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messenger_ai_summaries_conversation ON public.messenger_ai_summaries(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messenger_call_logs_conversation ON public.messenger_call_logs(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messenger_internal_notes_conversation ON public.messenger_internal_notes(conversation_id);
