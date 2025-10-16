import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { supabase } from '@/integrations/supabase/client';

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should provide auth context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current.user).toBeNull();
    expect(result.current.session).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should sign up a user', async () => {
    const mockSignUp = vi.mocked(supabase.auth.signUp);
    mockSignUp.mockResolvedValue({
      data: { user: null, session: null },
      error: null,
    } as any);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    const { error } = await result.current.signUp('test@example.com', 'password123', {
      nom: 'Test',
      prenom: 'User',
    });
    expect(error).toBeNull();

    expect(mockSignUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      options: {
        emailRedirectTo: expect.any(String),
        data: { nom: 'Test', prenom: 'User' },
      },
    });
  });

  it('should sign in a user', async () => {
    const mockSignIn = vi.mocked(supabase.auth.signInWithPassword);
    mockSignIn.mockResolvedValue({
      data: { user: null, session: null },
      error: null,
    } as any);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    const { error } = await result.current.signIn('test@example.com', 'password123');
    expect(error).toBeNull();

    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should sign out a user', async () => {
    const mockSignOut = vi.mocked(supabase.auth.signOut);
    mockSignOut.mockResolvedValue({ error: null });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await result.current.signOut();

    expect(mockSignOut).toHaveBeenCalled();
  });

  it('should throw error when useAuth is used outside AuthProvider', () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within an AuthProvider');
  });
});
