
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DemoDashboard from '@/components/demo/DemoDashboard';
import { CheckCircle } from 'lucide-react';
import { RelumeButton } from '@/components/ui/relume-button';
import { RelumeCard, RelumeCardHeader, RelumeCardTitle, RelumeCardContent } from '@/components/ui/relume-card';

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
          <h1 className="text-4xl font-bold mb-6 text-center text-primary">
            Découvrez SecuGenie <span className="text-accent">gratuitement</span>
          </h1>
          <p className="text-lg text-center mb-12 text-primary/70">
            Essayez notre solution pendant 14 jours sans engagement et sans carte de crédit
          </p>
          
          {!submitted ? (
            <RelumeCard className="mb-12">
              <RelumeCardHeader>
                <RelumeCardTitle>Commencer votre essai gratuit</RelumeCardTitle>
              </RelumeCardHeader>
              <RelumeCardContent>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-primary">
                      Email professionnel
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="border border-[#EAEAEA] bg-white rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-accent/30"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                  
                  <RelumeButton type="submit" variant="accent" fullWidth={true}>
                    Démarrer l'essai gratuit
                  </RelumeButton>
                  
                  <p className="mt-4 text-sm text-primary/60 text-center">
                    En vous inscrivant, vous acceptez nos <a href="#" className="text-accent hover:underline">Conditions d'utilisation</a> et notre <a href="#" className="text-accent hover:underline">Politique de confidentialité</a>.
                  </p>
                </form>
              </RelumeCardContent>
            </RelumeCard>
          ) : (
            <RelumeCard className="mb-12 text-center py-12">
              <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-primary">Merci pour votre inscription!</h2>
              <p className="text-primary/70 mb-6">
                Nous vous avons envoyé un email avec les instructions pour continuer.
              </p>
              <div className="text-center">
                <RelumeButton 
                  variant="accent"
                  onClick={() => navigate('/demo/dashboard')}
                >
                  Accéder au tableau de bord
                </RelumeButton>
              </div>
            </RelumeCard>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <span className="text-accent font-semibold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">Créez un compte</h3>
              <p className="text-primary/70">Inscrivez-vous en quelques secondes avec votre email professionnel</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <span className="text-accent font-semibold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">Explorez les fonctionnalités</h3>
              <p className="text-primary/70">Découvrez toutes les fonctionnalités de SecuGenie pendant 14 jours</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <span className="text-accent font-semibold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">Passez au premium</h3>
              <p className="text-primary/70">Choisissez l'abonnement qui correspond à vos besoins</p>
            </div>
          </div>
          
          {/* Témoignages */}
          <h2 className="text-2xl font-bold text-center mb-8 text-primary">Ce que nos clients disent</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RelumeCard variant="flat">
              <blockquote className="italic text-primary/80">
                "Grâce à SecuGenie, notre temps de préparation des notices de sécurité a été divisé par 4. Un gain de temps considérable pour notre équipe."
              </blockquote>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                  <span className="font-bold text-accent">JP</span>
                </div>
                <div>
                  <p className="font-medium text-primary">Jean Petit</p>
                  <p className="text-sm text-primary/60">Responsable Sécurité, Événements du Sud</p>
                </div>
              </div>
            </RelumeCard>
            
            <RelumeCard variant="flat">
              <blockquote className="italic text-primary/80">
                "L'assistant IA de SecuGenie nous a permis d'avoir des réponses immédiates à nos questions réglementaires. Un vrai plus pour notre équipe."
              </blockquote>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                  <span className="font-bold text-accent">ML</span>
                </div>
                <div>
                  <p className="font-medium text-primary">Marie Leroy</p>
                  <p className="text-sm text-primary/60">Directrice ERP, Centre commercial Les Arcades</p>
                </div>
              </div>
            </RelumeCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Demo;
