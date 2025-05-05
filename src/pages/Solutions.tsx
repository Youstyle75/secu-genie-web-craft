
import { ArrowRight, BookOpen, Calendar, CheckCircle, FileCheck, Map, Shield, Download, ExternalLink, Lightbulb, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import GN6Document from '@/components/documents/GN6Document';

const Solutions = () => {
  // State for animated elements
  const [activeTab, setActiveTab] = useState<'documents' | 'plans' | 'reglementations' | 'prevention'>('documents');
  
  // Scroll animation for elements
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    });
    
    document.querySelectorAll('.reveal:not(.active)').forEach((el) => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      {/* Hero Section with Animation */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5 -mx-4 md:-mx-6 px-4 md:px-6 rounded-b-3xl overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/2 reveal">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Solutions <span className="text-accent">innovantes</span> de sécurité
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Simplifiez la création et la gestion de tous vos documents de sécurité réglementaires grâce à notre technologie IA avancée.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/demo" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105 duration-300 inline-flex items-center">
                  Essayer Gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/contact" className="bg-white hover:bg-gray-50 border border-gray-300 shadow-sm text-gray-700 hover:text-primary px-6 py-3 rounded-md font-medium transition-all duration-300">
                  Demander une démo
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 reveal">
              <div className="relative">
                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 transform hover:-rotate-1 transition-transform duration-300">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="text-sm text-gray-500 ml-2">Document de sécurité</div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                    <div className="h-24 bg-gray-100 rounded w-full"></div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-accent p-4 rounded-lg text-white shadow-lg animate-pulse">
                  <Shield className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tabs Navigation */}
      <section className="py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-lg shadow-md p-2 mb-12 flex flex-wrap justify-center reveal">
            <button 
              onClick={() => setActiveTab('documents')}
              className={cn(
                "px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center m-1",
                activeTab === 'documents' 
                  ? "bg-primary text-white shadow-md" 
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              )}
            >
              <FileText className="mr-2 h-5 w-5" />
              Documents de Sécurité
            </button>
            <button 
              onClick={() => setActiveTab('plans')}
              className={cn(
                "px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center m-1",
                activeTab === 'plans' 
                  ? "bg-primary text-white shadow-md" 
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              )}
            >
              <Map className="mr-2 h-5 w-5" />
              Plans d'Évacuation
            </button>
            <button 
              onClick={() => setActiveTab('prevention')}
              className={cn(
                "px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center m-1",
                activeTab === 'prevention' 
                  ? "bg-primary text-white shadow-md" 
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              )}
            >
              <Shield className="mr-2 h-5 w-5" />
              Plans de Prévention
            </button>
            <button 
              onClick={() => setActiveTab('reglementations')}
              className={cn(
                "px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center m-1",
                activeTab === 'reglementations' 
                  ? "bg-primary text-white shadow-md" 
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              )}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Veille Réglementaire
            </button>
          </div>
          
          {/* Tabs Content */}
          <div className="mb-12">
            {/* Documents Tab */}
            <div className={cn("transition-all duration-500", 
              activeTab === 'documents' ? "opacity-100 translate-y-0" : "opacity-0 absolute -translate-y-8")}>
              {activeTab === 'documents' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 reveal">
                    <div className="bg-blue-50 rounded-xl p-4 inline-block mb-4">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Dossiers GN6</h3>
                    <p className="text-gray-600 mb-4">
                      Génération assistée des dossiers de sécurité pour les rassemblements temporaires de personnes.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 h-5 w-5 mr-2 mt-0.5" />
                        <span>Conformité réglementaire</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 h-5 w-5 mr-2 mt-0.5" />
                        <span>Personnalisation complète</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Card 2 */}
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 reveal">
                    <div className="bg-blue-50 rounded-xl p-4 inline-block mb-4">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">DPS</h3>
                    <p className="text-gray-600 mb-4">
                      Génération des Dispositifs Prévisionnels de Secours optimisés selon votre événement.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 h-5 w-5 mr-2 mt-0.5" />
                        <span>Dimensionnement automatique</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 h-5 w-5 mr-2 mt-0.5" />
                        <span>Conformité référentiel national</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Card 3 */}
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 reveal">
                    <div className="bg-blue-50 rounded-xl p-4 inline-block mb-4">
                      <Lightbulb className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Notices de Sécurité</h3>
                    <p className="text-gray-600 mb-4">
                      Création de notices pour les ERP permanents ou temporaires, avec validation réglementaire.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 h-5 w-5 mr-2 mt-0.5" />
                        <span>Compatible tous types d'ERP</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 h-5 w-5 mr-2 mt-0.5" />
                        <span>Validation par IA réglementaire</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            {/* Plans Tab */}
            <div className={cn("transition-all duration-500", 
              activeTab === 'plans' ? "opacity-100 translate-y-0" : "opacity-0 absolute -translate-y-8")}>
              {activeTab === 'plans' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="reveal">
                    <h3 className="text-2xl font-bold mb-4">Éditeur de Plans Interactif</h3>
                    <p className="text-gray-700 mb-6">
                      Notre éditeur intuitif vous permet de créer ou modifier des plans de sécurité grâce à une interface simple et des outils puissants.
                    </p>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start bg-gray-50 p-3 rounded-lg">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <Download className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium block">Import multi-formats</span>
                          <span className="text-sm text-gray-600">PDF, DWG, PNG et JPG supportés</span>
                        </div>
                      </li>
                      <li className="flex items-start bg-gray-50 p-3 rounded-lg">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium block">Bibliothèque d'icônes</span>
                          <span className="text-sm text-gray-600">Icônes de sécurité normalisées</span>
                        </div>
                      </li>
                      <li className="flex items-start bg-gray-50 p-3 rounded-lg">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <ExternalLink className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium block">Export professionnel</span>
                          <span className="text-sm text-gray-600">Formats PDF, PNG haute résolution</span>
                        </div>
                      </li>
                    </ul>
                    <Link to="/demo" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 duration-300 inline-flex items-center">
                      Essayer l'éditeur
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                  <div className="reveal">
                    <div className="bg-grid-pattern rounded-lg border border-gray-200 shadow-lg overflow-hidden relative h-[350px]">
                      <div className="absolute left-10 top-12 bg-white shadow-md rounded p-3 transform rotate-2 z-10">
                        <Map className="h-12 w-12 text-primary" />
                      </div>
                      <div className="absolute right-28 top-48 bg-white shadow-md rounded p-2 transform -rotate-3 z-10">
                        <Shield className="h-8 w-8 text-red-500" />
                      </div>
                      <div className="absolute left-40 bottom-20 bg-white shadow-md rounded p-2 transform rotate-6 z-10">
                        <div className="h-6 w-6 rounded-full border-4 border-green-500"></div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 bg-white rounded-full shadow-lg px-4 py-2 text-sm font-medium text-primary">
                        Point de rassemblement
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Prevention Tab */}
            <div className={cn("transition-all duration-500", 
              activeTab === 'prevention' ? "opacity-100 translate-y-0" : "opacity-0 absolute -translate-y-8")}>
              {activeTab === 'prevention' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="reveal">
                    <h3 className="text-2xl font-bold mb-4">Plans de Prévention</h3>
                    <p className="text-gray-700 mb-6">
                      Générez automatiquement vos plans de prévention pour les entreprises extérieures intervenant sur vos sites.
                    </p>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start bg-gray-50 p-3 rounded-lg">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium block">Conformité réglementaire</span>
                          <span className="text-sm text-gray-600">Respect du décret du 20 février 1992</span>
                        </div>
                      </li>
                      <li className="flex items-start bg-gray-50 p-3 rounded-lg">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <FileCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium block">Gestion des entreprises</span>
                          <span className="text-sm text-gray-600">Base de données d'entreprises intervenantes</span>
                        </div>
                      </li>
                      <li className="flex items-start bg-gray-50 p-3 rounded-lg">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium block">Planification des interventions</span>
                          <span className="text-sm text-gray-600">Gestion temporelle des interventions</span>
                        </div>
                      </li>
                    </ul>
                    <Link to="/demo" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 duration-300 inline-flex items-center">
                      Essayer maintenant
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                  <div className="reveal">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                      <h4 className="font-bold mb-4 text-lg">Protocole de Prévention</h4>
                      <div className="space-y-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-sm">1. Entreprise utilisatrice</h5>
                          <p className="text-xs text-gray-500">Identité, adresse, activités principales</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-sm">2. Entreprise extérieure</h5>
                          <p className="text-xs text-gray-500">Identité, adresse, activités principales</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-sm">3. Date et durée prévisible de l'intervention</h5>
                          <p className="text-xs text-gray-500">Calendrier des travaux</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-sm">4. Nombre de travailleurs impliqués</h5>
                          <p className="text-xs text-gray-500">Qualification et habilitations nécessaires</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-sm">5. Description des travaux à effectuer</h5>
                          <p className="text-xs text-gray-500">Nature et séquencement des tâches</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                          <h5 className="font-medium text-sm text-primary">6. Analyse des risques</h5>
                          <p className="text-xs text-primary/70">Identification et mesures préventives</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Reglementations Tab */}
            <div className={cn("transition-all duration-500", 
              activeTab === 'reglementations' ? "opacity-100 translate-y-0" : "opacity-0 absolute -translate-y-8")}>
              {activeTab === 'reglementations' && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 reveal">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="bg-primary/10 p-3 rounded-full mr-4">
                          <BookOpen className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold">Veille Réglementaire</h3>
                      </div>
                      <p className="text-gray-700 mb-6">
                        Notre système de veille réglementaire automatisée vous alerte en temps réel des changements de législation impactant vos établissements et événements.
                      </p>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-center">
                          <CheckCircle className="text-primary h-5 w-5 mr-3" />
                          <span>Intégration des textes de Légifrance</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="text-primary h-5 w-5 mr-3" />
                          <span>Alertes personnalisées par type d'ERP</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="text-primary h-5 w-5 mr-3" />
                          <span>Mise à jour continue des références</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="text-primary h-5 w-5 mr-3" />
                          <span>Chatbot réglementaire disponible 24/7</span>
                        </li>
                      </ul>
                      <Link to="/demo" className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:translate-y-[-2px] duration-300 inline-flex items-center">
                        Explorer SecuBot
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 flex items-center justify-center">
                      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-lg">SecuBot</h4>
                          <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">En ligne</div>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-gray-100 rounded-lg p-3 text-sm">
                            <p>Quelles sont les obligations pour un ERP de type L ?</p>
                          </div>
                          <div className="bg-primary/10 rounded-lg p-3 text-sm">
                            <p>Les ERP de type L (salles de spectacles, conférences, etc.) doivent respecter les dispositions du règlement de sécurité, notamment concernant les dégagements, l'éclairage, le désenfumage et les installations techniques...</p>
                            <div className="text-xs text-primary mt-2">Références: Articles L. 123-1 à L. 123-4 CCH, Arrêté du 25 juin 1980</div>
                          </div>
                          <div className="flex">
                            <input type="text" className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 text-sm" placeholder="Posez votre question..." />
                            <button className="bg-primary text-white rounded-r-lg px-4">
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* GN6 Document Example */}
          <div className="mb-16 reveal">
            <h2 className="text-3xl font-bold mb-8 text-center">Exemple de Document GN6</h2>
            <GN6Document />
          </div>
          
          {/* CTA */}
          <div className="text-center reveal">
            <div className="inline-block bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-10 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold mb-4">Prêt à simplifier votre gestion de la sécurité ?</h2>
              <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                Démarrez gratuitement avec notre essai de 14 jours ou contactez-nous pour une démonstration personnalisée.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/demo" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-medium transition-all transform hover:scale-105 duration-300 shadow-lg hover:shadow-primary/20">
                  Essayer gratuitement
                </Link>
                <Link to="/contact" className="border border-gray-300 hover:border-primary bg-white text-gray-700 hover:text-primary px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg">
                  Demander une démo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Solutions;
