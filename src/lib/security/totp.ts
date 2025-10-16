/**
 * TOTP (Time-based One-Time Password) implementation for 2FA
 */

import { supabase } from '@/integrations/supabase/client';

/**
 * Generate a random base32 secret for TOTP
 */
export function generateTOTPSecret(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let secret = '';
  const randomValues = new Uint8Array(32);
  crypto.getRandomValues(randomValues);
  
  for (let i = 0; i < 32; i++) {
    secret += chars[randomValues[i] % chars.length];
  }
  
  return secret;
}

/**
 * Generate backup codes
 */
export function generateBackupCodes(count = 10): string[] {
  const codes: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomValues = new Uint8Array(4);
    crypto.getRandomValues(randomValues);
    const code = Array.from(randomValues)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
    codes.push(code);
  }
  
  return codes;
}

/**
 * Generate QR code data URL for TOTP
 */
export function generateTOTPQRCode(secret: string, email: string): string {
  const issuer = 'SecuGenie';
  const label = encodeURIComponent(`${issuer}:${email}`);
  const otpauthUrl = `otpauth://totp/${label}?secret=${secret}&issuer=${issuer}`;
  
  return otpauthUrl;
}

/**
 * Save TOTP secret to database
 */
export async function saveTOTPSecret(secret: string, backupCodes: string[]): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  const { error } = await supabase
    .from('user_totp_secrets')
    .upsert({
      user_id: user.id,
      secret,
      backup_codes: backupCodes,
      verified: false
    });

  return !error;
}

/**
 * Verify TOTP code (this would normally be done server-side)
 * For now, we'll use a placeholder that integrates with an edge function
 */
export async function verifyTOTPCode(code: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke('verify-totp', {
      body: { code }
    });

    if (error) throw error;
    return data?.valid || false;
  } catch (error) {
    console.error('TOTP verification error:', error);
    return false;
  }
}

/**
 * Enable 2FA for user
 */
export async function enable2FA(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  const { error } = await supabase
    .from('user_totp_secrets')
    .update({ verified: true })
    .eq('user_id', user.id);

  return !error;
}

/**
 * Disable 2FA for user
 */
export async function disable2FA(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  const { error } = await supabase
    .from('user_totp_secrets')
    .delete()
    .eq('user_id', user.id);

  return !error;
}

/**
 * Check if user has 2FA enabled
 */
export async function is2FAEnabled(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return false;
  }

  const { data } = await supabase
    .from('user_totp_secrets')
    .select('verified')
    .eq('user_id', user.id)
    .single();

  return data?.verified || false;
}
