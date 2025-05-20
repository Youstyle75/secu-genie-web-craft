
export interface SecurityDocument {
  id: string;
  title: string;
  documentType: 'NoticeSecurite' | 'PlanPrevention' | 'GN6';
  status: 'brouillon' | 'relecture' | 'valide' | 'signe';
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  establishmentId: string;
  content: NoticeSecuriteContent | PlanPreventionContent | GN6Content;
  
  // DOM-like methods for document manipulation (needed for export/preview)
  createElement?: (tag: string) => HTMLElement;
  getElementById?: (id: string) => HTMLElement | null;
  body?: HTMLElement;
}

export interface NoticeSecuriteContent {
  descriptionEtablissement: string;
  moyensSecours: string;
  consignesEvacuation: string;
  // Additional fields as needed
}

export interface PlanPreventionContent {
  entrepriseUtilisatrice: string;
  entrepriseExterieure: string;
  natureTravaux: string;
  risquesIdentifies: Array<string>;
  mesuresPrevention: Array<string>;
  // Additional fields as needed
}

export interface GN6Content {
  typeEvenement: string;
  dateDebut: Date;
  dateFin: Date;
  implantation: string;
  effectif: {
    public: number;
    personnel: number;
    total: number;
  };
  mesuresSecurite: Array<string>;
  moyensSecours: Array<string>;
  // Additional fields as needed
}
