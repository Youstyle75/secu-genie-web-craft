
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-24 bg-dark-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-dark-foreground">
            Prêt à simplifier votre gestion de la sécurité?
          </h2>
          <p className="text-xl text-dark-secondary mb-8">
            Essayez SecuGenie gratuitement pendant 14 jours
          </p>
          <Link
            to="/demo"
            className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-medium transition-all inline-flex items-center"
          >
            Démarrer maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
