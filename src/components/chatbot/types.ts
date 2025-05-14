
export type MessageSender = 'user' | 'bot' | 'system';

export interface Message {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: Date;
  references?: {
    type: string;
    title: string;
    content: string;
  }[];
}

export interface ChatbotState {
  messages: Message[];
  isTyping: boolean;
  inputMessage: string;
  error: string | null;
}

export interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSend: () => Promise<void>;
  isTyping?: boolean;
}

export interface ChatAction {
  type: string;
  payload?: any;
}
