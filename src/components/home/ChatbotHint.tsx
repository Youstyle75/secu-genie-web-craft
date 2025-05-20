
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
    <div className="fixed bottom-24 right-8 bg-white p-4 rounded-xl shadow-md z-40 max-w-xs animate-bounce-once reveal active border border-gray-200">
      <div className="flex items-start gap-3">
        <MessageSquare className="h-6 w-6 text-blue-500 shrink-0" />
        <div>
          <p className="font-medium text-gray-900 mb-2">Une question sur la réglementation?</p>
          <p className="text-sm text-gray-600 mb-3">Essayez notre assistant IA spécialisé en réglementation de sécurité!</p>
          <Button 
            onClick={() => {
              setShowChatbotHint(false);
              document.querySelector('button[aria-label="Ouvrir le chat"]')?.dispatchEvent(
                new MouseEvent('click', { bubbles: true })
              );
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
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
