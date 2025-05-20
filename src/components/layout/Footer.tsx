
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-900 pt-12 pb-6 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-blue-500 mr-2" aria-hidden="true" />
              <h3 className="text-xl font-bold">SecuGenie</h3>
            </div>
            <p className="mb-4 text-gray-600">
              Solutions innovantes de création de documents de sécurité pour les événements et ERP utilisant l'IA.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-500 transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-blue-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Démo
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Documents */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Documents</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/documents/notice-securite/creer" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Notice de Sécurité
                </Link>
              </li>
              <li>
                <Link to="/documents/plan-prevention/creer" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Plan de Prévention
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Dossier GN6
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">123 Avenue de la Sécurité, 75000 Paris, France</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-blue-500 shrink-0" />
                <a href="tel:+33123456789" className="text-gray-600 hover:text-blue-500 transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-500 shrink-0" />
                <a href="mailto:contact@secugenie.com" className="text-gray-600 hover:text-blue-500 transition-colors">
                  contact@secugenie.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SecuGenie. Tous droits réservés.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <Link to="/privacy" className="hover:text-blue-500 transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/terms" className="hover:text-blue-500 transition-colors">
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
