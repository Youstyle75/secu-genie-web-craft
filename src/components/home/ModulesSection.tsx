
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModulesSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Nos modules de sécurité
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow reveal border border-gray-100">
            <h3 className="text-2xl font-bold mb-4">Formulaires</h3>
            <p className="text-gray-600 mb-6">
              Bibliothèque complète de formulaires réglementaires prêts à l'emploi
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-xs">✓</div>
                <span className="text-sm">GN6 auto-rempli</span>
              </li>
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-xs">✓</div>
                <span className="text-sm">Protocoles CHSCT</span>
              </li>
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-xs">✓</div>
                <span className="text-sm">Plans de prévention</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow reveal border border-gray-100">
            <h3 className="text-2xl font-bold mb-4">Éditeur de plans</h3>
            <p className="text-gray-600 mb-6">
              Éditeur visuel pour créer et modifier vos plans de sécurité
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-xs">✓</div>
                <span className="text-sm">Import multi-formats</span>
              </li>
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-xs">✓</div>
                <span className="text-sm">Bibliothèque d'icônes</span>
              </li>
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-xs">✓</div>
                <span className="text-sm">Export professionnel</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow reveal border border-gray-100">
            <h3 className="text-2xl font-bold mb-4">IA Réglementaire</h3>
            <p className="text-gray-600 mb-6">
              Intelligence artificielle spécialisée en réglementation de sécurité
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-xs">✓</div>
                <span className="text-sm">Veille réglementaire</span>
              </li>
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-xs">✓</div>
                <span className="text-sm">Validation des documents</span>
              </li>
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-xs">✓</div>
                <span className="text-sm">Chatbot 24/7</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <Link
            to="/demo"
            className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-medium transition-all inline-flex items-center"
          >
            Essayer gratuitement
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
