
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { ChevronDown, ChevronUp, Search, Filter, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

type FaqItem = {
  question: string;
  answer: string;
  category: string;
  tags?: string[];
};

const faqItems: FaqItem[] = [
  {
    question: "Qu'est-ce que SecuGenie et comment ça fonctionne ?",
    answer: "SecuGenie est une plateforme qui utilise l'intelligence artificielle pour créer des documents de sécurité conformes à la réglementation pour les événements et établissements recevant du public (ERP). Notre système analyse vos plans, identifie les risques potentiels et génère automatiquement des documents complets et conformes.",
    category: "Général",
    tags: ["présentation", "service", "IA"]
  },
  {
    question: "Quels types de documents puis-je créer avec SecuGenie ?",
    answer: "Avec SecuGenie, vous pouvez créer des plans d'évacuation, des registres de sécurité, des analyses de risques, des consignes de sécurité personnalisées et des rapports de conformité réglementaire pour les événements et ERP.",
    category: "Services",
    tags: ["documents", "plans", "registres"]
  },
  {
    question: "Les documents générés sont-ils conformes à la réglementation française ?",
    answer: "Oui, tous les documents générés par SecuGenie sont conformes aux réglementations françaises en vigueur, notamment le Code de la construction et de l'habitation, le règlement de sécurité contre les risques d'incendie et de panique dans les ERP, et les normes NF.",
    category: "Réglementation",
    tags: ["conformité", "normes", "français"]
  },
  {
    question: "Comment importer mon plan dans SecuGenie ?",
    answer: "Vous pouvez importer votre plan existant au format PDF, DWG, JPG ou PNG. Notre système analysera automatiquement votre plan. Si vous n'avez pas de plan existant, vous pouvez également utiliser notre éditeur intégré pour en créer un facilement.",
    category: "Utilisation",
    tags: ["import", "plans", "fichiers"]
  },
  {
    question: "Quel est le délai pour obtenir mes documents ?",
    answer: "La génération des documents est instantanée après l'analyse de votre plan par notre IA. Pour les cas complexes nécessitant une vérification humaine, le délai maximum est de 48 heures ouvrées.",
    category: "Utilisation",
    tags: ["délais", "génération", "documents"]
  },
  {
    question: "Puis-je modifier mes documents après leur génération ?",
    answer: "Oui, vous avez la possibilité de modifier tous les éléments des documents générés directement depuis notre plateforme. Vous pouvez ajuster le positionnement des éléments de sécurité, modifier les textes et personnaliser l'apparence selon vos besoins.",
    category: "Utilisation",
    tags: ["modification", "personnalisation", "édition"]
  },
  {
    question: "Quelle réglementation s'applique aux ERP en matière de sécurité incendie ?",
    answer: "Les ERP sont soumis au règlement de sécurité contre l'incendie du 25 juin 1980 modifié, qui définit les mesures de prévention et de protection selon le type et la catégorie de l'établissement. Ce règlement impose notamment l'installation d'équipements de sécurité, la formation du personnel et la tenue d'un registre de sécurité.",
    category: "Réglementation",
    tags: ["incendie", "ERP", "règlement"]
  },
  {
    question: "Comment sont classifiés les Établissements Recevant du Public (ERP) ?",
    answer: "Les ERP sont classés selon deux critères : le type (activité) et la catégorie (capacité d'accueil). Il existe 30 types d'ERP (magasins, restaurants, hôtels, etc.) et 5 catégories selon la capacité d'accueil, de la 1ère (plus de 1500 personnes) à la 5ème (moins de 200 personnes pour les petits établissements).",
    category: "Réglementation",
    tags: ["classification", "ERP", "catégories"]
  },
  {
    question: "Quelles sont vos formules d'abonnement ?",
    answer: "Nous proposons plusieurs formules adaptées à vos besoins : Starter (pour les petits établissements, à partir de 19€/mois), Pro (pour les moyens établissements, à partir de 49€/mois) et Enterprise (solution personnalisée pour les grandes structures ou chaînes d'établissements).",
    category: "Tarifs",
    tags: ["abonnement", "prix", "offres"]
  },
  {
    question: "Comment se déroule l'accompagnement après souscription ?",
    answer: "Après souscription, vous bénéficiez d'une formation à l'utilisation de la plateforme, d'un support technique par email et téléphone, et de mises à jour régulières pour rester conforme aux évolutions réglementaires. Les offres Pro et Enterprise incluent également un accompagnement personnalisé.",
    category: "Services",
    tags: ["accompagnement", "support", "formation"]
  },
  {
    question: "Les plans d'évacuation produits sont-ils conformes à la norme NF ISO 23601 ?",
    answer: "Oui, tous nos plans d'évacuation respectent scrupuleusement la norme NF ISO 23601, qui définit les principes de conception des plans d'évacuation d'urgence. Cette norme précise notamment les dimensions, couleurs, symboles et informations obligatoires qui doivent figurer sur les plans.",
    category: "Réglementation",
    tags: ["plans", "normes", "ISO"]
  },
  {
    question: "Comment fonctionne l'analyse des risques automatisée ?",
    answer: "Notre système d'IA analyse votre plan et les informations que vous fournissez sur votre établissement ou événement. Il identifie automatiquement les risques potentiels en fonction de la configuration, de l'activité et de la capacité d'accueil. Ces risques sont ensuite hiérarchisés et des mesures préventives sont proposées.",
    category: "Utilisation",
    tags: ["analyse", "risques", "IA"]
  },
  {
    question: "Quels sont les documents obligatoires pour un événement recevant du public ?",
    answer: "Pour un événement recevant du public, vous devez généralement disposer : d'un dossier de sécurité incluant une notice descriptive et un plan des installations, d'un dispositif prévisionnel de secours (DPS) si nécessaire, d'une analyse des risques, et de consignes de sécurité. SecuGenie vous aide à produire tous ces documents conformément à la réglementation.",
    category: "Réglementation",
    tags: ["événement", "obligations", "documents"]
  },
  {
    question: "Comment sont gérées les mises à jour réglementaires ?",
    answer: "Notre équipe juridique surveille constamment les évolutions réglementaires. Dès qu'une modification significative est publiée au Journal Officiel, nos algorithmes et bases de données sont mis à jour. Nos abonnés sont automatiquement informés des changements qui les concernent, et leurs documents sont actualisés pour rester conformes.",
    category: "Services",
    tags: ["mises à jour", "réglementation", "conformité"]
  },
  {
    question: "Puis-je partager mes documents avec les autorités ou les services de secours ?",
    answer: "Oui, tous vos documents peuvent être exportés en format PDF ou imprimés en haute résolution. Vous pouvez les partager facilement avec les autorités compétentes, les commissions de sécurité ou les services de secours. Un QR code peut également être généré pour un accès rapide aux documents numériques.",
    category: "Utilisation",
    tags: ["partage", "autorités", "export"]
  },
  {
    question: "Que faire si je ne dispose pas des plans de mon établissement ?",
    answer: "Si vous ne disposez pas de plans, SecuGenie propose un éditeur intuitif qui vous permet de créer facilement un plan simplifié de votre établissement. Pour les abonnés Pro et Enterprise, nous proposons également un service de création de plans professionnels à partir de vos mesures ou d'une visite sur site par l'un de nos experts.",
    category: "Services",
    tags: ["création", "plans", "service"]
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
    const matchesSearch = searchQuery.toLowerCase() === '' || 
                          item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Reset active index when search changes
    setActiveIndex(null);
  };
  
  return (
    <Layout>
      <section className="py-12 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 reveal">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Questions Fréquentes</h1>
            <p className="text-lg text-gray-300">
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
                placeholder="Rechercher une question ou un mot-clé..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 w-full border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-dark-light text-white"
              />
            </div>
          </div>
          
          <div className="mb-8 flex flex-wrap gap-2 reveal">
            <div className="flex items-center mr-2">
              <Filter className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm text-gray-300">Filtrer par:</span>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                !selectedCategory
                  ? 'bg-accent text-white'
                  : 'bg-dark-light text-gray-300 hover:bg-dark-medium'
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
                    ? 'bg-accent text-white'
                    : 'bg-dark-light text-gray-300 hover:bg-dark-medium'
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
                  className="border-0 border-gray-800 rounded-lg overflow-hidden bg-dark-light"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex justify-between items-center w-full p-4 text-left bg-dark-light hover:bg-dark-medium transition-colors"
                  >
                    <span className="font-montserrat font-medium text-white">{item.question}</span>
                    {activeIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-accent" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="p-4 border-t border-gray-800 bg-dark-medium">
                      <p className="text-gray-300">{item.answer}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center bg-accent/20 text-accent text-xs px-2 py-1 rounded">
                          <FileText className="h-3 w-3 mr-1" />
                          {item.category}
                        </span>
                        {item.tags?.map(tag => (
                          <span key={tag} className="inline-block bg-dark-light text-gray-300 text-xs px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-dark-light rounded-lg border-0 border-gray-800">
                <p className="text-gray-400 mb-2">Aucun résultat ne correspond à votre recherche.</p>
                <p className="text-gray-300">Essayez avec d'autres mots-clés ou consultez toutes nos questions.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory(null);}}
                  className="mt-4 px-4 py-2 bg-dark-medium hover:bg-dark-light/80 rounded-md text-gray-300 transition-colors"
                >
                  Réinitialiser la recherche
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-12 text-center reveal">
            <h3 className="text-xl font-bold mb-4">Vous ne trouvez pas de réponse à votre question ?</h3>
            <p className="text-gray-300 mb-6">
              N'hésitez pas à nous contacter directement et notre équipe vous répondra dans les plus brefs délais.
            </p>
            <Link to="/contact" className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-md font-medium transition-colors">
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Faq;
