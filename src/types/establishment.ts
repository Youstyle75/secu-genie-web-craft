
export interface EstablishmentEvent {
  id: string;
  nom: string;
  type: string;
  adresse: {
    rue: string;
    codePostal: string;
    ville: string;
    pays: string;
  };
  jauge: number;
  specificDetails: {
    typeERP?: string;
    categorieERP?: string;
    dateDebut?: Date;
    dateFin?: Date;
    horaireOuverture?: string;
    horaireFermeture?: string;
    description?: string;
    surface?: number;
    niveaux?: number;
    activitePrincipale?: string;
  };
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
