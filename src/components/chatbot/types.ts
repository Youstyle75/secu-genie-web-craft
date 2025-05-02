
export type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
  references?: ReglementaryReference[];
};

export type QuickReply = {
  id: string;
  text: string;
  answer: string;
};

export type ReglementaryReference = {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'arrete' | 'decret' | 'loi' | 'code';
};

export type ChatbotState = {
  isOpen: boolean;
  messages: Message[];
  inputValue: string;
  isTyping: boolean;
  context: string[];
};

export type ChatbotAction = 
  | { type: 'TOGGLE_CHAT' }
  | { type: 'SET_INPUT_VALUE'; payload: string }
  | { type: 'ADD_USER_MESSAGE'; payload: string }
  | { type: 'ADD_BOT_MESSAGE'; payload: Message }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'ADD_CONTEXT'; payload: string };
