export type ReglementaryType = 'code' | 'article' | 'arrete' | 'decret' | 'loi' | 'norme' | 'referentiel';

export type ReglementaryText = {
  id: string;
  title: string;
  content: string;
  category: 'ERP' | 'SECURITE_EVENEMENTIELLE' | 'INCENDIE' | 'EVACUATION' | 'SANITAIRE';
  references: string[];
  datePublication: string;
  dateLastUpdate: string;
};

export type ChatMessage = {
  id: string;
  userId: string;
  message: string;
  type: 'user' | 'bot';
  context?: string;
  timestamp: string;
  references?: string[];
};

export type DocumentTemplate = {
  id: string;
  name: string;
  type: 'GN6' | 'PLAN_SECURITE' | 'DPS' | 'NOTICE_SECURITE';
  template: object;
  requirements: string[];
  category: string;
};
