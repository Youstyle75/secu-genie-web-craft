
import { ArrowRight, BookOpen, Calendar, CheckCircle, FileCheck, Map, Shield, Download, ExternalLink, Lightbulb, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import GN6Document from '@/components/documents/GN6Document';
import GN6Wizard from '@/components/documents/GN6Wizard';

const Solutions = () => {
  // State for animated elements
  const [showGN6Document, setShowGN6Document] = useState(false);
  
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
      
      {/* Document Types Grid - Replacing the Tabs */}
      <section className="py-12">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Nos Solutions</h2>
          
          {/* Documents Grid */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 - GN6 */}
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
                    <span>Assistance IA pour le remplissage</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 h-5 w-5 mr-2 mt-0.5" />
                    <span>Personnalisation complète</span>
                  </li>
                </ul>
                <button 
                  onClick={() => setShowGN6Document(!showGN6Document)} 
                  className="text-primary hover:text-primary-hover font-medium flex items-center"
                >
                  {showGN6Document ? 'Masquer l\'exemple' : 'Voir un exemple'}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
              
              {/* Card 2 - Plan de Prévention */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 reveal">
                <div className="bg-blue-50 rounded-xl p-4 inline-block mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Plan de Prévention</h3>
                <p className="text-gray-600 mb-4">
                  Création des plans de prévention pour les interventions d'entreprises extérieures.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 h-5 w-5 mr-2 mt-0.5" />
                    <span>Conformité décret du 20 février 1992</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 h-5 w-5 mr-2 mt-0.5" />
                    <span>Assistance IA pour l'analyse de risques</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 h-5 w-5 mr-2 mt-0.5" />
                    <span>Personnalisation aux spécificités</span>
                  </li>
                </ul>
              </div>
              
              {/* Card 3 - Notice de Sécurité ERP */}
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
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 h-5 w-5 mr-2 mt-0.5" />
                    <span>Conformité réglementaire assurée</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* GN6 Document Example */}
          {showGN6Document && (
            <div className="mb-16 reveal">
              <h2 className="text-3xl font-bold mb-8 text-center">Exemple de Document GN6</h2>
              <GN6Document />
            </div>
          )}
          
          {/* CTA */}
          <div className="text-center reveal mt-16">
            <div className="inline-block bg-dark rounded-2xl p-10 shadow-sm border border-dark-light">
              <h2 className="text-3xl font-bold mb-4 text-white">Prêt à simplifier votre gestion de la sécurité ?</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
                Démarrez gratuitement avec notre essai de 14 jours ou contactez-nous pour une démonstration personnalisée.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/demo" className="bg-accentBleu hover:bg-accentBleu/90 text-white px-8 py-4 rounded-xl font-medium transition-all transform hover:scale-105 duration-300 shadow-lg hover:shadow-accentBleu/20">
                  Essayer gratuitement
                </Link>
                <Link to="/contact" className="border border-white hover:border-gray-300 bg-transparent text-white hover:text-white/90 px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg">
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
