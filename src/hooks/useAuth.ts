import { useState, useEffect } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UseAuthReturn {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata?: UserMetadata) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<AuthResult>;
  updatePassword: (newPassword: string) => Promise<AuthResult>;
  isAuthenticated: boolean;
}

interface UserMetadata {
  nom?: string;
  prenom?: string;
  [key: string]: any;
}

interface AuthResult {
  error: AuthError | null;
  success: boolean;
}

/**
 * Custom hook for authentication management
 * Provides sign up, sign in, sign out, and password management
 * 
 * @example
 * const { user, signIn, signOut, loading } = useAuth();
 * 
 * if (loading) return <LoadingSpinner />;
 * if (!user) return <LoginForm onSubmit={signIn} />;
 */
export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST (critical for session management)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Sign up a new user
   * @param email - User email
   * @param password - User password (min 12 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
   * @param metadata - Optional user metadata (nom, prenom, etc.)
   */
  const signUp = async (
    email: string,
    password: string,
    metadata?: UserMetadata
  ): Promise<AuthResult> => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: metadata,
        },
      });

      if (error) {
        toast.error(error.message);
        return { error, success: false };
      }

      toast.success('Compte créé avec succès ! Vérifiez votre email.');
      return { error: null, success: true };
    } catch (error: any) {
      toast.error('Erreur lors de la création du compte');
      return { error, success: false };
    }
  };

  /**
   * Sign in existing user
   * @param email - User email
   * @param password - User password
   */
  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error('Email ou mot de passe incorrect');
        return { error, success: false };
      }

      toast.success('Connexion réussie !');
      return { error: null, success: true };
    } catch (error: any) {
      toast.error('Erreur lors de la connexion');
      return { error, success: false };
    }
  };

  /**
   * Sign out current user
   */
  const signOut = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error('Erreur lors de la déconnexion');
      } else {
        toast.success('Déconnexion réussie');
        setUser(null);
        setSession(null);
      }
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  /**
   * Send password reset email
   * @param email - User email
   */
  const resetPassword = async (email: string): Promise<AuthResult> => {
    try {
      const redirectUrl = `${window.location.origin}/auth/reset-password`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        toast.error(error.message);
        return { error, success: false };
      }

      toast.success('Email de réinitialisation envoyé !');
      return { error: null, success: true };
    } catch (error: any) {
      toast.error('Erreur lors de la réinitialisation du mot de passe');
      return { error, success: false };
    }
  };

  /**
   * Update user password (must be authenticated)
   * @param newPassword - New password
   */
  const updatePassword = async (newPassword: string): Promise<AuthResult> => {
    try {
      if (!user) {
        toast.error('Vous devez être connecté pour changer votre mot de passe');
        return { error: new Error('Not authenticated') as AuthError, success: false };
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        toast.error(error.message);
        return { error, success: false };
      }

      toast.success('Mot de passe mis à jour avec succès !');
      return { error: null, success: true };
    } catch (error: any) {
      toast.error('Erreur lors de la mise à jour du mot de passe');
      return { error, success: false };
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    isAuthenticated: !!user,
  };
};
