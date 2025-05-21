
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

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
      isScrolled ? 'bg-white shadow-sm py-3' : 'bg-white py-4'
    }`}>
      <div className="container-large mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo with Shield icon */}
          <Link to="/" className="flex items-center">
            <Shield className="h-8 w-8 text-accent mr-2" aria-hidden="true" />
            <span className="text-xl font-bold">Secu<span className="text-accent">Genie</span></span>
          </Link>
          
          {/* Desktop Navigation - Using Shadcn Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={cn(
                    "text-sm transition-colors px-3 py-2 rounded-md font-medium",
                    isActive('/') 
                      ? "text-accent bg-accent/5" 
                      : "text-primary hover:text-accent hover:bg-accent/5"
                  )}>
                    Accueil
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(
                    "text-sm transition-colors rounded-md font-medium",
                    isActive('/solutions') 
                      ? "text-accent bg-accent/5" 
                      : "text-primary hover:text-accent"
                  )}>Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/solutions"
                          >
                            <Shield className="h-6 w-6 text-accent mb-2" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Solutions de Sécurité
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Découvrez notre gamme complète de solutions pour assurer la sécurité de vos établissements
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link
                          to="/documents/notice-securite/creer"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/5 focus:bg-accent/5"
                        >
                          <div className="text-sm font-medium leading-none">Notice de Sécurité</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Créez des notices de sécurité conformes
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/documents/plan-prevention/creer"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/5 focus:bg-accent/5"
                        >
                          <div className="text-sm font-medium leading-none">Plan de Prévention</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Élaborez des plans de prévention détaillés
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/about" className={cn(
                    "text-sm transition-colors px-3 py-2 rounded-md font-medium",
                    isActive('/about') 
                      ? "text-accent bg-accent/5" 
                      : "text-primary hover:text-accent hover:bg-accent/5"
                  )}>
                    À propos
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/contact" className={cn(
                    "text-sm transition-colors px-3 py-2 rounded-md font-medium",
                    isActive('/contact') 
                      ? "text-accent bg-accent/5" 
                      : "text-primary hover:text-accent hover:bg-accent/5"
                  )}>
                    Contact
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/faq" className={cn(
                    "text-sm transition-colors px-3 py-2 rounded-md font-medium",
                    isActive('/faq') 
                      ? "text-accent bg-accent/5" 
                      : "text-primary hover:text-accent hover:bg-accent/5"
                  )}>
                    FAQ
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to="/login">
              <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/5 font-medium">
                Connexion
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="default" size="sm" className="bg-accent hover:bg-accent-hover text-white font-medium shadow-sm hover:shadow-md">
                Démarrer gratuitement
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-textPrincipal p-2"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation - Only visible when menu is open */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in">
            <nav className="flex flex-col space-y-2 bg-white rounded-lg shadow-lg p-4">
              <Link 
                to="/" 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive('/') ? 'bg-accent/5 text-accent' : 'text-primary hover:bg-accent/5 hover:text-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/solutions" 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive('/solutions') ? 'bg-accent/5 text-accent' : 'text-primary hover:bg-accent/5 hover:text-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive('/about') ? 'bg-accent/5 text-accent' : 'text-primary hover:bg-accent/5 hover:text-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive('/contact') ? 'bg-accent/5 text-accent' : 'text-primary hover:bg-accent/5 hover:text-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/faq" 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive('/faq') ? 'bg-accent/5 text-accent' : 'text-primary hover:bg-accent/5 hover:text-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="pt-2 flex flex-col space-y-2">
                <Link 
                  to="/login"
                  className="border border-accent text-accent hover:bg-accent/5 font-medium px-3 py-2 rounded-md text-sm text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  to="/demo"
                  className="bg-accent text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-accent-hover shadow-sm hover:shadow-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Démarrer gratuitement
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
