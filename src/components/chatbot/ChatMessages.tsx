
import { Message } from './types';
import ChatMessage from './ChatMessage';
import { MutableRefObject } from 'react';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: MutableRefObject<HTMLDivElement | null>;
}

const ChatMessages = ({ messages, isTyping, messagesEndRef }: ChatMessagesProps) => {
  return (
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
  );
};

export default ChatMessages;
