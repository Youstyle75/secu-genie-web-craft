
import { useReducer, useRef, useEffect } from 'react';
import { MessageSquare, X, AlertTriangle, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { QuickReply } from './types';
import { quickReplies } from './constants';
import ChatMessage from './ChatMessage';
import QuickReplies from './QuickReplies';
import ChatInput from './ChatInput';
import { chatbotReducer, initialState } from './chatbotReducer';
import { useReglementaryBot } from '../../hooks/useReglementaryBot';

const Chatbot = () => {
  const [state, dispatch] = useReducer(chatbotReducer, initialState);
  const { isOpen, messages, inputValue, isTyping } = state;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { processUserQuery, isProcessing, error, isReady } = useReglementaryBot();
  
  const toggleChat = () => {
    dispatch({ type: 'TOGGLE_CHAT' });
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
    dispatch({ type: 'SET_TYPING', payload: true });
    
    try {
      const botResponse = await processUserQuery(inputValue, state.context);
      dispatch({ type: 'ADD_BOT_MESSAGE', payload: botResponse });
      
      // Si la requête concerne un sujet spécifique, ajoutons-le au contexte
      if (inputValue.toLowerCase().includes('erp') || inputValue.toLowerCase().includes('établissement')) {
        dispatch({ type: 'ADD_CONTEXT', payload: 'ERP' });
      } else if (inputValue.toLowerCase().includes('évènement') || inputValue.toLowerCase().includes('manifestation')) {
        dispatch({ type: 'ADD_CONTEXT', payload: 'SECURITE_EVENEMENTIELLE' });
      }
    } catch (err) {
      console.error('Erreur lors du traitement du message:', err);
      toast.error("Désolé, une erreur s'est produite lors du traitement de votre demande.");
    } finally {
      dispatch({ type: 'SET_TYPING', payload: false });
    }
  };
  
  const handleQuickReply = async (reply: QuickReply) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user' as const,
      text: reply.text,
      timestamp: new Date()
    };
    
    dispatch({ type: 'ADD_BOT_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_TYPING', payload: true });
    
    setTimeout(() => {
      const botResponse = {
        id: `bot-${Date.now()}`,
        sender: 'bot' as const,
        text: reply.answer,
        timestamp: new Date()
      };
      
      dispatch({ type: 'ADD_BOT_MESSAGE', payload: botResponse });
      dispatch({ type: 'SET_TYPING', payload: false });
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

  const clearChat = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
    toast.info("Conversation réinitialisée");
    
    // Réafficher le message d'accueil
    setTimeout(() => {
      dispatch({ type: 'TOGGLE_CHAT' });
      dispatch({ type: 'TOGGLE_CHAT' });
    }, 300);
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
            <h3 className="font-medium">SecuBot - Assistant Réglementaire</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={clearChat} 
              className="text-white hover:bg-primary-hover rounded p-1"
              title="Effacer la conversation"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            <button 
              onClick={toggleChat} 
              className="text-white hover:bg-primary-hover rounded p-1"
              title="Fermer le chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
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
          Les informations fournies sont basées sur la réglementation mais ne remplacent pas l'avis d'un expert.
        </div>
      </div>
    </>
  );
};

export default Chatbot;
