
import { ArrowRight, MessageSquare, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useEffect, useRef, useState } from 'react';

const Home = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [showChatbotHint, setShowChatbotHint] = useState(false);

  useEffect(() => {
    // Initialize the observer to add reveal animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current?.observe(el);
    });

    // Show chatbot hint after a delay
    const timer = setTimeout(() => {
      setShowChatbotHint(true);
    }, 3000);

    return () => {
      observerRef.current?.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <Layout showBreadcrumb={false}>
      {/* Hero Section */}
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

      {/* Solution Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nos Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow reveal border border-gray-100">
              <h3 className="text-2xl font-bold mb-4">Dossiers GN6</h3>
              <p className="text-gray-600 mb-6">
                Génération automatisée des dossiers de sécurité pour les rassemblements temporaires de personnes.
              </p>
              <Link to="/solutions" className="text-primary hover:text-primary-hover font-medium flex items-center">
                En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow reveal border border-gray-100">
              <h3 className="text-2xl font-bold mb-4">Plan de Prévention</h3>
              <p className="text-gray-600 mb-6">
                Documentation complète pour la prévention des risques liés à l'intervention d'entreprises extérieures.
              </p>
              <Link to="/solutions" className="text-primary hover:text-primary-hover font-medium flex items-center">
                En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow reveal border border-gray-100">
              <h3 className="text-2xl font-bold mb-4">Notices de Sécurité</h3>
              <p className="text-gray-600 mb-6">
                Création de notices pour les ERP permanents ou temporaires, avec validation réglementaire.
              </p>
              <Link to="/solutions" className="text-primary hover:text-primary-hover font-medium flex items-center">
                En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ship Faster Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-[120px] md:text-[180px] font-bold text-gray-200 opacity-50 absolute top-0 left-0 w-full text-center -mt-10">
            simplifiez
          </h2>
          <div className="text-center relative z-20 mt-20">
            <h3 className="text-4xl md:text-6xl font-bold text-accent mb-4">
              gain de temps
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Réduisez de 80% le temps passé à créer vos documents de sécurité
            </p>
          </div>
        </div>
      </section>

      {/* Feature Blocks */}
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

      {/* AI Assistant Highlight */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h3 className="text-3xl font-bold mb-6">Assistant IA Réglementaire</h3>
              <p className="text-lg text-gray-600 mb-6">
                Notre chatbot intelligent spécialisé en réglementation de sécurité vous aide à naviguer les complexités législatives en temps réel.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-accent/20 text-accent flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span>Réponses instantanées à vos questions réglementaires</span>
                </li>
                <li className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-accent/20 text-accent flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span>Références légales et articles de loi à jour</span>
                </li>
                <li className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-accent/20 text-accent flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span>Disponible 24/7 pour vous accompagner</span>
                </li>
              </ul>
              <button 
                onClick={() => {
                  document.querySelector('button[aria-label="Ouvrir le chat"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}
                className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center"
              >
                Poser une question <MessageSquare className="ml-2 h-5 w-5" />
              </button>
            </div>
            
            <div className="bg-gray-100 rounded-xl p-6 relative reveal">
              <div className="bg-white rounded-lg p-5 shadow-md mb-3 ml-auto max-w-xs">
                <p className="font-medium text-gray-800">Quelles sont les règles de sécurité pour un ERP?</p>
              </div>
              
              <div className="bg-primary/10 rounded-lg p-5 shadow-sm max-w-md">
                <div className="flex items-start gap-3">
                  <Bot className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-700">
                      Un ERP (Établissement Recevant du Public) est soumis à des règles strictes définies principalement par le Code de la Construction et de l'Habitation et l'arrêté du 25 juin 1980. Des dispositions spécifiques s'appliquent selon le type et la catégorie de l'établissement.
                    </p>
                    <div className="mt-3 text-xs bg-gray-100 p-2 rounded">
                      <p className="font-medium text-primary">Référence légale:</p>
                      <p>Code de la construction et de l'habitation, Article L123-1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Building Blocks */}
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
      
      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Prêt à simplifier votre gestion de la sécurité?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
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

      {/* Chatbot hint */}
      {showChatbotHint && (
        <div className="fixed bottom-24 right-8 bg-white p-4 rounded-xl shadow-lg z-40 max-w-xs animate-bounce-once reveal active">
          <div className="flex items-start gap-3">
            <Bot className="h-6 w-6 text-accent shrink-0" />
            <div>
              <p className="font-medium text-gray-800 mb-2">Une question sur la réglementation?</p>
              <p className="text-sm text-gray-600 mb-3">Essayez notre assistant IA spécialisé en réglementation de sécurité!</p>
              <button 
                onClick={() => {
                  setShowChatbotHint(false);
                  document.querySelector('button[aria-label="Ouvrir le chat"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}
                className="bg-accent hover:bg-accent-hover text-white text-sm px-4 py-2 rounded-lg font-medium transition-all w-full"
              >
                Poser ma question
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;
