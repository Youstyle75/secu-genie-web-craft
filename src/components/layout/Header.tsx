
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FireExtinguisher } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-dark-medium/95 backdrop-blur-sm py-2 shadow-md" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center text-white">
          <FireExtinguisher className="h-6 w-6 text-accent mr-2" />
          <span className="text-2xl font-bold">SecuGenie</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-colors", 
              isActive('/') ? "text-accent" : "text-white hover:text-accent"
            )}
          >
            Accueil
          </Link>
          <Link 
            to="/solutions" 
            className={cn(
              "text-sm font-medium transition-colors", 
              isActive('/solutions') ? "text-accent" : "text-white hover:text-accent"
            )}
          >
            Solutions
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "text-sm font-medium transition-colors", 
              isActive('/about') ? "text-accent" : "text-white hover:text-accent"
            )}
          >
            À propos
          </Link>
          <Link 
            to="/pricing" 
            className={cn(
              "text-sm font-medium transition-colors", 
              isActive('/pricing') ? "text-accent" : "text-white hover:text-accent"
            )}
          >
            Tarifs
          </Link>
          <Link 
            to="/faq" 
            className={cn(
              "text-sm font-medium transition-colors", 
              isActive('/faq') ? "text-accent" : "text-white hover:text-accent"
            )}
          >
            FAQ
          </Link>
          <Link 
            to="/contact" 
            className={cn(
              "text-sm font-medium transition-colors", 
              isActive('/contact') ? "text-accent" : "text-white hover:text-accent"
            )}
          >
            Contact
          </Link>
          <Link 
            to="/demo" 
            className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg font-medium transition-all"
          >
            Essai gratuit
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation Drawer */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/95 backdrop-blur-md flex flex-col justify-center z-40 transition-transform duration-300 md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center space-y-6 p-4">
          <Link 
            to="/" 
            className={cn(
              "text-lg font-medium transition-colors", 
              isActive('/') ? "text-accent" : "text-white"
            )}
          >
            Accueil
          </Link>
          <Link 
            to="/solutions" 
            className={cn(
              "text-lg font-medium transition-colors", 
              isActive('/solutions') ? "text-accent" : "text-white"
            )}
          >
            Solutions
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "text-lg font-medium transition-colors", 
              isActive('/about') ? "text-accent" : "text-white"
            )}
          >
            À propos
          </Link>
          <Link 
            to="/pricing" 
            className={cn(
              "text-lg font-medium transition-colors", 
              isActive('/pricing') ? "text-accent" : "text-white"
            )}
          >
            Tarifs
          </Link>
          <Link 
            to="/faq" 
            className={cn(
              "text-lg font-medium transition-colors", 
              isActive('/faq') ? "text-accent" : "text-white"
            )}
          >
            FAQ
          </Link>
          <Link 
            to="/contact" 
            className={cn(
              "text-lg font-medium transition-colors", 
              isActive('/contact') ? "text-accent" : "text-white"
            )}
          >
            Contact
          </Link>
          <Link 
            to="/demo" 
            className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg font-medium transition-all mt-4"
          >
            Essai gratuit
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
