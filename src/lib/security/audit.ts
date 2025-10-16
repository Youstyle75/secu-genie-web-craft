import { supabase } from '@/integrations/supabase/client';

export type AuditAction =
  | 'user.login'
  | 'user.logout'
  | 'user.signup'
  | 'user.password_change'
  | 'user.2fa_enabled'
  | 'user.2fa_disabled'
  | 'user.account_deletion_requested'
  | 'document.create'
  | 'document.update'
  | 'document.delete'
  | 'document.sign'
  | 'document.export'
  | 'project.create'
  | 'project.update'
  | 'project.delete'
  | 'plan.create'
  | 'plan.update'
  | 'plan.delete'
  | 'data.export';

interface AuditLogEntry {
  action: AuditAction;
  resource_type: string;
  resource_id?: string;
  metadata?: Record<string, any>;
}

/**
 * Get client IP address (best effort)
 */
async function getClientIP(): Promise<string | null> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return null;
  }
}

/**
 * Get user agent
 */
function getUserAgent(): string {
  return navigator.userAgent;
}

/**
 * Log an audit entry
 */
export async function logAudit(entry: AuditLogEntry): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.warn('Cannot log audit: no user session');
      return;
    }

    const ip_address = await getClientIP();
    const user_agent = getUserAgent();

    const { error } = await supabase
      .from('audit_logs')
      .insert({
        user_id: user.id,
        action: entry.action,
        resource_type: entry.resource_type,
        resource_id: entry.resource_id,
        ip_address,
        user_agent,
        metadata: entry.metadata || {}
      });

    if (error) {
      console.error('Failed to log audit entry:', error);
    }
  } catch (error) {
    console.error('Audit logging error:', error);
  }
}

/**
 * Get user's audit logs
 */
export async function getUserAuditLogs(limit = 50) {
  const { data, error } = await supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Failed to fetch audit logs:', error);
    return [];
  }

  return data || [];
}

/**
 * Hook for easy audit logging
 */
export function useAuditLog() {
  return {
    log: logAudit,
    getLogs: getUserAuditLogs
  };
}
