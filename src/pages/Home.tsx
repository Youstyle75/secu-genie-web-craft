
import { ArrowRight, Award, BarChart, Clock, Shield, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const Home = () => {
  return (
    <Layout showBreadcrumb={false}>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Sécurité des événements et ERP <span className="text-accent">simplifiée par l'IA</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              SecuGenie révolutionne la création de documents de sécurité grâce à l'intelligence artificielle.
              Générez des plans d'évacuation, registres de sécurité et documents réglementaires en quelques clics.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/demo" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center">
                Essayer Gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/solutions" className="border border-gray-300 hover:border-primary text-gray-700 hover:text-primary px-6 py-3 rounded-md font-medium transition-colors">
                Découvrir nos Solutions
              </Link>
            </div>
          </div>
          <div className="reveal">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80"
                alt="Interface SecuGenie" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3 animate-pulse-light">
                <div className="bg-green-500 rounded-full p-2">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">Documents conformes</p>
                  <p className="text-green-500 text-xs font-semibold">100% réglementaire</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center reveal">
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">1000+</h3>
              <p className="text-gray-600">Clients Satisfaits</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center reveal" style={{ transitionDelay: "0.2s" }}>
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">5000+</h3>
              <p className="text-gray-600">Documents Générés</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center reveal" style={{ transitionDelay: "0.4s" }}>
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">90%</h3>
              <p className="text-gray-600">Gain de Temps</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 md:py-24">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Solutions</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Des outils intuitifs pour tous vos besoins en matière de sécurité événementielle et ERP.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-xl transition-shadow group">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-3">Plans d'Évacuation</h3>
            <p className="text-gray-600 mb-4">
              Créez des plans d'évacuation conformes à la réglementation en vigueur, avec un positionnement automatique des équipements.
            </p>
            <Link to="/solutions" className="text-primary hover:text-accent font-medium inline-flex items-center transition-colors">
              En savoir plus
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-xl transition-shadow group">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <BarChart className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-3">Registres de Sécurité</h3>
            <p className="text-gray-600 mb-4">
              Générez et mettez à jour facilement vos registres de sécurité avec suivi automatique des vérifications périodiques.
            </p>
            <Link to="/solutions" className="text-primary hover:text-accent font-medium inline-flex items-center transition-colors">
              En savoir plus
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-xl transition-shadow group">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Award className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-3">Conformité Réglementaire</h3>
            <p className="text-gray-600 mb-4">
              Vérification automatique de la conformité de vos équipements et installations selon les dernières réglementations.
            </p>
            <Link to="/solutions" className="text-primary hover:text-accent font-medium inline-flex items-center transition-colors">
              En savoir plus
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 md:py-24 bg-secondary -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Un processus simple en trois étapes pour générer vos documents de sécurité.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-4 reveal">
            <div className="flex-1 relative">
              <div className="bg-white rounded-lg p-6 shadow-md h-full">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  <span className="font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Importez votre plan</h3>
                <p className="text-gray-600">
                  Téléchargez le plan de votre établissement ou événement, ou créez-en un nouveau à partir de notre éditeur.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="h-8 w-8 text-accent" />
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="bg-white rounded-lg p-6 shadow-md h-full">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  <span className="font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Notre IA analyse</h3>
                <p className="text-gray-600">
                  L'IA de SecuGenie analyse votre plan, identifie les zones à risque et détermine le placement optimal des équipements de sécurité.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="h-8 w-8 text-accent" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="bg-white rounded-lg p-6 shadow-md h-full">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  <span className="font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Recevez vos documents</h3>
                <p className="text-gray-600">
                  Téléchargez instantanément vos documents de sécurité conformes et prêts à l'emploi, au format PDF ou imprimables.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12 reveal">
            <Link to="/demo" className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center">
              Essayer Maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent nos clients</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Découvrez comment SecuGenie aide les professionnels à simplifier la gestion de la sécurité.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4 italic">
              "SecuGenie nous a permis de réduire de 80% le temps consacré à la préparation des documents de sécurité pour nos événements. Un outil indispensable."
            </p>
            <div className="flex items-center">
              <div className="font-medium">
                <p>Sophie Martin</p>
                <p className="text-sm text-gray-500">Directrice d'Événements, EventPro</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4 italic">
              "La précision des plans générés et la mise à jour automatique des registres nous ont aidés à rester conformes aux réglementations changeantes. Service client exemplaire."
            </p>
            <div className="flex items-center">
              <div className="font-medium">
                <p>Thomas Durand</p>
                <p className="text-sm text-gray-500">Responsable Sécurité, Centre Commercial Grand Est</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4 italic">
              "L'interface est intuitive et le support est très réactif. Nous avons pu former notre équipe en un temps record. Je recommande vivement."
            </p>
            <div className="flex items-center">
              <div className="font-medium">
                <p>Marie Lefèvre</p>
                <p className="text-sm text-gray-500">Gérante, Théâtre Municipal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal">Prêt à simplifier votre gestion de la sécurité ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto reveal">
            Rejoignez plus de 1000 professionnels qui font confiance à SecuGenie pour leurs documents de sécurité.
          </p>
          <div className="flex flex-wrap justify-center gap-4 reveal">
            <Link to="/demo" className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center">
              Démarrer Gratuitement
            </Link>
            <Link to="/contact" className="bg-white hover:bg-gray-100 text-primary px-6 py-3 rounded-md font-medium transition-colors">
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
