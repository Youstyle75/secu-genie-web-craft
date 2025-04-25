
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
};

type QuickReply = {
  id: string;
  text: string;
  answer: string;
};

const quickReplies: QuickReply[] = [
  {
    id: 'services',
    text: 'Quels services proposez-vous ?',
    answer: 'Nous proposons des solutions de création et de gestion de documents de sécurité pour les événements et ERP : plans d\'évacuation, registres de sécurité, analyses de risque et consignes personnalisées. Tous nos documents sont conformes à la réglementation en vigueur.'
  },
  {
    id: 'regulation',
    text: 'Réglementation ERP',
    answer: 'Les ERP sont soumis au règlement de sécurité contre l\'incendie du 25 juin 1980 modifié. La réglementation varie selon le type et la catégorie d\'ERP. Nos solutions vous aident à rester conforme à ces exigences légales et à générer les documents nécessaires.'
  },
  {
    id: 'pricing',
    text: 'Tarifs',
    answer: 'Nous proposons plusieurs formules adaptées à vos besoins : Starter (à partir de 19€/mois), Pro (à partir de 49€/mois) et Enterprise (solution personnalisée). Chaque formule inclut un nombre différent de documents générables mensuellement et des fonctionnalités spécifiques.'
  }
];

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
    
    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 1000);
  };
  
  const generateBotResponse = (userInput: string): Message => {
    const lowerCaseInput = userInput.toLowerCase();
    
    // Check for keywords to determine response
    if (lowerCaseInput.includes('tarif') || lowerCaseInput.includes('prix') || lowerCaseInput.includes('coût')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: quickReplies.find(reply => reply.id === 'pricing')!.answer,
        timestamp: new Date()
      };
    } else if (lowerCaseInput.includes('règlement') || lowerCaseInput.includes('erp') || lowerCaseInput.includes('norme')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: quickReplies.find(reply => reply.id === 'regulation')!.answer,
        timestamp: new Date()
      };
    } else if (lowerCaseInput.includes('service') || lowerCaseInput.includes('offre') || lowerCaseInput.includes('propose')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: quickReplies.find(reply => reply.id === 'services')!.answer,
        timestamp: new Date()
      };
    } else if (lowerCaseInput.includes('contact') || lowerCaseInput.includes('parler') || lowerCaseInput.includes('conseiller')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: 'Si vous souhaitez parler à un conseiller, vous pouvez nous contacter par téléphone au +33 1 23 45 67 89 ou utiliser notre formulaire de contact. Souhaitez-vous être redirigé vers notre page de contact ?',
        timestamp: new Date()
      };
    } else {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: 'Je ne suis pas sûr de comprendre votre demande. Pourriez-vous la reformuler ou choisir l\'une des options ci-dessous ?\n\nVous pouvez également contacter notre équipe via le formulaire de contact.',
        timestamp: new Date()
      };
    }
  };
  
  const handleQuickReply = (reply: QuickReply) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: reply.text,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Simulate bot response delay
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
  
  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary-hover text-white rounded-full p-3 shadow-lg transition-colors z-50"
        aria-label="Ouvrir le chat"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
      
      {/* Chat Window */}
      <div
        className={`fixed bottom-20 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ maxHeight: '70vh' }}
      >
        {/* Chat Header */}
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            <h3 className="font-medium">SecuGenie Assistant</h3>
          </div>
          <button onClick={toggleChat} className="text-white" aria-label="Fermer le chat">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="p-4 h-80 overflow-y-auto bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.sender === 'user' ? 'text-right' : ''
              }`}
            >
              <div
                className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-white border border-gray-200 text-gray-700'
                }`}
              >
                <p style={{ whiteSpace: 'pre-line' }}>{message.text}</p>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
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
        
        {/* Quick Replies */}
        {messages.length > 0 && (
          <div className="p-2 border-t border-gray-200 flex flex-wrap gap-2 bg-gray-50">
            {quickReplies.map((reply) => (
              <button
                key={reply.id}
                onClick={() => handleQuickReply(reply)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 truncate transition-colors"
              >
                {reply.text}
              </button>
            ))}
            <Link
              to="/contact"
              onClick={redirectToContact}
              className="px-3 py-1 bg-accent text-white hover:bg-accent-hover rounded-full text-sm truncate transition-colors"
            >
              Contacter un conseiller
            </Link>
          </div>
        )}
        
        {/* Chat Input */}
        <div className="p-2 border-t border-gray-200 flex">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Écrivez votre message ici..."
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim()}
            className={`px-4 py-2 rounded-r-md ${
              inputValue.trim()
                ? 'bg-primary hover:bg-primary-hover text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
