
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-28 bg-white border-t border-gray-100">
      <div className="container-medium mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-textPrincipal leading-tight">
            Prêt à simplifier votre gestion de la sécurité?
          </h2>
          <p className="text-xl md:text-2xl text-textPrincipal/70 mb-10 font-normal">
            Essayez SecuGenie gratuitement pendant 14 jours
          </p>
          <Button
            asChild
            className="bg-accent hover:bg-accent-hover text-white px-8 py-6 text-lg font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
            size="lg"
          >
            <Link to="/demo" className="inline-flex items-center">
              Démarrer maintenant
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </Button>
          <div className="mt-8 text-gray-500 text-sm">
            Aucune carte de crédit requise
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
