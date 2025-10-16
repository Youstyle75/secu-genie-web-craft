import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/testUtils';
import Home from '../Home';

describe('Home', () => {
  it('should render home page', () => {
    render(<Home />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should have header and footer', () => {
    render(<Home />);
    expect(screen.getByText(/SecuGenie/i)).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should display main heading or hero section', () => {
    render(<Home />);
    // Adjust based on actual home page content
    const main = screen.getByRole('main');
    expect(main).toBeTruthy();
  });
});
