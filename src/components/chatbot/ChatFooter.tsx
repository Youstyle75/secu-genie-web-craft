
import { AlertTriangle } from 'lucide-react';

const ChatFooter = () => {
  return (
    <div className="p-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex items-center">
      <AlertTriangle className="h-3 w-3 mr-1 text-gray-400" />
      Les informations fournies sont basées sur la réglementation mais ne remplacent pas l'avis d'un expert.
    </div>
  );
};

export default ChatFooter;
