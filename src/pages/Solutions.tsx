
import { ArrowRight, BookOpen, Calendar, CheckCircle, FileCheck, Map, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const Solutions = () => {
  return (
    <Layout>
      <section className="py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 reveal">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Solutions</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Des solutions innovantes et complètes pour simplifier la gestion de la sécurité de vos établissements et événements.
            </p>
          </div>
          
          {/* Main Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Plans d'évacuation */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden reveal">
              <div className="relative h-48 bg-gradient-to-r from-primary to-primary-hover">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <Map className="w-20 h-20 opacity-30" />
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3">Plans d'évacuation intelligents</h2>
                <p className="text-gray-700 mb-6">
                  Notre IA analyse votre plan architectural pour générer des plans d'évacuation conformes aux normes en vigueur, avec positionnement optimal des équipements de sécurité.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                    <span>Plans conformes ISO 23601 et NF X 08-070</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                    <span>Positionnement automatique des équipements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                    <span>Personnalisation des consignes de sécurité</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                    <span>Formats d'exportation multiples (PDF, PNG, format imprimeur)</span>
                  </li>
                </ul>
                <Link to="/demo" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md font-medium inline-flex items-center transition-colors">
                  Voir la démonstration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            
            {/* Registres de sécurité */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden reveal" style={{ transitionDelay: "0.2s" }}>
              <div className="relative h-48 bg-gradient-to-r from-primary to-primary-hover">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <BookOpen className="w-20 h-20 opacity-30" />
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3">Registres de sécurité digitaux</h2>
                <p className="text-gray-700 mb-6">
                  Créez et gérez facilement vos registres de sécurité avec notre plateforme numérique. Suivez les vérifications périodiques et maintenez un historique complet.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                    <span>Registre conforme à la réglementation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                    <span>Rappels automatiques pour les vérifications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                    <span>Tableau de bord de suivi</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                    <span>Archivage sécurisé et accès mobile</span>
                  </li>
                </ul>
                <Link to="/demo" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md font-medium inline-flex items-center transition-colors">
                  Voir la démonstration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Secondary Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Analyses de risques */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden reveal">
              <div className="p-6">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Analyses de risques</h3>
                <p className="text-gray-700 mb-4">
                  Notre IA identifie les risques potentiels dans vos établissements ou événements et propose des mesures préventives adaptées.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-4 w-4 mr-2 mt-0.5" />
                    <span className="text-sm">Identification des risques spécifiques</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-4 w-4 mr-2 mt-0.5" />
                    <span className="text-sm">Recommandations personnalisées</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Gestion des événements */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden reveal" style={{ transitionDelay: "0.2s" }}>
              <div className="p-6">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Gestion des événements</h3>
                <p className="text-gray-700 mb-4">
                  Solution complète pour la sécurité de vos événements temporaires, des festivals aux salons professionnels.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-4 w-4 mr-2 mt-0.5" />
                    <span className="text-sm">Plans de sécurité événementielle</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-4 w-4 mr-2 mt-0.5" />
                    <span className="text-sm">Gestion des flux et capacités</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Conformité réglementaire */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden reveal" style={{ transitionDelay: "0.4s" }}>
              <div className="p-6">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Conformité réglementaire</h3>
                <p className="text-gray-700 mb-4">
                  Restez à jour avec les dernières réglementations et assurez-vous que vos installations respectent les normes en vigueur.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-4 w-4 mr-2 mt-0.5" />
                    <span className="text-sm">Veille réglementaire automatique</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-4 w-4 mr-2 mt-0.5" />
                    <span className="text-sm">Audits de conformité</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Pricing Section */}
          <div className="bg-gray-50 rounded-lg p-8 mb-16 reveal">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Nos Formules</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Choisissez la formule qui correspond à vos besoins et commencez à simplifier la gestion de votre sécurité dès aujourd'hui.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Formule Starter */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Starter</h3>
                  <div className="flex items-end mb-4">
                    <span className="text-3xl font-bold">19€</span>
                    <span className="text-gray-600 ml-1">/mois</span>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Idéal pour les petits établissements et événements ponctuels.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                      <span>3 documents par mois</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                      <span>1 utilisateur</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                      <span>Support par email</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                      <span>Formats d'export standard</span>
                    </li>
                  </ul>
                  <a href="#" className="block w-full py-2 bg-primary hover:bg-primary-hover text-white text-center rounded-md font-medium transition-colors">
                    Commencer
                  </a>
                </div>
              </div>
              
              {/* Formule Pro */}
              <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-primary relative">
                <div className="absolute top-0 right-0">
                  <div className="bg-accent text-white text-xs font-semibold px-3 py-1 rounded-bl-md">
                    POPULAIRE
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Pro</h3>
                  <div className="flex items-end mb-4">
                    <span className="text-3xl font-bold">49€</span>
                    <span className="text-gray-600 ml-1">/mois</span>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Pour les établissements de taille moyenne et les événements réguliers.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                      <span>10 documents par mois</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                      <span>3 utilisateurs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                      <span>Support prioritaire</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                      <span>Tous les formats d'export</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                      <span>Rappels automatiques</span>
                    </li>
                  </ul>
                  <a href="#" className="block w-full py-2 bg-primary hover:bg-primary-hover text-white text-center rounded-md font-medium transition-colors">
                    Commencer
                  </a>
                </div>
              </div>
              
              {/* Formule Enterprise */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                  <div className="flex items-end mb-4">
                    <span className="text-3xl font-bold">Sur mesure</span>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Pour les grandes organisations avec des besoins spécifiques.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                      <span>Documents illimités</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                      <span>Utilisateurs illimités</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                      <span>Support dédié</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                      <span>Intégration API</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5" />
                      <span>Personnalisation complète</span>
                    </li>
                  </ul>
                  <Link to="/contact" className="block w-full py-2 bg-gray-800 hover:bg-gray-700 text-white text-center rounded-md font-medium transition-colors">
                    Nous contacter
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="bg-primary text-white rounded-lg p-8 mb-16 reveal">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <blockquote className="text-xl italic">
                  "SecuGenie a transformé notre façon de gérer la sécurité. Nous avons réduit notre temps de préparation des documents de 80% tout en étant certains d'être parfaitement conformes aux réglementations."
                </blockquote>
                <div className="mt-4">
                  <p className="font-semibold">Thomas Durand</p>
                  <p className="text-white/80">Responsable Sécurité, Centre Commercial Grand Est</p>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8 md:border-l border-white/30">
                <h3 className="text-xl font-bold mb-4">Résultats obtenus</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <span className="text-xl font-bold">80%</span>
                    </div>
                    <span>de gain de temps sur la préparation des documents</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <span className="text-xl font-bold">100%</span>
                    </div>
                    <span>de conformité réglementaire</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <span className="text-xl font-bold">30%</span>
                    </div>
                    <span>de réduction des coûts liés à la sécurité</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center reveal">
            <h2 className="text-3xl font-bold mb-4">Prêt à simplifier votre gestion de la sécurité ?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Démarrez gratuitement avec notre essai de 14 jours ou contactez-nous pour une démonstration personnalisée.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-md font-medium transition-colors">
                Essayer gratuitement
              </a>
              <Link to="/contact" className="border border-gray-300 hover:border-primary text-gray-700 hover:text-primary px-6 py-3 rounded-md font-medium transition-colors">
                Demander une démo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Solutions;
