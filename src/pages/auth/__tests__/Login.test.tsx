import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/testUtils';
import userEvent from '@testing-library/user-event';
import Login from '../Login';
import * as AuthContext from '@/contexts/AuthContext';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@/contexts/AuthContext');

describe('Login', () => {
  const mockSignIn = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(AuthContext.useAuth).mockReturnValue({
      user: null,
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: mockSignIn,
      signOut: vi.fn(),
    });
  });

  it('should render login form', () => {
    render(<Login />);

    expect(screen.getByRole('heading', { name: /Connexion à Secugenie/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Se connecter/i })).toBeInTheDocument();
  });

  it('should display validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<Login />);

    const submitButton = screen.getByRole('button', { name: /Se connecter/i });
    await user.click(submitButton);

    // Wait for validation errors to appear
    await vi.waitFor(() => {
      expect(screen.getByText(/Email requis/i)).toBeInTheDocument();
    });
  });

  it('should display validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByLabelText(/Email/i);
    await user.type(emailInput, 'invalid-email');

    const submitButton = screen.getByRole('button', { name: /Se connecter/i });
    await user.click(submitButton);

    // Wait for validation errors to appear
    await vi.waitFor(() => {
      expect(screen.getByText(/Email invalide/i)).toBeInTheDocument();
    });
  });

  it('should call signIn with correct credentials', async () => {
    const user = userEvent.setup();
    mockSignIn.mockResolvedValue({ error: null });

    render(<Login />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    const submitButton = screen.getByRole('button', { name: /Se connecter/i });
    await user.click(submitButton);

    // Wait for signIn to be called
    await vi.waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('should navigate to home on successful login', async () => {
    const user = userEvent.setup();
    mockSignIn.mockResolvedValue({ error: null });

    render(<Login />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    const submitButton = screen.getByRole('button', { name: /Se connecter/i });
    await user.click(submitButton);

    // Wait for navigation
    await vi.waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('should show loading state during submission', async () => {
    const user = userEvent.setup();
    mockSignIn.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ error: null }), 100)));

    render(<Login />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    const submitButton = screen.getByRole('button', { name: /Se connecter/i });
    await user.click(submitButton);

    expect(screen.getByText(/Connexion.../i)).toBeInTheDocument();
  });

  it('should have link to register page', () => {
    render(<Login />);

    const registerLink = screen.getByRole('link', { name: /Créer un compte/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/auth/register');
  });
});
