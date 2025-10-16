
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
  version?: string;
  comments?: Comment[];
  
  // DOM-like methods for document manipulation (needed for export/preview)
  createElement?: (tag: string) => HTMLElement;
  getElementById?: (id: string) => HTMLElement | null;
  body?: HTMLElement;
}

export interface NoticeSecuriteContent {
  descriptionEtablissement: string;
  moyensSecours: string;
  consignesEvacuation: string;
  preventionIncendie?: string; // Ajouté pour les erreurs de build
  // Additional fields as needed
}

export interface PlanPreventionContent {
  entrepriseUtilisatrice?: any;
  entrepriseExterieure?: any;
  natureTravaux?: string;
  dateDebut?: string;
  dateFin?: string;
  horaires?: string;
  lieuIntervention?: string;
  effectifPrevu?: number;
  sousTraitants?: string;
  visitePrealable?: string;
  moyens?: Record<string, boolean>;
  documents?: Record<string, boolean>;
  risques?: any;
  dispositions?: Record<string, string>;
  signatures?: any[];
  risquesIdentifies?: Array<string>;
  mesuresPrevention?: Array<string>;
  preventionIncendie?: string;
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
  preventionIncendie?: string; // Ajouté pour les erreurs de build
  // Additional fields as needed
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: Date;
  targetField?: string; // Champ commenté spécifiquement
  resolved?: boolean;
}

// Fonction helper pour convertir le contenu du document en HTML pour l'exportation
export const documentContentToHTML = (doc: SecurityDocument): HTMLElement => {
  const container = document.createElement('div');
  
  // En-tête du document
  const header = document.createElement('div');
  header.classList.add('document-header');
  
  const title = document.createElement('h1');
  title.textContent = doc.title;
  header.appendChild(title);
  
  const metadata = document.createElement('div');
  metadata.classList.add('document-metadata');
  metadata.innerHTML = `
    <p>Type: ${doc.documentType}</p>
    <p>Créé le: ${doc.createdAt.toLocaleDateString()}</p>
    <p>Statut: ${doc.status}</p>
  `;
  header.appendChild(metadata);
  container.appendChild(header);
  
  // Contenu spécifique selon le type de document
  const content = document.createElement('div');
  content.classList.add('document-content');
  
  if (doc.documentType === 'NoticeSecurite') {
    const noticeContent = doc.content as NoticeSecuriteContent;
    content.innerHTML = `
      <h2>Description de l'établissement</h2>
      <div>${noticeContent.descriptionEtablissement}</div>
      
      <h2>Moyens de secours</h2>
      <div>${noticeContent.moyensSecours}</div>
      
      <h2>Consignes d'évacuation</h2>
      <div>${noticeContent.consignesEvacuation}</div>
    `;
  } else if (doc.documentType === 'PlanPrevention') {
    const planContent = doc.content as PlanPreventionContent;
    content.innerHTML = `
      <h2>Entreprise utilisatrice</h2>
      <div>${planContent.entrepriseUtilisatrice}</div>
      
      <h2>Entreprise extérieure</h2>
      <div>${planContent.entrepriseExterieure}</div>
      
      <h2>Nature des travaux</h2>
      <div>${planContent.natureTravaux}</div>
      
      <h2>Risques identifiés</h2>
      <ul>
        ${planContent.risquesIdentifies.map(risque => `<li>${risque}</li>`).join('')}
      </ul>
      
      <h2>Mesures de prévention</h2>
      <ul>
        ${planContent.mesuresPrevention.map(mesure => `<li>${mesure}</li>`).join('')}
      </ul>
    `;
  }
  
  container.appendChild(content);
  
  // Pied de page
  const footer = document.createElement('div');
  footer.classList.add('document-footer');
  
  if (doc.status === 'signe') {
    const signature = document.createElement('div');
    signature.classList.add('signature-block');
    signature.innerHTML = '<p>Document signé électroniquement</p>';
    footer.appendChild(signature);
  }
  
  container.appendChild(footer);
  
  return container;
};
