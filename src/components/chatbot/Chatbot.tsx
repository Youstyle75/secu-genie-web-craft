
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Message, QuickReply } from './types';
import { quickReplies } from './constants';
import ChatMessage from './ChatMessage';
import QuickReplies from './QuickReplies';
import ChatInput from './ChatInput';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial greeting when chat is opened
  const initialMessage: Message = {
    id: 'welcome',
    sender: 'bot',
    text: 'Bonjour ! Je suis l\'assistant virtuel de SecuGenie. Comment puis-je vous aider aujourd\'hui ?',
    timestamp: new Date()
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([initialMessage]);
      }, 300);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      sendMessage();
    }
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const generateBotResponse = (userInput: string): Message => {
    const lowerCaseInput = userInput.toLowerCase();
    let answer = '';

    if (lowerCaseInput.includes('tarif') || lowerCaseInput.includes('prix') || lowerCaseInput.includes('coût')) {
      answer = quickReplies.find(reply => reply.id === 'pricing')!.answer;
    } else if (lowerCaseInput.includes('règlement') || lowerCaseInput.includes('erp') || lowerCaseInput.includes('norme')) {
      answer = quickReplies.find(reply => reply.id === 'regulation')!.answer;
    } else if (lowerCaseInput.includes('service') || lowerCaseInput.includes('offre') || lowerCaseInput.includes('propose')) {
      answer = quickReplies.find(reply => reply.id === 'services')!.answer;
    } else if (lowerCaseInput.includes('plan') || lowerCaseInput.includes('évacuation')) {
      answer = quickReplies.find(reply => reply.id === 'evacuation')!.answer;
    } else if (lowerCaseInput.includes('document') || lowerCaseInput.includes('sécurité') || lowerCaseInput.includes('obligatoire')) {
      answer = quickReplies.find(reply => reply.id === 'document-security')!.answer;
    } else if (lowerCaseInput.includes('mise à jour') || lowerCaseInput.includes('légal') || lowerCaseInput.includes('juridique')) {
      answer = quickReplies.find(reply => reply.id === 'legal-updates')!.answer;
    } else if (lowerCaseInput.includes('contact') || lowerCaseInput.includes('parler') || lowerCaseInput.includes('conseiller')) {
      answer = 'Si vous souhaitez parler à un conseiller, vous pouvez nous contacter par téléphone au +33 1 23 45 67 89 ou utiliser notre formulaire de contact. Souhaitez-vous être redirigé vers notre page de contact ?';
    } else if (lowerCaseInput.includes('légifrance') || lowerCaseInput.includes('api') || lowerCaseInput.includes('réglementaire')) {
      answer = 'Nous travaillons actuellement sur l\'intégration de l\'API Légifrance pour vous fournir des réponses réglementaires précises et à jour. Cette fonctionnalité sera disponible prochainement. En attendant, n\'hésitez pas à consulter notre page FAQ ou à contacter directement notre équipe juridique.';
    } else {
      answer = 'Je ne suis pas sûr de comprendre votre demande. Pourriez-vous la reformuler ou choisir l\'une des options ci-dessous ?\n\nVous pouvez également consulter notre FAQ complète ou contacter notre équipe via le formulaire de contact.';
    }

    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: answer,
      timestamp: new Date()
    };
  };
  
  const sendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 1000);
  };
  
  const handleQuickReply = (reply: QuickReply) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: reply.text,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    setIsTyping(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply.answer,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 1000);
  };
  
  const redirectToContact = () => {
    setIsOpen(false);
    toast.info("Vous allez être redirigé vers la page de contact");
  };

  const redirectToFaq = () => {
    setIsOpen(false);
    toast.info("Vous allez être redirigé vers la FAQ");
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary-hover text-white rounded-full p-3 shadow-lg transition-colors z-50"
        aria-label="Ouvrir le chat"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
      
      <div
        className={`fixed bottom-20 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ maxHeight: '70vh' }}
      >
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            <h3 className="font-medium">SecuGenie Assistant</h3>
          </div>
          <button onClick={toggleChat} className="text-white" aria-label="Fermer le chat">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 h-80 overflow-y-auto bg-gray-50">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="mb-4">
              <div className="inline-block rounded-lg px-4 py-2 bg-white border border-gray-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef}></div>
        </div>
        
        {messages.length > 0 && (
          <QuickReplies 
            replies={quickReplies}
            onReplyClick={handleQuickReply}
            onRedirectContact={redirectToContact}
            onRedirectFaq={redirectToFaq}
          />
        )}
        
        <ChatInput
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onSend={sendMessage}
        />

        <div className="p-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1 text-gray-400" />
          Les informations fournies ne remplacent pas l'avis d'un expert.
        </div>
      </div>
    </>
  );
};

export default Chatbot;
