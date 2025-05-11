
import { Bot } from 'lucide-react';
import { useState, useEffect } from 'react';

const ChatbotHint = () => {
  const [showChatbotHint, setShowChatbotHint] = useState(false);

  useEffect(() => {
    // Show chatbot hint after a delay
    const timer = setTimeout(() => {
      setShowChatbotHint(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!showChatbotHint) return null;

  return (
    <div className="fixed bottom-24 right-8 bg-dark-medium p-4 rounded-xl shadow-lg z-40 max-w-xs animate-bounce-once reveal active border border-dark-light">
      <div className="flex items-start gap-3">
        <Bot className="h-6 w-6 text-accent shrink-0" />
        <div>
          <p className="font-medium text-dark-foreground mb-2">Une question sur la réglementation?</p>
          <p className="text-sm text-dark-secondary mb-3">Essayez notre assistant IA spécialisé en réglementation de sécurité!</p>
          <button 
            onClick={() => {
              setShowChatbotHint(false);
              document.querySelector('button[aria-label="Ouvrir le chat"]')?.dispatchEvent(
                new MouseEvent('click', { bubbles: true })
              );
            }}
            className="bg-accent hover:bg-accent-hover text-white text-sm px-4 py-2 rounded-lg font-medium transition-all w-full"
          >
            Poser ma question
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotHint;
