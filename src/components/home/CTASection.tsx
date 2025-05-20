
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-24 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Prêt à simplifier votre gestion de la sécurité?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Essayez SecuGenie gratuitement pendant 14 jours
          </p>
          <Button
            asChild
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg shadow-sm"
          >
            <Link to="/demo">
              Démarrer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
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
