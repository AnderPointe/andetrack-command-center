/**
 * Re-export of the Supabase browser client.
 * Production warning: only the VITE_SUPABASE_ANON_KEY is used here.
 * Never expose the service role key in the browser. Keep RLS enabled.
 */
export { supabase } from "@/integrations/supabase/client";
