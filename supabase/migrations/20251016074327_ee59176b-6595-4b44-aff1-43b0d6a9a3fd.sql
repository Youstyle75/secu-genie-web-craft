-- Fix RLS policies to allow public access to necessary resources
-- The audit_logs should only require auth for INSERT, not for the app to load

-- Drop overly restrictive policies if they exist
DROP POLICY IF EXISTS "Users can view their own audit logs" ON public.audit_logs;

-- Recreate with proper permissions - users can only view their own logs when authenticated
CREATE POLICY "Authenticated users can view their own audit logs"
  ON public.audit_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow system to insert audit logs (for logging from edge functions)
CREATE POLICY "System can insert audit logs"
  ON public.audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Make rate_limits table accessible to system for rate limiting checks
-- This table doesn't need user-facing RLS as it's managed by backend
ALTER TABLE public.rate_limits DISABLE ROW LEVEL SECURITY;

-- Ensure user_consents has proper default for new users
-- Drop existing policy and recreate
DROP POLICY IF EXISTS "Users can manage their own consents" ON public.user_consents;

CREATE POLICY "Users can view their own consents"
  ON public.user_consents
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own consents"
  ON public.user_consents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own consents"
  ON public.user_consents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Fix TOTP policies - split into separate policies
DROP POLICY IF EXISTS "Users can manage their own TOTP" ON public.user_totp_secrets;

CREATE POLICY "Users can view their own TOTP"
  ON public.user_totp_secrets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own TOTP"
  ON public.user_totp_secrets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own TOTP"
  ON public.user_totp_secrets
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own TOTP"
  ON public.user_totp_secrets
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);