
export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  references?: ReglementaryReference[];
}

export interface ChatbotState {
  isOpen: boolean;
  messages: Message[];
  inputValue: string;
  isTyping: boolean;
  context: string[];
}

export type ChatAction = 
  | { type: 'TOGGLE_CHAT' }
  | { type: 'ADD_USER_MESSAGE', payload: string }
  | { type: 'ADD_BOT_MESSAGE', payload: Message }
  | { type: 'SET_INPUT_VALUE', payload: string }
  | { type: 'SET_TYPING', payload: boolean }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'ADD_CONTEXT', payload: string };

export interface QuickReply {
  id: string;
  text: string;
  action?: string;
  answer?: string;
}

export interface ReglementaryReference {
  id: string;
  type: 'code' | 'article' | 'arrete' | 'decret' | 'norme' | 'referentiel';
  title: string;
  url?: string;
}
