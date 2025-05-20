
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Check if a nav link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo-secugenie.svg" 
              alt="SecuGenie" 
              className="h-8 md:h-10 w-auto mr-2" 
              aria-hidden="true" 
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-accent' : 'text-white hover:text-accent'}`}
            >
              Accueil
            </Link>
            <Link 
              to="/solutions" 
              className={`text-sm font-medium transition-colors ${isActive('/solutions') ? 'text-accent' : 'text-white hover:text-accent'}`}
            >
              Solutions
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-accent' : 'text-white hover:text-accent'}`}
            >
              À propos
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-accent' : 'text-white hover:text-accent'}`}
            >
              Contact
            </Link>
            <Link 
              to="/faq" 
              className={`text-sm font-medium transition-colors ${isActive('/faq') ? 'text-accent' : 'text-white hover:text-accent'}`}
            >
              FAQ
            </Link>
          </nav>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/demo">
              <Button variant="accent" size="sm" className="rounded-md">
                Démo
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile Navigation - Only visible when menu is open */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive('/') ? 'bg-dark-medium text-accent' : 'text-white hover:bg-dark-medium hover:text-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/solutions" 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive('/solutions') ? 'bg-dark-medium text-accent' : 'text-white hover:bg-dark-medium hover:text-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive('/about') ? 'bg-dark-medium text-accent' : 'text-white hover:bg-dark-medium hover:text-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive('/contact') ? 'bg-dark-medium text-accent' : 'text-white hover:bg-dark-medium hover:text-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/faq" 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive('/faq') ? 'bg-dark-medium text-accent' : 'text-white hover:bg-dark-medium hover:text-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/demo"
                className="bg-accent text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Démo
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
