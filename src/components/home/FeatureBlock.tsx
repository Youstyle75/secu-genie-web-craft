
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureBlock = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <h3 className="text-3xl font-bold mb-6">Formulaire GN6</h3>
            <p className="text-lg text-gray-600 mb-8">
              Générez automatiquement vos formulaires GN6 pour les événements exceptionnels dans les ERP, conformes aux exigences réglementaires.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                  ✓
                </div>
                <span>Formulaires auto-remplis</span>
              </li>
              <li className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                  ✓
                </div>
                <span>Validation par l'IA réglementaire</span>
              </li>
              <li className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                  ✓
                </div>
                <span>Exportation en PDF prêt à soumettre</span>
              </li>
            </ul>
            <Link to="/solutions" className="mt-8 inline-flex items-center text-primary hover:text-primary-hover font-medium">
              Découvrir <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md reveal border border-gray-200">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h4 className="font-bold">Demande d'autorisation GN6</h4>
                <p className="text-gray-500 text-sm">À retourner 1 mois avant la manifestation</p>
              </div>
              <div className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nature de la manifestation</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date et heure</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Effectif maximal</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureBlock;
