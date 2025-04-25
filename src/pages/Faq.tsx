
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

type FaqItem = {
  question: string;
  answer: string;
  category: string;
};

const faqItems: FaqItem[] = [
  {
    question: "Qu'est-ce que SecuGenie et comment ça fonctionne ?",
    answer: "SecuGenie est une plateforme qui utilise l'intelligence artificielle pour créer des documents de sécurité conformes à la réglementation pour les événements et établissements recevant du public (ERP). Notre système analyse vos plans, identifie les risques potentiels et génère automatiquement des documents complets et conformes.",
    category: "Général"
  },
  {
    question: "Quels types de documents puis-je créer avec SecuGenie ?",
    answer: "Avec SecuGenie, vous pouvez créer des plans d'évacuation, des registres de sécurité, des analyses de risques, des consignes de sécurité personnalisées et des rapports de conformité réglementaire pour les événements et ERP.",
    category: "Services"
  },
  {
    question: "Les documents générés sont-ils conformes à la réglementation française ?",
    answer: "Oui, tous les documents générés par SecuGenie sont conformes aux réglementations françaises en vigueur, notamment le Code de la construction et de l'habitation, le règlement de sécurité contre les risques d'incendie et de panique dans les ERP, et les normes NF.",
    category: "Réglementation"
  },
  {
    question: "Comment importer mon plan dans SecuGenie ?",
    answer: "Vous pouvez importer votre plan existant au format PDF, DWG, JPG ou PNG. Notre système analysera automatiquement votre plan. Si vous n'avez pas de plan existant, vous pouvez également utiliser notre éditeur intégré pour en créer un facilement.",
    category: "Utilisation"
  },
  {
    question: "Quel est le délai pour obtenir mes documents ?",
    answer: "La génération des documents est instantanée après l'analyse de votre plan par notre IA. Pour les cas complexes nécessitant une vérification humaine, le délai maximum est de 48 heures ouvrées.",
    category: "Utilisation"
  },
  {
    question: "Puis-je modifier mes documents après leur génération ?",
    answer: "Oui, vous avez la possibilité de modifier tous les éléments des documents générés directement depuis notre plateforme. Vous pouvez ajuster le positionnement des éléments de sécurité, modifier les textes et personnaliser l'apparence selon vos besoins.",
    category: "Utilisation"
  },
  {
    question: "Quelle réglementation s'applique aux ERP en matière de sécurité incendie ?",
    answer: "Les ERP sont soumis au règlement de sécurité contre l'incendie du 25 juin 1980 modifié, qui définit les mesures de prévention et de protection selon le type et la catégorie de l'établissement. Ce règlement impose notamment l'installation d'équipements de sécurité, la formation du personnel et la tenue d'un registre de sécurité.",
    category: "Réglementation"
  },
  {
    question: "Comment sont classifiés les Établissements Recevant du Public (ERP) ?",
    answer: "Les ERP sont classés selon deux critères : le type (activité) et la catégorie (capacité d'accueil). Il existe 30 types d'ERP (magasins, restaurants, hôtels, etc.) et 5 catégories selon la capacité d'accueil, de la 1ère (plus de 1500 personnes) à la 5ème (moins de 200 personnes pour les petits établissements).",
    category: "Réglementation"
  },
  {
    question: "Quelles sont vos formules d'abonnement ?",
    answer: "Nous proposons plusieurs formules adaptées à vos besoins : Starter (pour les petits établissements, à partir de 19€/mois), Pro (pour les moyens établissements, à partir de 49€/mois) et Enterprise (solution personnalisée pour les grandes structures ou chaînes d'établissements).",
    category: "Tarifs"
  },
  {
    question: "Comment se déroule l'accompagnement après souscription ?",
    answer: "Après souscription, vous bénéficiez d'une formation à l'utilisation de la plateforme, d'un support technique par email et téléphone, et de mises à jour régulières pour rester conforme aux évolutions réglementaires. Les offres Pro et Enterprise incluent également un accompagnement personnalisé.",
    category: "Services"
  }
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get unique categories
  const categories = Array.from(new Set(faqItems.map(item => item.category)));
  
  // Filter FAQ items based on search query and category
  const filteredFaqItems = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <Layout>
      <section className="py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 reveal">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Questions Fréquentes</h1>
            <p className="text-lg text-gray-700">
              Tout ce que vous devez savoir sur SecuGenie et nos services.
            </p>
          </div>
          
          <div className="mb-8 reveal">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher une question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="mb-8 flex flex-wrap gap-2 reveal">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                !selectedCategory
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Toutes
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="space-y-4 reveal">
            {filteredFaqItems.length > 0 ? (
              filteredFaqItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-montserrat font-medium">{item.question}</span>
                    {activeIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-primary" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-700">{item.answer}</p>
                      <div className="mt-2">
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucun résultat ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
          
          <div className="mt-12 text-center reveal">
            <h3 className="text-xl font-bold mb-4">Vous ne trouvez pas de réponse à votre question ?</h3>
            <p className="text-gray-700 mb-6">
              N'hésitez pas à nous contacter directement et notre équipe vous répondra dans les plus brefs délais.
            </p>
            <Link to="/contact" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-md font-medium transition-colors">
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Faq;
