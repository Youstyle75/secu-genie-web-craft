
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSend: () => void;
}

const ChatInput = ({ value, onChange, onKeyPress, onSend }: ChatInputProps) => {
  return (
    <div className="p-2 border-t border-gray-200 flex">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Écrivez votre message ici..."
        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button 
        onClick={onSend}
        disabled={!value.trim()}
        className={`px-4 py-2 rounded-r-md ${
          value.trim()
            ? 'bg-accent hover:bg-accent-hover text-white'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        } transition-colors`}
      >
        <Send className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ChatInput;
