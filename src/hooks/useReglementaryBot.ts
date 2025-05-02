
import { useEffect, useState } from 'react';
import { useLegifranceAuth } from './useLegifranceAuth';
import { ReglementaryReference, Message } from '../components/chatbot/types';
import { quickReplies } from '../components/chatbot/constants';

export const useReglementaryBot = () => {
  const { token, isLoading, error: authError } = useLegifranceAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processUserQuery = async (
    query: string,
    context: string[] = []
  ): Promise<Message> => {
    setIsProcessing(true);
    setError(null);

    try {
      // Si pas d'authentification Légifrance, utiliser la réponse locale
      if (!token || authError) {
        return generateLocalResponse(query);
      }

      // Recherche dans la base réglementaire via l'API Légifrance
      const references = await searchReglementaryReferences(query, token);
      
      // Générer une réponse basée sur les références trouvées
      const botResponse = await generateEnhancedResponse(query, references, context);
      
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

  // Fonction pour rechercher des références réglementaires
  const searchReglementaryReferences = async (
    query: string, 
    authToken: string
  ): Promise<ReglementaryReference[]> => {
    // En version réelle, cette fonction ferait un appel à l'API Légifrance
    // Pour l'instant, on simule un délai et on retourne des données mock
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulation de références trouvées selon les mots-clés de la requête
    const references: ReglementaryReference[] = [];
    
    if (query.toLowerCase().includes('erp')) {
      references.push({
        id: 'CCH-L123-1',
        title: 'Code de la construction et de l\'habitation, Article L123-1',
        url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045540884/',
        type: 'code'
      });
    }
    
    if (query.toLowerCase().includes('évacuation') || query.toLowerCase().includes('securite')) {
      references.push({
        id: 'A250685',
        title: 'Arrêté du 25 juin 1980 portant approbation des dispositions générales du règlement de sécurité',
        url: 'https://www.legifrance.gouv.fr/loda/id/LEGITEXT000020303557/',
        type: 'arrete'
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
      answer = 'Un ERP (Établissement Recevant du Public) est soumis à des règles strictes définies principalement par le Code de la Construction et de l\'Habitation et l\'arrêté du 25 juin 1980. Des dispositions spécifiques s\'appliquent selon le type et la catégorie de l\'établissement.';
      references.push({
        id: 'CCH-L123-1',
        title: 'Code de la construction et de l\'habitation, Article L123-1',
        url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045540884/',
        type: 'code'
      });
    }
    else if (lowerCaseInput.includes('plan') && lowerCaseInput.includes('évacuation')) {
      answer = 'Les plans d\'évacuation sont régis par la norme NF ISO 23601. Ils doivent être affichés à chaque niveau de bâtiment et comporter les éléments suivants: issues de secours, cheminements, équipements d\'extinction, consignes de sécurité et point de rassemblement.';
      references.push({
        id: 'NF-ISO-23601',
        title: 'Norme NF ISO 23601 - Plans d\'évacuation et d\'intervention',
        url: 'https://www.boutique.afnor.org/fr-fr/norme/nf-iso-23601/identification-de-securite-plans-devacuation-et-dintervention/fa179319/1285',
        type: 'article'
      });
    }
    else if (lowerCaseInput.includes('dps') || 
             (lowerCaseInput.includes('dispositif') && lowerCaseInput.includes('secours'))) {
      answer = 'Le Dispositif Prévisionnel de Secours (DPS) est encadré par le Référentiel National des Missions de Sécurité Civile. Son dimensionnement dépend du nombre de personnes présentes et du niveau de risque de l\'événement selon la grille d\'évaluation des risques (RIS).';
    }
    else if (lowerCaseInput.includes('gn6') || lowerCaseInput.includes('dossier de sécurité')) {
      answer = 'Le dossier de sécurité GN6 est requis pour les établissements spéciaux du type PA, SG, CTS, etc. Il doit comporter une notice technique de sécurité établie par l\'organisateur décrivant précisément les installations et les actions prévues pour garantir la sécurité du public et des participants.';
    }
    else {
      answer = 'Je ne suis pas sûr de comprendre votre demande concernant la réglementation. Pourriez-vous préciser si votre question porte sur les ERP, la sécurité événementielle, les plans d\'évacuation ou les documents obligatoires? Vous pouvez également utiliser les options ci-dessous pour naviguer dans les sujets principaux.';
    }

    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: answer,
      timestamp: new Date(),
      references: references.length > 0 ? references : undefined
    };
  };

  // Fonction pour générer une réponse enrichie (simulation API Légifrance)
  const generateEnhancedResponse = async (
    query: string,
    references: ReglementaryReference[],
    context: string[]
  ): Promise<Message> => {
    // Dans une version réelle, cette fonction pourrait utiliser une API d'IA
    // pour générer une réponse structurée basée sur les références trouvées
    
    // Pour l'instant, on utilise la réponse locale et on l'enrichit avec les références
    const baseResponse = generateLocalResponse(query);
    
    // Si on a des références, on les ajoute à la réponse
    if (references.length > 0) {
      baseResponse.references = references;
    }
    
    return baseResponse;
  };

  return {
    processUserQuery,
    isProcessing,
    error,
    isReady: !isLoading && !authError
  };
};
