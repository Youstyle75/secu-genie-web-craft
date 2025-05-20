
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-textPrincipal border-t border-gray-100">
      <div className="container-large mx-auto">
        {/* Footer main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-16 px-4">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center mb-6">
              <Shield className="h-7 w-7 text-accent mr-3" aria-hidden="true" />
              <h3 className="text-2xl font-bold">SecuGenie</h3>
            </div>
            <p className="mb-6 text-textPrincipal/70 text-base">
              Solutions innovantes de création de documents de sécurité pour les événements et ERP utilisant l'IA.
            </p>
            <div className="flex space-x-5">
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" 
                className="text-textPrincipal/50 hover:text-accent transition-colors" 
                aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" 
                className="text-textPrincipal/50 hover:text-accent transition-colors" 
                aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" 
                className="text-textPrincipal/50 hover:text-accent transition-colors" 
                aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-semibold mb-5">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-textPrincipal/70 hover:text-accent transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-textPrincipal/70 hover:text-accent transition-colors text-sm">
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-textPrincipal/70 hover:text-accent transition-colors text-sm">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-textPrincipal/70 hover:text-accent transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-textPrincipal/70 hover:text-accent transition-colors text-sm">
                  Démo
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Documents */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-semibold mb-5">Documents</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/documents/notice-securite/creer" className="text-textPrincipal/70 hover:text-accent transition-colors text-sm">
                  Notice de Sécurité
                </Link>
              </li>
              <li>
                <Link to="/documents/plan-prevention/creer" className="text-textPrincipal/70 hover:text-accent transition-colors text-sm">
                  Plan de Prévention
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-textPrincipal/70 hover:text-accent transition-colors text-sm">
                  Dossier GN6
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h3 className="text-base font-semibold mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-accent shrink-0 mt-0.5" />
                <span className="text-textPrincipal/70 text-sm">123 Avenue de la Sécurité, 75000 Paris, France</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-accent shrink-0" />
                <a href="tel:+33123456789" className="text-textPrincipal/70 hover:text-accent transition-colors text-sm">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-accent shrink-0" />
                <a href="mailto:contact@secugenie.com" className="text-textPrincipal/70 hover:text-accent transition-colors text-sm">
                  contact@secugenie.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright and legal links */}
        <div className="border-t border-gray-200 py-8 px-4">
          <div className="flex flex-col md:flex-row md:justify-between items-center text-center md:text-left">
            <p className="text-textPrincipal/60 text-sm">&copy; {currentYear} SecuGenie. Tous droits réservés.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy" className="text-textPrincipal/60 hover:text-accent transition-colors text-sm">
                Politique de confidentialité
              </Link>
              <Link to="/terms" className="text-textPrincipal/60 hover:text-accent transition-colors text-sm">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
