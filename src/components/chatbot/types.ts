
export type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
};

export type QuickReply = {
  id: string;
  text: string;
  answer: string;
};

