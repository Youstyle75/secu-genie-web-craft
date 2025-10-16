import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/testUtils';
import ProtectedRoute from '../ProtectedRoute';
import * as AuthContext from '@/contexts/AuthContext';

vi.mock('@/contexts/AuthContext');

describe('ProtectedRoute', () => {
  it('should show loading spinner when loading', () => {
    vi.mocked(AuthContext.useAuth).mockReturnValue({
      user: null,
      session: null,
      loading: true,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
    });

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
  });

  it('should redirect to login when user is not authenticated', () => {
    vi.mocked(AuthContext.useAuth).mockReturnValue({
      user: null,
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
    });

    const { container } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(container.innerHTML).toBe('');
  });

  it('should render children when user is authenticated', () => {
    vi.mocked(AuthContext.useAuth).mockReturnValue({
      user: { id: '123', email: 'test@example.com' } as any,
      session: {} as any,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
    });

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
