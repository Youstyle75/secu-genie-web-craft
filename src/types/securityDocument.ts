
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
  version: number;
  comments?: Comment[];
  signatures?: SignatureData[];
}

export interface NoticeSecuriteContent {
  descriptionEtablissement: string;
  moyensSecours: string;
  consignesEvacuation: string;
  preventionIncendie: string;
  accessibiliteSecours: string;
  classementType: string;
  effectifMaximum: number;
  dispositionsParticulieres: string;
  amenagements: string;
  installationsTechniques: string;
}

export interface PlanPreventionContent {
  entrepriseUtilisatrice: string;
  entrepriseExterieure: string;
  natureTravaux: string;
  dateDebutTravaux: Date;
  dateFinTravaux: Date;
  lieuIntervention: string;
  risquesIdentifies: RisqueIdentifie[];
  mesuresPrevention: MesurePrevention[];
  personnelAutorise: Personnel[];
  materielsUtilises: string;
  consignesParticulieres: string;
}

export interface GN6Content {
  nomOrganisateur: string;
  adresseOrganisateur: string;
  telOrganisateur: string;
  qualiteOrganisateur: string;
  accordExploitant: string;
  natureManif: string;
  dateManif: Date;
  lieuManif: string;
  configurationSalle: string;
  installationsParticuli: string;
  nombreOrganisateurs: number;
  effectifMaximum: number;
  mesuresComplementaires: string;
  serviceOrdre: string;
  serviceSecurite: string;
}

export interface RisqueIdentifie {
  id: string;
  description: string;
  niveau: 'faible' | 'moyen' | 'eleve' | 'critique';
  zone: string;
}

export interface MesurePrevention {
  id: string;
  risqueId: string;
  description: string;
  responsable: 'entrepriseUtilisatrice' | 'entrepriseExterieure' | 'les deux';
  dateRealisation?: Date;
  statut: 'planifiee' | 'en cours' | 'realisee';
}

export interface Personnel {
  id: string;
  nom: string;
  prenom: string;
  fonction: string;
  entreprise: 'utilisatrice' | 'exterieure';
  autorisation: string[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  sectionId?: string;
}
