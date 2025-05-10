
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="py-24 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
          <span className="text-primary">SecuGenie</span>
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Documents de sécurité <br className="hidden md:block" />
          <span className="text-accent">générés par IA</span>
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Créez des documents de sécurité réglementaires en quelques minutes, pas en jours
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/demo"
            className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-medium transition-all flex items-center"
          >
            Démarrer un essai gratuit
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/contact"
            className="border border-gray-300 hover:border-primary px-8 py-4 rounded-lg font-medium transition-all text-gray-700 hover:text-primary"
          >
            Demander une démo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
