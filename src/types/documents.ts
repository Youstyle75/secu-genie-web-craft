
export interface GN6FormData {
  nom: string;
  adresse: string;
  tel: string;
  qualite: string;
  accordExploitant: string;
  natureManif: string;
  date: string;
  lieu: string;
  configuration: string;
  installations: string;
  nombreOrganisateurs: string;
  effectifMax: string;
  mesuresComplementaires: string;
  serviceOrdre: string;
  serviceSecurite: string;
  [key: string]: string;
}

export type DocumentType = 'GN6' | 'PlanPrevention' | 'NoticeSecuriteERP';

export interface DocumentTypeInfo {
  id: DocumentType;
  name: string;
  description: string;
}

export const availableDocumentTypes: DocumentTypeInfo[] = [
  {
    id: 'GN6',
    name: 'Dossier de Sécurité type GN6',
    description: 'Document obligatoire pour les événements accueillant du public, notamment les manifestations temporaires.'
  },
  {
    id: 'PlanPrevention',
    name: 'Plan de Prévention',
    description: 'Document obligatoire pour la coordination des mesures de prévention lors de l\'intervention d\'entreprises extérieures.'
  },
  {
    id: 'NoticeSecuriteERP',
    name: 'Notice de Sécurité ERP',
    description: 'Document obligatoire dans le cadre d\'un dossier de demande d\'autorisation de construire, d\'aménager ou de modifier un ERP.'
  }
];
