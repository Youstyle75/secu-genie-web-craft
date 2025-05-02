
import { MessageSquare, X, HelpCircle } from 'lucide-react';

interface ChatHeaderProps {
  toggleChat: () => void;
  clearChat: () => void;
}

const ChatHeader = ({ toggleChat, clearChat }: ChatHeaderProps) => {
  return (
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
  );
};

export default ChatHeader;
