import { z } from 'zod';
import DOMPurify from 'dompurify';

/**
 * Strict password validation schema
 * Requirements:
 * - Minimum 12 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 * - No common passwords
 */

const commonPasswords = [
  'password123', 'admin123', 'qwerty123', '123456789',
  'password', 'admin', 'letmein', 'welcome', 'monkey',
  'dragon', 'master', 'sunshine', 'princess', 'football'
];

export const strictPasswordSchema = z
  .string()
  .min(12, 'Le mot de passe doit contenir au moins 12 caractères')
  .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
  .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial')
  .refine(
    (password) => !commonPasswords.includes(password.toLowerCase()),
    'Ce mot de passe est trop commun'
  );

/**
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .trim()
  .email('Email invalide')
  .max(255, 'Email trop long');

/**
 * Sanitize HTML to prevent XSS attacks
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
}

/**
 * Sanitize user input (remove scripts, etc.)
 */
export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
}

/**
 * Validate and sanitize a string input
 */
export function validateAndSanitizeString(
  input: string,
  maxLength = 1000
): string {
  const schema = z.string().max(maxLength).trim();
  const validated = schema.parse(input);
  return sanitizeInput(validated);
}

/**
 * Check if a string contains potential SQL injection patterns
 * (Supabase handles this, but extra layer of defense)
 */
export function containsSqlInjection(input: string): boolean {
  const sqlPatterns = [
    /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bCREATE\b|\bALTER\b)/i,
    /(\bUNION\b|\bJOIN\b)/i,
    /(--|;|\/\*|\*\/)/,
    /(\bOR\b|\bAND\b)\s+\d+\s*=\s*\d+/i
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Validate file upload
 */
export const fileUploadSchema = z.object({
  name: z.string().max(255),
  size: z.number().max(10 * 1024 * 1024, 'Fichier trop volumineux (max 10MB)'),
  type: z.string().refine(
    (type) => ['application/pdf', 'image/jpeg', 'image/png', 'image/svg+xml'].includes(type),
    'Type de fichier non autorisé'
  )
});

/**
 * Validate UUID
 */
export const uuidSchema = z.string().uuid('ID invalide');

/**
 * Validate URL
 */
export const urlSchema = z.string().url('URL invalide').max(2048);
