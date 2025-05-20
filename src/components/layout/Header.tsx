
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
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo with Shield icon instead of image */}
          <Link to="/" className="flex items-center">
            <Shield className="h-8 w-8 text-blue-500 mr-2" aria-hidden="true" />
            <span className="text-xl font-bold">Secu<span className="text-blue-500">Genie</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-blue-500' : 'text-gray-800 hover:text-blue-500'}`}
            >
              Accueil
            </Link>
            <Link 
              to="/solutions" 
              className={`text-sm font-medium transition-colors ${isActive('/solutions') ? 'text-blue-500' : 'text-gray-800 hover:text-blue-500'}`}
            >
              Solutions
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-blue-500' : 'text-gray-800 hover:text-blue-500'}`}
            >
              À propos
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-blue-500' : 'text-gray-800 hover:text-blue-500'}`}
            >
              Contact
            </Link>
            <Link 
              to="/faq" 
              className={`text-sm font-medium transition-colors ${isActive('/faq') ? 'text-blue-500' : 'text-gray-800 hover:text-blue-500'}`}
            >
              FAQ
            </Link>
          </nav>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/demo">
              <Button variant="default" size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
                Démo
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-800 p-2"
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
                  isActive('/') ? 'bg-gray-100 text-blue-500' : 'text-gray-800 hover:bg-gray-100 hover:text-blue-500'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/solutions" 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive('/solutions') ? 'bg-gray-100 text-blue-500' : 'text-gray-800 hover:bg-gray-100 hover:text-blue-500'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive('/about') ? 'bg-gray-100 text-blue-500' : 'text-gray-800 hover:bg-gray-100 hover:text-blue-500'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive('/contact') ? 'bg-gray-100 text-blue-500' : 'text-gray-800 hover:bg-gray-100 hover:text-blue-500'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/faq" 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive('/faq') ? 'bg-gray-100 text-blue-500' : 'text-gray-800 hover:bg-gray-100 hover:text-blue-500'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/demo"
                className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
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
