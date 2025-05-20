
import { useReducer, useRef, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { chatbotReducer, initialState } from './chatbotReducer';
import { useReglementaryBot } from '../../hooks/useReglementaryBot';
import ChatMessages from './ChatMessages';
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import QuickReplies from './QuickReplies';
import ChatInput from './ChatInput';
import { Message } from './types';
import { quickReplies } from './constants';

const Chatbot = () => {
  const [state, dispatch] = useReducer(chatbotReducer, initialState);
  const { isOpen, messages, inputValue, isTyping } = state;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { processUserQuery, isProcessing, error, isReady } = useReglementaryBot();
  
  const toggleChat = () => {
    dispatch({ type: 'TOGGLE_CHAT' });
    
    // Si c'est la première ouverture, ajouter un message d'accueil
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: `bot-welcome-${Date.now()}`,
        sender: 'bot',
        text: 'Bonjour, je suis votre assistant spécialisé en réglementation de sécurité. Je peux vous renseigner sur les ERP, événements, plans d\'évacuation, et plus encore. Comment puis-je vous aider aujourd\'hui?',
        timestamp: new Date()
      };
      
      dispatch({ type: 'ADD_BOT_MESSAGE', payload: welcomeMessage });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_INPUT_VALUE', payload: e.target.value });
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

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  
  const sendMessage = async () => {
    if (!inputValue.trim()) return;
    
    dispatch({ type: 'ADD_USER_MESSAGE', payload: inputValue });
    dispatch({ type: 'SET_INPUT_VALUE', payload: '' });
    dispatch({ type: 'SET_TYPING', payload: true });
    
    try {
      const botResponse = await processUserQuery(inputValue, state.context);
      dispatch({ type: 'ADD_BOT_MESSAGE', payload: botResponse });
      
      // Si la requête concerne un sujet spécifique, ajoutons-le au contexte
      if (inputValue.toLowerCase().includes('erp') || inputValue.toLowerCase().includes('établissement')) {
        dispatch({ type: 'ADD_CONTEXT', payload: 'ERP' });
      } else if (inputValue.toLowerCase().includes('événement') || inputValue.toLowerCase().includes('manifestation')) {
        dispatch({ type: 'ADD_CONTEXT', payload: 'SECURITE_EVENEMENTIELLE' });
      } else if (inputValue.toLowerCase().includes('incendie') || inputValue.toLowerCase().includes('feu')) {
        dispatch({ type: 'ADD_CONTEXT', payload: 'INCENDIE' });
      } else if (inputValue.toLowerCase().includes('évacuation')) {
        dispatch({ type: 'ADD_CONTEXT', payload: 'EVACUATION' });
      }
    } catch (err) {
      console.error('Erreur lors du traitement du message:', err);
      toast.error("Désolé, une erreur s'est produite lors du traitement de votre demande.");
    } finally {
      dispatch({ type: 'SET_TYPING', payload: false });
    }
  };
  
  const handleQuickReply = async (reply: any) => {
    dispatch({ type: 'SET_INPUT_VALUE', payload: reply.text });
    sendMessage();
  };
  
  const redirectToContact = () => {
    toggleChat(); // Close chat before redirect
    toast.info("Vous allez être redirigé vers la page de contact");
  };

  const redirectToFaq = () => {
    toggleChat(); // Close chat before redirect
    toast.info("Vous allez être redirigé vers la FAQ");
  };

  const clearChat = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
    toast.info("Conversation réinitialisée");
    
    // Réafficher le message d'accueil
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: `bot-welcome-${Date.now()}`,
        sender: 'bot',
        text: 'Bonjour, je suis votre assistant spécialisé en réglementation de sécurité. Comment puis-je vous aider aujourd\'hui?',
        timestamp: new Date()
      };
      
      dispatch({ type: 'ADD_BOT_MESSAGE', payload: welcomeMessage });
    }, 300);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-accent hover:bg-accent-hover text-white rounded-full p-3 shadow-lg transition-colors z-50"
        aria-label="Ouvrir le chat"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
      
      <div
        className={`fixed bottom-20 right-6 w-80 md:w-96 bg-dark-light rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ maxHeight: '70vh' }}
      >
        <ChatHeader 
          toggleChat={toggleChat}
          clearChat={clearChat}
        />
        
        <ChatMessages 
          messages={messages} 
          isTyping={isTyping} 
          messagesEndRef={messagesEndRef} 
        />
        
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
          isTyping={isTyping}
        />

        <ChatFooter />
      </div>
    </>
  );
};

export default Chatbot;
