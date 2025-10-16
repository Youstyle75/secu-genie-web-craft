import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/testUtils';
import userEvent from '@testing-library/user-event';
import Register from '../Register';
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

describe('Register', () => {
  const mockSignUp = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(AuthContext.useAuth).mockReturnValue({
      user: null,
      session: null,
      loading: false,
      signUp: mockSignUp,
      signIn: vi.fn(),
      signOut: vi.fn(),
    });
  });

  it('should render registration form', () => {
    render(<Register />);

    expect(screen.getByRole('heading', { name: /Créer un compte Secugenie/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^Nom$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Mot de passe/i)).toHaveLength(2);
    expect(screen.getByRole('button', { name: /Créer mon compte/i })).toBeInTheDocument();
  });

  it('should display validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<Register />);

    const submitButton = screen.getByRole('button', { name: /Créer mon compte/i });
    await user.click(submitButton);

    await vi.waitFor(() => {
      expect(screen.getByText(/Le nom doit contenir au moins 2 caractères/i)).toBeInTheDocument();
    });
  });

  it('should validate password match', async () => {
    const user = userEvent.setup();
    render(<Register />);

    const passwordInputs = screen.getAllByLabelText(/Mot de passe/i);
    await user.type(passwordInputs[0], 'password123');
    await user.type(passwordInputs[1], 'different');

    const submitButton = screen.getByRole('button', { name: /Créer mon compte/i });
    await user.click(submitButton);

    await vi.waitFor(() => {
      expect(screen.getByText(/Les mots de passe ne correspondent pas/i)).toBeInTheDocument();
    });
  });

  it('should call signUp with correct data', async () => {
    const user = userEvent.setup();
    mockSignUp.mockResolvedValue({ error: null });

    render(<Register />);

    await user.type(screen.getByLabelText(/^Nom$/i), 'Dupont');
    await user.type(screen.getByLabelText(/Prénom/i), 'Jean');
    await user.type(screen.getByLabelText(/Email/i), 'jean@example.com');
    
    const passwordInputs = screen.getAllByLabelText(/Mot de passe/i);
    await user.type(passwordInputs[0], 'password123');
    await user.type(passwordInputs[1], 'password123');

    const submitButton = screen.getByRole('button', { name: /Créer mon compte/i });
    await user.click(submitButton);

    await vi.waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith('jean@example.com', 'password123', {
        nom: 'Dupont',
        prenom: 'Jean',
      });
    });
  });

  it('should navigate to home on successful registration', async () => {
    const user = userEvent.setup();
    mockSignUp.mockResolvedValue({ error: null });

    render(<Register />);

    await user.type(screen.getByLabelText(/^Nom$/i), 'Dupont');
    await user.type(screen.getByLabelText(/Prénom/i), 'Jean');
    await user.type(screen.getByLabelText(/Email/i), 'jean@example.com');
    
    const passwordInputs = screen.getAllByLabelText(/Mot de passe/i);
    await user.type(passwordInputs[0], 'password123');
    await user.type(passwordInputs[1], 'password123');

    const submitButton = screen.getByRole('button', { name: /Créer mon compte/i });
    await user.click(submitButton);

    await vi.waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('should have link to login page', () => {
    render(<Register />);

    const loginLink = screen.getByRole('link', { name: /Se connecter/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/auth/login');
  });
});
