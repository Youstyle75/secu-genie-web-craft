
import { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
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
  );
};

export default ChatMessage;
