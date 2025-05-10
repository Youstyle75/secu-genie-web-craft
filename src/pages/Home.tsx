
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useEffect, useRef } from 'react';

const Home = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

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

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <Layout showBreadcrumb={false}>
      {/* Hero Section - Relume-inspired */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Documents de sécurité <br className="hidden md:block" />
            <span className="text-accent">générés par IA</span>
          </h1>
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

      {/* Solution Cards - Relume-inspired */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow reveal border border-gray-100">
              <h3 className="text-2xl font-bold mb-4">Plans de Sécurité</h3>
              <p className="text-gray-600 mb-6">
                Représentation graphique des mesures et dispositifs de sécurité pour vos établissements et événements.
              </p>
              <Link to="/solutions" className="text-primary hover:text-primary-hover font-medium flex items-center">
                En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow reveal border border-gray-100">
              <h3 className="text-2xl font-bold mb-4">Plans de Prévention</h3>
              <p className="text-gray-600 mb-6">
                Documentation complète pour la prévention des risques liés à l'intervention d'entreprises extérieures.
              </p>
              <Link to="/solutions" className="text-primary hover:text-primary-hover font-medium flex items-center">
                En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ship Faster Section - Relume-inspired */}
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

      {/* Feature Blocks - Relume-inspired */}
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

      {/* Building Blocks - Relume-inspired */}
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
      
      {/* CTA Section - Relume-inspired */}
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
    </Layout>
  );
};

export default Home;
