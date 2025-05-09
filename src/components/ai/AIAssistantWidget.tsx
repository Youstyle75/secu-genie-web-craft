
import { useState } from 'react';
import { Bot, ChevronRight, ChevronLeft, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface AIAssistantWidgetProps {
  context?: string;
  documentType?: 'GN6' | 'PdP' | 'NoticeERP';
  section?: string;
  onSuggestionAccept?: (suggestion: string) => void;
}

const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({
  context = 'general',
  documentType,
  section,
  onSuggestionAccept
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  
  const simulateAIResponse = async (userQuery: string) => {
    setIsLoading(true);
    
    // Simuler un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Générer une réponse basée sur le contexte
    let aiResponse = '';
    
    if (documentType === 'GN6') {
      aiResponse = getGN6Response(userQuery, section);
    } else if (documentType === 'PdP') {
      aiResponse = getPdPResponse(userQuery, section);
    } else if (documentType === 'NoticeERP') {
      aiResponse = getNoticeERPResponse(userQuery, section);
    } else {
      aiResponse = getGeneralResponse(userQuery);
    }
    
    // Ajouter une référence réglementaire si pertinent
    if (userQuery.toLowerCase().includes('obligatoire') || 
        userQuery.toLowerCase().includes('réglementation') ||
        userQuery.toLowerCase().includes('règle') ||
        userQuery.toLowerCase().includes('légal')) {
      aiResponse += '\n\nRéférence: Article GN6 de l\'Arrêté du 25 juin 1980 portant approbation des dispositions générales du règlement de sécurité contre les risques d\'incendie et de panique dans les établissements recevant du public (ERP).';
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
  
  const getGN6Response = (query: string, section?: string) => {
    // Réponses pour le document GN6
    if (section === 'informations') {
      return "Pour les informations générales d'un dossier GN6, assurez-vous d'inclure le nom complet et les coordonnées de l'organisateur, ainsi que les dates précises et la nature de la manifestation. La qualité de l'organisateur (association, entreprise, collectivité) est également une information cruciale.";
    } else if (section === 'effectif') {
      return "Le calcul de l'effectif est un élément fondamental du dossier de sécurité GN6. Pour une manifestation temporaire, vous devez prendre en compte : 3 pers/m² pour les espaces d'exposition, 1 pers/m² pour les salles polyvalentes, 1 pers/siège pour les configurations assises. N'oubliez pas d'inclure le personnel d'organisation dans votre décompte total.";
    } else if (section === 'mesures') {
      return "Les mesures de sécurité doivent être proportionnées aux risques identifiés. Pour un événement en ERP de type L, assurez-vous d'inclure au minimum : dispositif de contrôle d'accès, moyens d'alarme et d'alerte, consignes de sécurité affichées, personnel formé à l'évacuation, et moyens d'extinction appropriés.";
    }
    
    return "Pour compléter efficacement votre dossier de sécurité GN6, soyez précis et exhaustif. Si vous avez une question spécifique sur une section (informations générales, calcul d'effectif, mesures de sécurité, plans ou pièces à joindre), n'hésitez pas à me demander.";
  };
  
  const getPdPResponse = (query: string, section?: string) => {
    // Réponses pour le Plan de Prévention
    return "Pour le Plan de Prévention, identifiez bien tous les risques d'interférence entre les activités et prévoyez des mesures de prévention adaptées. N'hésitez pas à me poser des questions spécifiques concernant ce document.";
  };
  
  const getNoticeERPResponse = (query: string, section?: string) => {
    // Réponses pour la Notice de Sécurité ERP
    return "Pour la Notice de Sécurité ERP, assurez-vous de respecter toutes les exigences réglementaires en matière d'évacuation, d'éclairage de sécurité, de désenfumage et de moyens de secours. Je peux vous aider à identifier les éléments spécifiques requis selon le type et la catégorie de votre ERP.";
  };
  
  const getGeneralResponse = (query: string) => {
    // Réponses générales
    return "Je suis votre assistant IA pour la création de documents de sécurité. Je peux vous aider à rédiger des dossiers GN6, des Plans de Prévention ou des Notices de Sécurité ERP conformes à la réglementation en vigueur. N'hésitez pas à me poser des questions précises ou à me demander des suggestions pour améliorer vos documents.";
  };
  
  const handleAcceptSuggestion = (suggestion: string) => {
    if (onSuggestionAccept) {
      onSuggestionAccept(suggestion);
      toast.success("Suggestion appliquée");
    }
  };

  // Retrait des références dans le texte pour l'affichage des suggestions
  const extractSuggestionText = (text: string) => {
    return text.split('\n\nRéférence:')[0];
  };

  return (
    <div className={`fixed right-0 bottom-20 z-40 transition-all duration-300 ease-in-out 
                    ${isExpanded ? 'w-80 md:w-96' : 'w-14'}`}>
      <div className="flex flex-col border border-gray-200 rounded-l-lg bg-white shadow-lg h-[500px] overflow-hidden">
        <div className="bg-primary p-2 text-white flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white hover:bg-primary-hover"
          >
            {isExpanded ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
          {isExpanded && <span className="font-medium">Assistant IA</span>}
          <Bot className="h-5 w-5" />
        </div>
        
        {isExpanded && (
          <>
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {conversation.length > 0 ? (
                conversation.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-primary/10 ml-6' 
                        : 'bg-gray-50 border border-gray-100'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                    
                    {/* Ajouter un bouton "Appliquer" pour les messages de l'assistant si une callback d'acceptation est fournie */}
                    {msg.role === 'assistant' && onSuggestionAccept && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="mt-2 text-xs text-primary"
                        onClick={() => handleAcceptSuggestion(extractSuggestionText(msg.content))}
                      >
                        Appliquer cette suggestion
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                  <Bot className="h-12 w-12 mb-2 text-primary" />
                  <p className="text-center">
                    Bonjour, je suis votre assistant IA. Comment puis-je vous aider avec votre 
                    {documentType === 'GN6' ? ' dossier GN6' : 
                     documentType === 'PdP' ? ' Plan de Prévention' : 
                     documentType === 'NoticeERP' ? ' Notice de Sécurité ERP' : 
                     ' document de sécurité'} ?
                  </p>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
              <div className="flex gap-2">
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Posez votre question..."
                  className="min-h-[60px] resize-none"
                />
                <Button 
                  type="submit" 
                  className="self-end"
                  disabled={isLoading || !query.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAssistantWidget;
