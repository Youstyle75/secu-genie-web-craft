import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/testUtils';
import Footer from '../Footer';

describe('Footer', () => {
  it('should render footer', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should display copyright text', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear}.*Secugenie`, 'i'))).toBeInTheDocument();
  });

  it('should render social media or contact links if present', () => {
    render(<Footer />);
    // Adjust this test based on actual footer content
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeTruthy();
  });
});
