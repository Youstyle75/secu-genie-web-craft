
import { MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

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
    <div className="fixed bottom-24 right-8 bg-white p-5 rounded-lg shadow-lg z-40 max-w-xs animate-bounce-once reveal active border border-gray-200">
      <div className="flex items-start gap-4">
        <MessageSquare className="h-6 w-6 text-accent shrink-0" />
        <div>
          <p className="font-medium text-textPrincipal mb-3">Une question sur la réglementation?</p>
          <p className="text-sm text-textPrincipal/70 mb-4 leading-relaxed">Essayez notre assistant IA spécialisé en réglementation de sécurité incendie!</p>
          <Button 
            onClick={() => {
              setShowChatbotHint(false);
              document.querySelector('button[aria-label="Ouvrir le chat"]')?.dispatchEvent(
                new MouseEvent('click', { bubbles: true })
              );
            }}
            className="w-full bg-accent hover:bg-accent-hover text-white font-medium shadow-sm hover:shadow-md transition-all"
            size="sm"
          >
            Poser ma question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotHint;
