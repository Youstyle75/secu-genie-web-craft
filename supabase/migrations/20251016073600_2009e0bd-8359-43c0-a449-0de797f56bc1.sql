-- Create audit logs table for tracking all sensitive actions
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create index for efficient querying
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);

-- Enable RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own audit logs
CREATE POLICY "Users can view their own audit logs"
  ON public.audit_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create TOTP secrets table for 2FA
CREATE TABLE IF NOT EXISTS public.user_totp_secrets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  secret TEXT NOT NULL,
  backup_codes TEXT[] NOT NULL DEFAULT '{}',
  verified BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.user_totp_secrets ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only manage their own TOTP
CREATE POLICY "Users can manage their own TOTP"
  ON public.user_totp_secrets
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create rate limiting table
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL, -- user_id or IP address
  action TEXT NOT NULL, -- 'login', 'api_call', 'file_upload'
  count INTEGER DEFAULT 1 NOT NULL,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(identifier, action, window_start)
);

-- Create index for efficient rate limit checks
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier_action ON public.rate_limits(identifier, action, window_start);

-- Create user consents table for GDPR
CREATE TABLE IF NOT EXISTS public.user_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  cookie_consent BOOLEAN DEFAULT false NOT NULL,
  data_processing_consent BOOLEAN DEFAULT false NOT NULL,
  marketing_consent BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.user_consents ENABLE ROW LEVEL SECURITY;

-- Policy: Users can manage their own consents
CREATE POLICY "Users can manage their own consents"
  ON public.user_consents
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at on user_totp_secrets
CREATE TRIGGER update_user_totp_secrets_updated_at
  BEFORE UPDATE ON public.user_totp_secrets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for updated_at on user_consents
CREATE TRIGGER update_user_consents_updated_at
  BEFORE UPDATE ON public.user_consents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to clean old rate limit entries (older than 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.rate_limits
  WHERE window_start < now() - interval '1 hour';
END;
$$;

-- Function to export user data for GDPR
CREATE OR REPLACE FUNCTION public.export_user_data(target_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Only allow users to export their own data
  IF auth.uid() != target_user_id THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT jsonb_build_object(
    'profile', (SELECT row_to_json(p.*) FROM profiles p WHERE p.user_id = target_user_id),
    'projects', (SELECT jsonb_agg(row_to_json(pr.*)) FROM projects pr WHERE pr.user_id = target_user_id),
    'documents', (SELECT jsonb_agg(row_to_json(d.*)) FROM documents d WHERE d.user_id = target_user_id),
    'audit_logs', (SELECT jsonb_agg(row_to_json(a.*)) FROM audit_logs a WHERE a.user_id = target_user_id),
    'consents', (SELECT row_to_json(c.*) FROM user_consents c WHERE c.user_id = target_user_id)
  ) INTO result;

  RETURN result;
END;
$$;

COMMENT ON TABLE public.audit_logs IS 'Tracks all sensitive user actions for security audit trail';
COMMENT ON TABLE public.user_totp_secrets IS 'Stores TOTP secrets for 2FA authentication';
COMMENT ON TABLE public.rate_limits IS 'Tracks rate limiting for various actions';
COMMENT ON TABLE public.user_consents IS 'Stores user consents for GDPR compliance';