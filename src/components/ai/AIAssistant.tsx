
import React, { useState, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface AIAssistantProps {
  currentStep: number;
  formData: any;
  onSuggestion: (field: string, value: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ currentStep, formData, onSuggestion }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<{role: 'user' | 'assistant', content: string}[]>([]);

  // Simuler les réponses de l'IA basées sur l'étape actuelle
  const simulateAIResponse = async (userQuery: string) => {
    setIsLoading(true);
    
    // Simuler un délai de traitement de l'IA
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let aiResponse = '';
    
    switch (currentStep) {
      case 0: // Organisateur
        aiResponse = getOrganizerResponse(userQuery);
        break;
      case 1: // Événement
        aiResponse = getEventResponse(userQuery);
        break;
      case 2: // Sécurité
        aiResponse = getSecurityResponse(userQuery);
        break;
      case 3: // Documents
        aiResponse = getDocumentsResponse(userQuery);
        break;
      case 4: // Finalisation
        aiResponse = getFinalResponse(userQuery);
        break;
      default:
        aiResponse = "Je suis désolé, je ne peux pas vous aider sur cette étape.";
    }
    
    setResponse(aiResponse);
    setConversation(prev => [
      ...prev, 
      { role: 'user', content: userQuery },
      { role: 'assistant', content: aiResponse }
    ]);
    setIsLoading(false);
    return aiResponse;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const userQuery = query;
    setQuery('');
    await simulateAIResponse(userQuery);
  };

  const getOrganizerResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('nom') || lowerQuery.includes('organisateur')) {
      return "Pour le nom de l'organisateur, vous devez indiquer le nom complet de la personne physique responsable de l'événement ou la raison sociale de l'entité organisatrice (association, entreprise, etc.).";
    }
    
    if (lowerQuery.includes('adresse')) {
      return "L'adresse doit être complète et inclure : numéro, rue, code postal et ville. Cette information est essentielle pour les autorités afin de vous contacter en cas de besoin.";
    }
    
    if (lowerQuery.includes('qualité') || lowerQuery.includes('statut')) {
      return "La qualité des organisateurs fait référence au statut juridique de l'entité organisatrice. Par exemple : association loi 1901, entreprise privée, collectivité territoriale, etc. Cette information est requise par l'article GN6 du règlement de sécurité.";
    }
    
    return "Pour compléter les informations de l'organisateur, assurez-vous de fournir des coordonnées précises et à jour. Ces informations serviront aux autorités pour vous contacter en cas de besoin. Si vous avez une question spécifique sur un champ, n'hésitez pas à me demander.";
  };

  const getEventResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('nature') || lowerQuery.includes('type')) {
      return "La nature de la manifestation doit être décrite avec précision : concert, exposition, conférence, spectacle, salon commercial, etc. Précisez également s'il s'agit d'une manifestation publique ou privée.";
    }
    
    if (lowerQuery.includes('date') || lowerQuery.includes('heure') || lowerQuery.includes('horaire')) {
      return "Indiquez toutes les dates et horaires de la manifestation, y compris les phases de montage et démontage si nécessaire. Format recommandé : JJ/MM/AAAA de XXh à XXh. Si l'événement dure plusieurs jours, précisez les horaires pour chaque jour.";
    }
    
    if (lowerQuery.includes('configuration') || lowerQuery.includes('aménagement')) {
      return "Détaillez la configuration prévue : disposition des sièges, scènes, stands, zones d'accueil, buvettes, etc. Ces informations sont essentielles pour évaluer les conditions de sécurité et d'évacuation. N'hésitez pas à préciser si vous utilisez du mobilier spécifique ou des structures temporaires.";
    }
    
    if (lowerQuery.includes('effectif') || lowerQuery.includes('public') || lowerQuery.includes('personnes')) {
      return "L'effectif maximal doit correspondre au nombre maximum de personnes susceptibles d'être présentes simultanément. Ce chiffre est crucial car il détermine les mesures de sécurité requises, notamment les dégagements et issues de secours nécessaires selon l'article CO38 du règlement de sécurité.";
    }
    
    return "Pour décrire correctement votre événement, soyez le plus précis possible sur sa nature, sa configuration et l'effectif attendu. Ces éléments détermineront les mesures de sécurité à mettre en place. N'hésitez pas à me poser des questions spécifiques sur un aspect particulier de votre événement.";
  };

  const getSecurityResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('mesure') || lowerQuery.includes('sécurité') || lowerQuery.includes('protection')) {
      return "Les mesures de sécurité doivent inclure : dispositifs pour contrôler les accès, moyens de communication d'urgence, signalétique, éclairage de sécurité, et toute autre mesure spécifique à votre événement. Soyez exhaustif, car ce point est particulièrement examiné par la commission de sécurité.";
    }
    
    if (lowerQuery.includes('service d\'ordre') || lowerQuery.includes('agent') || lowerQuery.includes('vigile')) {
      return "Le service d'ordre doit préciser le nombre d'agents de sécurité, leur qualification (APS, SSIAP) et leur répartition sur le site. Pour un événement public, la règle générale est d'1 agent pour 100 personnes, mais ce ratio peut varier selon la nature de l'événement et l'analyse des risques.";
    }
    
    if (lowerQuery.includes('incendie') || lowerQuery.includes('ssiap')) {
      return "Le service de sécurité incendie doit être adapté à votre ERP temporaire. Pour un effectif entre 300 et 1500 personnes, au minimum 1 SSIAP 1 est requis. Au-delà de 1500 personnes, il faut au moins 1 SSIAP 2 et 1 SSIAP 1. Ces agents doivent être présents pendant toute la durée de la manifestation accessible au public.";
    }
    
    if (lowerQuery.includes('évacuation') || lowerQuery.includes('issue') || lowerQuery.includes('sortie')) {
      return "Les issues de secours doivent être dimensionnées selon l'effectif (1 UP = 100 personnes, largeur minimale 0,90m). Pour un effectif < 500 personnes : minimum 2 sorties de 1 UP. Pour 500-1000 personnes : 2 sorties de 2 UP. Au-delà de 1000 personnes : +1 UP pour 500 personnes supplémentaires. Toutes les issues doivent être balisées et déverrouillées pendant la présence du public.";
    }
    
    return "Les mesures de sécurité sont l'élément central de votre dossier GN6. Elles doivent être proportionnées aux risques identifiés pour votre événement. N'hésitez pas à me demander des conseils spécifiques selon le type d'événement, sa taille et les activités prévues.";
  };

  const getDocumentsResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('attestation') || lowerQuery.includes('assurance')) {
      return "L'attestation d'assurance doit couvrir spécifiquement votre événement temporaire, avec les dates exactes et le lieu. Elle doit mentionner la responsabilité civile organisateur et préciser les montants de garantie, qui doivent être suffisants pour couvrir les dommages potentiels selon l'ampleur de la manifestation.";
    }
    
    if (lowerQuery.includes('plan') || lowerQuery.includes('masse')) {
      return "Le plan de masse doit montrer l'implantation de votre événement dans son environnement, avec les accès, les stationnements et les points d'eau/hydrants. Le plan côté doit détailler l'aménagement intérieur avec les dimensions, les issues de secours, la signalétique et l'emplacement des moyens de secours. Ces plans doivent être à l'échelle et lisibles.";
    }
    
    if (lowerQuery.includes('notice') || lowerQuery.includes('descriptive')) {
      return "La notice descriptive de sécurité doit décrire tous les moyens mis en œuvre pour assurer la sécurité : moyens d'alarme, systèmes d'alerte, moyens de secours, éclairage de sécurité, systèmes de désenfumage, etc. Elle doit également préciser les consignes de sécurité prévues et les procédures d'évacuation.";
    }
    
    if (lowerQuery.includes('calcul') || lowerQuery.includes('effectif')) {
      return "La note de calcul d'effectif doit justifier le nombre maximal de personnes déclaré. Elle doit se baser sur les ratios réglementaires du règlement ERP selon le type d'activité : 3 pers/m² pour les expositions, 1 pers/m² pour les salles polyvalentes, 1 pers/siège pour les configurations assises, etc. Ce calcul déterminera les exigences de sécurité applicables.";
    }
    
    return "Les documents à fournir sont essentiels pour l'instruction de votre dossier. Ils doivent être précis, complets et répondre aux exigences réglementaires. Assurez-vous qu'ils soient tous datés et signés quand nécessaire. Si vous avez des difficultés à produire un document spécifique, n'hésitez pas à me demander des conseils.";
  };

  const getFinalResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('délai') || lowerQuery.includes('temps')) {
      return "Votre dossier GN6 doit être déposé au moins 1 mois avant la date prévue de la manifestation. Pour des événements complexes ou de grande ampleur, un délai de 2 mois est recommandé pour permettre l'instruction complète du dossier et d'éventuelles demandes de compléments.";
    }
    
    if (lowerQuery.includes('commission') || lowerQuery.includes('visite')) {
      return "Une visite de la commission de sécurité peut être requise avant l'ouverture au public, notamment pour les grandes manifestations ou configurations complexes. Cette visite vérifiera la conformité des installations avec le dossier déposé. Prévoyez un temps suffisant avant l'événement pour remédier à d'éventuelles non-conformités relevées.";
    }
    
    if (lowerQuery.includes('modification') || lowerQuery.includes('changement')) {
      return "Toute modification substantielle apportée après le dépôt de votre dossier GN6 (augmentation d'effectif, changement de configuration, installations supplémentaires) doit être signalée aux autorités. Un avenant au dossier initial devra être soumis pour validation.";
    }
    
    return "Votre dossier GN6 est presque complet. Assurez-vous que toutes les informations sont exactes et cohérentes entre les différentes sections. Le document généré devra être signé par vous en tant qu'organisateur, ainsi que par l'exploitant du lieu si vous n'êtes pas propriétaire des locaux. N'hésitez pas à me demander une dernière vérification sur un point spécifique.";
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="mb-4 max-h-64 overflow-y-auto space-y-4">
        {conversation.length > 0 ? (
          conversation.map((msg, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-primary/10 ml-4 mr-2' 
                  : 'bg-white border border-gray-200 ml-2 mr-4'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-sm text-gray-500 p-4">
            Posez une question sur cette étape et je vous guiderai...
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Posez votre question..."
          className="min-h-[60px] resize-none"
        />
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Traitement...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Envoyer
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default AIAssistant;
