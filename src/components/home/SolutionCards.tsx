
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolutionCards = () => {
  return (
    <section className="py-16 bg-dark-medium">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">Nos Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-dark-light rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow reveal border border-dark-medium">
            <h3 className="text-2xl font-bold mb-3 text-white">Dossiers GN6</h3>
            <p className="text-gray-300 mb-5">
              Génération automatisée des dossiers de sécurité pour les rassemblements temporaires de personnes.
            </p>
            <Link to="/solutions" className="text-accent hover:text-accent-hover font-medium flex items-center">
              En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="bg-dark-light rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow reveal border border-dark-medium">
            <h3 className="text-2xl font-bold mb-3 text-white">Plan de Prévention</h3>
            <p className="text-gray-300 mb-5">
              Documentation complète pour la prévention des risques liés à l'intervention d'entreprises extérieures.
            </p>
            <Link to="/solutions" className="text-accent hover:text-accent-hover font-medium flex items-center">
              En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="bg-dark-light rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow reveal border border-dark-medium">
            <h3 className="text-2xl font-bold mb-3 text-white">Notices de Sécurité</h3>
            <p className="text-gray-300 mb-5">
              Création de notices pour les ERP permanents ou temporaires, avec validation réglementaire.
            </p>
            <Link to="/solutions" className="text-accent hover:text-accent-hover font-medium flex items-center">
              En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionCards;
