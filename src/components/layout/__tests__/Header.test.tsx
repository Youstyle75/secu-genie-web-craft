import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/testUtils';
import Header from '../Header';

describe('Header', () => {
  it('should render header with logo', () => {
    render(<Header />);
    expect(screen.getByText(/SecuGenie/i)).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Header />);
    expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
    expect(screen.getByText(/À propos/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
  });

  it('should render CTA buttons', () => {
    render(<Header />);
    expect(screen.getByText(/Connexion/i)).toBeInTheDocument();
    expect(screen.getByText(/Démarrer gratuitement/i)).toBeInTheDocument();
  });
});
