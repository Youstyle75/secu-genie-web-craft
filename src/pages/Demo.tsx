
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DemoDashboard from '@/components/demo/DemoDashboard';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Demo = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Simuler l'envoi d'un email et affichage du dashboard
    setTimeout(() => {
      navigate('/demo/dashboard');
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Découvrez SecuGenie <span className="text-blue-500">gratuitement</span>
          </h1>
          <p className="text-lg text-center mb-12 text-gray-600">
            Essayez notre solution pendant 14 jours sans engagement et sans carte de crédit
          </p>
          
          {!submitted ? (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-12">
              <h2 className="text-2xl font-bold mb-4">Commencer votre essai gratuit</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email professionnel
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="border border-gray-300 bg-white rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-blue-500 text-white">
                  Démarrer l'essai gratuit
                </Button>
                
                <p className="mt-4 text-sm text-gray-500 text-center">
                  En vous inscrivant, vous acceptez nos <a href="#" className="text-blue-500 hover:underline">Conditions d'utilisation</a> et notre <a href="#" className="text-blue-500 hover:underline">Politique de confidentialité</a>.
                </p>
              </form>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 mb-12 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Merci pour votre inscription!</h2>
              <p className="text-gray-600 mb-6">
                Nous vous avons envoyé un email avec les instructions pour continuer.
              </p>
              <div className="text-center">
                <Button 
                  onClick={() => navigate('/demo/dashboard')}
                  className="bg-blue-500 text-white"
                >
                  Accéder au tableau de bord
                </Button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-blue-500 font-semibold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Créez un compte</h3>
              <p className="text-gray-600">Inscrivez-vous en quelques secondes avec votre email professionnel</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-blue-500 font-semibold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Explorez les fonctionnalités</h3>
              <p className="text-gray-600">Découvrez toutes les fonctionnalités de SecuGenie pendant 14 jours</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-blue-500 font-semibold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Passez au premium</h3>
              <p className="text-gray-600">Choisissez l'abonnement qui correspond à vos besoins</p>
            </div>
          </div>
          
          {/* Témoignages */}
          <h2 className="text-2xl font-bold text-center mb-8">Ce que nos clients disent</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <blockquote className="italic text-gray-700">
                "Grâce à SecuGenie, notre temps de préparation des notices de sécurité a été divisé par 4. Un gain de temps considérable pour notre équipe."
              </blockquote>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="font-bold text-blue-500">JP</span>
                </div>
                <div>
                  <p className="font-medium">Jean Petit</p>
                  <p className="text-sm text-gray-600">Responsable Sécurité, Événements du Sud</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <blockquote className="italic text-gray-700">
                "L'assistant IA de SecuGenie nous a permis d'avoir des réponses immédiates à nos questions réglementaires. Un vrai plus pour notre équipe."
              </blockquote>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="font-bold text-blue-500">ML</span>
                </div>
                <div>
                  <p className="font-medium">Marie Leroy</p>
                  <p className="text-sm text-gray-600">Directrice ERP, Centre commercial Les Arcades</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Demo;
