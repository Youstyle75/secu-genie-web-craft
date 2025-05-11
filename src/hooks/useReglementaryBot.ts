
import { useEffect, useState } from 'react';
import { useLegifranceAuth } from './useLegifranceAuth';
import { ReglementaryReference, Message } from '../components/chatbot/types';
import { quickReplies } from '../components/chatbot/constants';
import { useLegifrance } from './useLegifrance';

export const useReglementaryBot = () => {
  const { token, isLoading: authLoading, error: authError } = useLegifranceAuth();
  const { data: regulationData, isLoading: regulationsLoading, getReglementaryTexts } = useLegifrance();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [regulationCache, setRegulationCache] = useState<Record<string, any>>({});

  // Charger les réglementations au démarrage
  useEffect(() => {
    if (token && !authError) {
      getReglementaryTexts();
    }
  }, [token, authError]);

  const processUserQuery = async (
    query: string,
    context: string[] = []
  ): Promise<Message> => {
    setIsProcessing(true);
    setError(null);

    try {
      // Recherche intelligente dans les données réglementaires
      const queryLowerCase = query.toLowerCase();
      let relevantRegulations = [];
      
      // Si nous avons des données via l'API Légifrance, les utiliser
      if (regulationData && regulationData.length > 0) {
        relevantRegulations = regulationData.filter(regulation => {
          if (context.length > 0 && context.includes(regulation.category)) {
            return true;
          }
          
          // Recherche par mots-clés
          const keywords = extractKeywords(queryLowerCase);
          return keywords.some(keyword => 
            regulation.title.toLowerCase().includes(keyword) || 
            regulation.content.toLowerCase().includes(keyword)
          );
        });
      }

      // Recherche dans la base réglementaire via l'API Légifrance
      const references = await searchReglementaryReferences(query, token);
      
      // Générer une réponse enrichie basée sur les références trouvées et le contexte
      const botResponse = await generateEnhancedResponse(
        query, 
        references, 
        context,
        relevantRegulations
      );
      
      return botResponse;
    } catch (err) {
      console.error('Erreur lors du traitement de la requête:', err);
      setError('Une erreur est survenue lors du traitement de votre demande.');
      
      // Fallback à la réponse locale en cas d'erreur
      return generateLocalResponse(query);
    } finally {
      setIsProcessing(false);
    }
  };

  // Extraction de mots-clés de la requête
  const extractKeywords = (query: string): string[] => {
    // Mots à ignorer (articles, prépositions, etc.)
    const stopWords = ['le', 'la', 'les', 'du', 'de', 'des', 'un', 'une', 'et', 'ou', 'à', 'pour', 'par', 'en', 'que', 'qui', 'quoi'];
    
    return query
      .toLowerCase()
      .replace(/[.,?!;:()]/g, '')
      .split(' ')
      .filter(word => word.length > 2 && !stopWords.includes(word));
  };

  // Fonction pour rechercher des références réglementaires
  const searchReglementaryReferences = async (
    query: string, 
    authToken: string
  ): Promise<ReglementaryReference[]> => {
    // En version réelle, cette fonction ferait un appel à l'API Légifrance
    // Si nous n'avons pas de token, utiliser des données simulées
    if (!authToken || authError) {
      // Simuler un léger délai
      await new Promise(resolve => setTimeout(resolve, 300));
      return simulateReferences(query);
    }
    
    try {
      // Vérifier si la requête est dans le cache
      const cacheKey = query.toLowerCase();
      if (regulationCache[cacheKey]) {
        console.log('Récupération des références depuis le cache');
        return regulationCache[cacheKey];
      }
      
      // Simulation d'un appel à l'API avec un délai
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simuler des références pour cette démo
      const references = simulateReferences(query);
      
      // Mettre en cache les résultats
      setRegulationCache(prev => ({
        ...prev,
        [cacheKey]: references
      }));
      
      return references;
    } catch (error) {
      console.error("Erreur lors de la recherche de références:", error);
      return [];
    }
  };

  // Simuler des références selon la requête
  const simulateReferences = (query: string): ReglementaryReference[] => {
    const queryLower = query.toLowerCase();
    const references: ReglementaryReference[] = [];
    
    // Simulation de références trouvées selon les mots-clés
    if (queryLower.includes('erp') || queryLower.includes('établissement')) {
      references.push({
        id: 'CCH-L123-1',
        title: 'Code de la construction et de l\'habitation, Article L123-1',
        url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045540884/',
        type: 'code'
      });
      
      references.push({
        id: 'A250680',
        title: 'Arrêté du 25 juin 1980 - Dispositions générales du règlement de sécurité contre les risques d\'incendie',
        url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000290033/',
        type: 'arrete'
      });
    }
    
    if (queryLower.includes('évacuation') || queryLower.includes('secours') || queryLower.includes('issue')) {
      references.push({
        id: 'A250685',
        title: 'Arrêté du 25 juin 1980 - Article CO 34 à CO 39 relatif aux issues de secours',
        url: 'https://www.legifrance.gouv.fr/loda/id/LEGITEXT000020303557/',
        type: 'arrete'
      });
      
      references.push({
        id: 'NF-ISO-23601',
        title: 'Norme NF ISO 23601 - Plans d\'évacuation et d\'intervention',
        url: 'https://www.boutique.afnor.org/fr-fr/norme/nf-iso-23601/',
        type: 'norme'
      });
    }
    
    if (queryLower.includes('dps') || queryLower.includes('dispositif') && queryLower.includes('secours')) {
      references.push({
        id: 'RNSC-DPS',
        title: 'Référentiel National de la Sécurité Civile - Dispositifs Prévisionnels de Secours',
        url: 'https://www.interieur.gouv.fr/Le-ministere/Securite-civile/',
        type: 'referentiel'
      });
    }
    
    if (queryLower.includes('extincteur') || queryLower.includes('incendie') || queryLower.includes('feu')) {
      references.push({
        id: 'A250690-MS',
        title: 'Arrêté du 25 juin 1980 - Articles MS 38 et MS 39 relatifs aux extincteurs',
        url: 'https://www.legifrance.gouv.fr/loda/id/LEGITEXT000020303557/',
        type: 'arrete'
      });
      
      references.push({
        id: 'NF-S61-919',
        title: 'Norme NF S 61-919 - Maintenance des extincteurs d\'incendie portatifs',
        url: 'https://www.boutique.afnor.org/fr-fr/norme/',
        type: 'norme'
      });
    }
    
    return references;
  };

  // Fonction pour générer une réponse locale sans API
  const generateLocalResponse = (query: string): Message => {
    const lowerCaseInput = query.toLowerCase();
    let answer = '';
    let references: ReglementaryReference[] = [];

    // Recherche dans les quick replies
    const quickReply = quickReplies.find(reply => 
      lowerCaseInput.includes(reply.id) || 
      lowerCaseInput.includes(reply.text.toLowerCase())
    );

    if (quickReply) {
      answer = quickReply.answer;
    }
    // Réponses spécifiques selon les mots-clés
    else if (lowerCaseInput.includes('erp')) {
      answer = 'Un ERP (Établissement Recevant du Public) est soumis à des règles strictes définies principalement par le Code de la Construction et de l\'Habitation et l\'arrêté du 25 juin 1980. Les ERP sont classés en 5 catégories selon leur capacité d\'accueil, et en types selon leur activité. Chaque type d\'établissement est soumis à des dispositions particulières en plus des dispositions générales communes à tous les ERP.';
      references.push({
        id: 'CCH-L123-1',
        title: 'Code de la construction et de l\'habitation, Article L123-1',
        url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045540884/',
        type: 'code'
      });
    }
    else if (lowerCaseInput.includes('plan') && (lowerCaseInput.includes('évacuation') || lowerCaseInput.includes('evacuation'))) {
      answer = 'Les plans d\'évacuation sont régis par la norme NF ISO 23601. Ils doivent être affichés à chaque niveau de bâtiment et comporter les éléments suivants: issues de secours, cheminements, équipements d\'extinction, consignes de sécurité et point de rassemblement. Pour les ERP de 5ème catégorie, au moins un plan d\'évacuation est obligatoire. Pour les autres catégories, un plan doit être placé près de chaque entrée principale et à chaque niveau.';
      references.push({
        id: 'NF-ISO-23601',
        title: 'Norme NF ISO 23601 - Plans d\'évacuation et d\'intervention',
        url: 'https://www.boutique.afnor.org/fr-fr/norme/nf-iso-23601/identification-de-securite-plans-devacuation-et-dintervention/fa179319/1285',
        type: 'article'
      });
    }
    else if (lowerCaseInput.includes('dps') || 
             (lowerCaseInput.includes('dispositif') && lowerCaseInput.includes('secours'))) {
      answer = 'Le Dispositif Prévisionnel de Secours (DPS) est encadré par le Référentiel National des Missions de Sécurité Civile. Son dimensionnement dépend du nombre de personnes présentes et du niveau de risque de l\'événement selon la grille d\'évaluation des risques (RIS). Pour un événement de moins de 1500 personnes avec un risque modéré, un Point d\'Aide Médical (PAM) avec 4 secouristes peut suffire. Au-delà, une Équipe de Secouristes Intervenant (ESI) ou un Poste de Secours (PS) sont nécessaires.';
      references.push({
        id: 'RNSC-DPS',
        title: 'Référentiel National de la Sécurité Civile - Dispositifs Prévisionnels de Secours',
        url: 'https://www.interieur.gouv.fr/Le-ministere/Securite-civile/Documentation-technique/Les-referentiels-de-la-securite-civile/Les-referentiels-operationnels',
        type: 'referentiel'
      });
    }
    else if (lowerCaseInput.includes('gn6') || lowerCaseInput.includes('dossier de sécurité')) {
      answer = 'Le dossier de sécurité GN6 est requis pour les établissements spéciaux du type PA (Plein Air), SG (Structures Gonflables), CTS (Chapiteaux, Tentes et Structures), etc. Il doit comporter une notice technique de sécurité établie par l\'organisateur décrivant précisément les installations et les actions prévues pour garantir la sécurité du public et des participants. Ce document doit être transmis au maire (ou au préfet à Paris) au moins deux mois avant l\'ouverture au public.';
      references.push({
        id: 'A25068-GN6',
        title: 'Arrêté du 25 juin 1980 - Article GN 6',
        url: 'https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000020303748',
        type: 'arrete'
      });
    }
    else if (lowerCaseInput.includes('extincteur') || (lowerCaseInput.includes('moyen') && lowerCaseInput.includes('extinction'))) {
      answer = 'Les extincteurs sont régis par les articles MS 38 et MS 39 de l\'arrêté du 25 juin 1980. Ils doivent être installés à raison d\'un appareil pour 200m² et par niveau, avec un minimum de deux par niveau. Les extincteurs doivent être adaptés aux risques particuliers de l\'établissement (classe A pour les feux de matériaux solides, classe B pour les liquides, etc.). Leur maintenance doit être réalisée annuellement par un technicien compétent conformément à la norme NF S 61-919.';
      references.push({
        id: 'A250690-MS',
        title: 'Arrêté du 25 juin 1980 - Articles MS 38 et MS 39 relatifs aux extincteurs',
        url: 'https://www.legifrance.gouv.fr/loda/id/LEGITEXT000020303557/',
        type: 'arrete'
      });
    }
    else if (lowerCaseInput.includes('effectif') || lowerCaseInput.includes('capacité d\'accueil')) {
      answer = 'L\'effectif maximal admissible dans un ERP est déterminé selon l\'article CO 38 de l\'arrêté du 25 juin 1980. Il varie selon le type d\'établissement : pour un restaurant, on compte 1 personne/m² ; pour une salle de réunion/conférence, 1 personne/siège ou 1 personne/0,5m² ; pour un magasin, 1 personne/2m² de surface accessible au public. La catégorie de l\'ERP dépend ensuite de cet effectif : 1ère catégorie (>1500 personnes), 2ème (701-1500), 3ème (301-700), 4ème (≤300, sauf 5ème), 5ème (≤200 pour les petits établissements).';
      references.push({
        id: 'A250680-CO38',
        title: 'Arrêté du 25 juin 1980 - Article CO 38 Calcul de l\'effectif',
        url: 'https://www.legifrance.gouv.fr/loda/id/LEGITEXT000020303557/',
        type: 'arrete'
      });
    }
    else {
      answer = 'Je suis votre assistant spécialisé en réglementation de sécurité. Je peux vous renseigner sur les aspects légaux concernant les ERP (Établissements Recevant du Public), les événements, les plans d\'évacuation, les dispositifs de sécurité (DPS), le matériel de sécurité incendie ou les dossiers administratifs comme le GN6. Comment puis-je vous aider aujourd\'hui?';
    }

    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: answer,
      timestamp: new Date(),
      references: references.length > 0 ? references : undefined
    };
  };

  // Fonction pour générer une réponse enrichie 
  const generateEnhancedResponse = async (
    query: string,
    references: ReglementaryReference[],
    context: string[],
    relevantRegulations: any[] = []
  ): Promise<Message> => {
    // Analyse du contexte et de la requête pour une réponse plus précise
    const queryLowerCase = query.toLowerCase();
    let answer = '';
    
    // Si nous avons des réglementations pertinentes, les utiliser pour enrichir la réponse
    if (relevantRegulations.length > 0) {
      // Extrait des informations pertinentes des réglementations
      const extractedInfo = relevantRegulations.map(reg => {
        // Trouver les passages les plus pertinents
        const keywords = extractKeywords(query);
        const sentences = reg.content.split(/[.!?]+/).filter(s => s.trim() !== '');
        
        const relevantSentences = sentences.filter(sentence => 
          keywords.some(kw => sentence.toLowerCase().includes(kw))
        );
        
        return {
          title: reg.title,
          content: relevantSentences.length > 0 
            ? relevantSentences.join('. ') + '.' 
            : sentences.slice(0, 2).join('. ') + '.',
          category: reg.category
        };
      });
      
      // Construction d'une réponse enrichie
      if (extractedInfo.length > 0) {
        answer = `D'après ${extractedInfo[0].title}, ${extractedInfo[0].content} `;
        
        if (extractedInfo.length > 1) {
          answer += `De plus, ${extractedInfo[1].title} précise que ${extractedInfo[1].content}`;
        }
      }
    }
    
    // Si aucune réponse enrichie n'a pu être construite, utiliser la réponse locale
    if (!answer) {
      // Utilisez le générateur de réponse locale mais conservez les références trouvées
      const localResponse = generateLocalResponse(query);
      answer = localResponse.text;
      
      // Si des références ont été trouvées par l'API mais pas par la réponse locale
      if (references.length > 0 && (!localResponse.references || localResponse.references.length === 0)) {
        localResponse.references = references;
      }
      
      // Si la réponse locale a trouvé des références mais pas l'API
      if ((!references || references.length === 0) && localResponse.references && localResponse.references.length > 0) {
        references = localResponse.references;
      }
    }
    
    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: answer,
      timestamp: new Date(),
      references: references.length > 0 ? references : undefined
    };
  };

  return {
    processUserQuery,
    isProcessing,
    error,
    isReady: !authLoading && !authError
  };
};
