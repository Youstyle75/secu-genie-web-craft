
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Shield, X } from 'lucide-react';
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
      isScrolled ? 'bg-white shadow-sm-relume py-3' : 'bg-white py-5'
    }`}>
      <div className="container-large mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo with Shield icon instead of image */}
          <Link to="/" className="flex items-center">
            <Shield className="h-8 w-8 text-accent mr-2" aria-hidden="true" />
            <span className="text-xl font-bold">Secu<span className="text-accent">Genie</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-accent' : 'text-textPrincipal hover:text-accent'}`}
            >
              Accueil
            </Link>
            <Link 
              to="/solutions" 
              className={`text-sm font-medium transition-colors ${isActive('/solutions') ? 'text-accent' : 'text-textPrincipal hover:text-accent'}`}
            >
              Solutions
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-accent' : 'text-textPrincipal hover:text-accent'}`}
            >
              À propos
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-accent' : 'text-textPrincipal hover:text-accent'}`}
            >
              Contact
            </Link>
            <Link 
              to="/faq" 
              className={`text-sm font-medium transition-colors ${isActive('/faq') ? 'text-accent' : 'text-textPrincipal hover:text-accent'}`}
            >
              FAQ
            </Link>
          </nav>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/demo">
              <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/5 font-medium">
                Essayer la démo
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-textPrincipal p-2"
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
                className={`text-sm font-medium px-3 py-2 rounded-relume transition-colors ${
                  isActive('/') ? 'bg-secondary text-accent' : 'text-textPrincipal hover:bg-secondary hover:text-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/solutions" 
                className={`text-sm font-medium px-3 py-2 rounded-relume transition-colors ${
                  isActive('/solutions') ? 'bg-secondary text-accent' : 'text-textPrincipal hover:bg-secondary hover:text-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-medium px-3 py-2 rounded-relume transition-colors ${
                  isActive('/about') ? 'bg-secondary text-accent' : 'text-textPrincipal hover:bg-secondary hover:text-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm font-medium px-3 py-2 rounded-relume transition-colors ${
                  isActive('/contact') ? 'bg-secondary text-accent' : 'text-textPrincipal hover:bg-secondary hover:text-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/faq" 
                className={`text-sm font-medium px-3 py-2 rounded-relume transition-colors ${
                  isActive('/faq') ? 'bg-secondary text-accent' : 'text-textPrincipal hover:bg-secondary hover:text-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/demo"
                className="bg-accent text-white px-3 py-2 rounded-relume text-sm font-medium hover:bg-accent-hover shadow-sm-relume"
                onClick={() => setIsMenuOpen(false)}
              >
                Essayer la démo
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
