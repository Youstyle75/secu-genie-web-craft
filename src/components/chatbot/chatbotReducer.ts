import { ChatbotState, ChatAction, Message } from './types'; 
// Correction: utilisation de ChatAction au lieu de ChatbotAction

const initialMessage: Message = {
  id: 'welcome',
  sender: 'bot',
  text: 'Bonjour ! Je suis SecuBot, l\'assistant virtuel de SecuGenie. Comment puis-je vous aider aujourd\'hui concernant la réglementation des ERP ou la sécurité événementielle ?',
  timestamp: new Date()
};

export const initialState: ChatbotState = {
  isOpen: false,
  messages: [],
  inputValue: '',
  isTyping: false,
  context: []
};

export function chatbotReducer(state: ChatbotState, action: ChatAction): ChatbotState {
  switch (action.type) {
    case 'TOGGLE_CHAT':
      const newIsOpen = !state.isOpen;
      // Add initial message when opening an empty chat
      if (newIsOpen && state.messages.length === 0) {
        return {
          ...state,
          isOpen: newIsOpen,
          messages: [initialMessage]
        };
      }
      return {
        ...state,
        isOpen: newIsOpen
      };
      
    case 'SET_INPUT_VALUE':
      return {
        ...state,
        inputValue: action.payload
      };
      
    case 'ADD_USER_MESSAGE':
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: action.payload,
        timestamp: new Date()
      };
      return {
        ...state,
        messages: [...state.messages, userMessage],
        inputValue: ''
      };
      
    case 'ADD_BOT_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
      
    case 'SET_TYPING':
      return {
        ...state,
        isTyping: action.payload
      };
      
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: []
      };
      
    case 'ADD_CONTEXT':
      return {
        ...state,
        context: [...state.context, action.payload]
      };
      
    default:
      return state;
  }
}
