
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PlanEditor from '@/components/demo/PlanEditor';
import DemoDashboard from '@/components/demo/DemoDashboard';

const Demo = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'dashboard'>('editor');
  
  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 reveal">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Démonstration</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Découvrez les fonctionnalités de SecuGenie à travers cette démonstration interactive.
            </p>
          </div>

          <div className="mb-10 reveal">
            <div className="flex flex-col sm:flex-row justify-between gap-6 md:gap-12 bg-primary/5 rounded-lg p-6">
              <div>
                <h2 className="text-2xl font-bold mb-3">
                  Essayez SecuGenie gratuitement
                </h2>
                <p className="text-gray-700 mb-4">
                  Cette démo vous permet d'explorer nos principales fonctionnalités. Pour une expérience complète, créez un compte gratuit.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                    <span className="text-gray-700">Accès à l'éditeur de plan complet</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                    <span className="text-gray-700">Génération de 3 documents gratuits</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                    <span className="text-gray-700">Assistance par chat incluse</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <a href="#" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-md font-medium inline-flex items-center justify-center transition-colors">
                  Créer un compte gratuit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 border-b border-gray-200 reveal">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-colors ${
                  activeTab === 'editor'
                    ? 'bg-white border border-gray-200 border-b-white text-primary'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Éditeur de Plan
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-white border border-gray-200 border-b-white text-primary'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Tableau de bord
              </button>
            </div>
          </div>

          <div className="reveal">
            {activeTab === 'editor' && <PlanEditor />}
            {activeTab === 'dashboard' && <DemoDashboard />}
          </div>

          <div className="mt-12 text-center reveal">
            <h3 className="text-2xl font-bold mb-4">Vous avez besoin de plus d'informations ?</h3>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
              N'hésitez pas à nous contacter pour en savoir plus sur nos solutions ou pour organiser une démonstration personnalisée avec l'un de nos experts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-md font-medium transition-colors">
                Nous Contacter
              </Link>
              <Link to="/faq" className="border border-gray-300 hover:border-primary text-gray-700 hover:text-primary px-6 py-3 rounded-md font-medium transition-colors">
                Consulter la FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Demo;
