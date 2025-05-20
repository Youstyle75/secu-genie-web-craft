
import { SecurityDocument, NoticeSecuriteContent, PlanPreventionContent, GN6Content } from "@/types/securityDocument";

// Simuler une base de données pour le développement
let documents: SecurityDocument[] = [];
let nextId = 1;

// Créer un nouveau document
export const createSecurityDocument = (
  documentData: Partial<SecurityDocument>
): SecurityDocument => {
  // Assurer un contenu par défaut valide selon le type de document
  let defaultContent: NoticeSecuriteContent | PlanPreventionContent | GN6Content;
  
  switch(documentData.documentType) {
    case "NoticeSecurite":
      defaultContent = {
        descriptionEtablissement: "",
        moyensSecours: "",
        consignesEvacuation: ""
      };
      break;
    case "PlanPrevention":
      defaultContent = {
        entrepriseUtilisatrice: "",
        entrepriseExterieure: "",
        natureTravaux: "",
        risquesIdentifies: [],
        mesuresPrevention: []
      };
      break;
    case "GN6":
      defaultContent = {
        typeEvenement: "",
        dateDebut: new Date(),
        dateFin: new Date(),
        implantation: "",
        effectif: {
          public: 0,
          personnel: 0,
          total: 0
        },
        mesuresSecurite: [],
        moyensSecours: []
      };
      break;
    default:
      // Fallback (ne devrait jamais arriver avec les vérifications TypeScript)
      defaultContent = {
        descriptionEtablissement: "",
        moyensSecours: "",
        consignesEvacuation: ""
      };
  }

  const newDoc: SecurityDocument = {
    id: String(nextId++),
    title: documentData.title || "Document sans titre",
    documentType: documentData.documentType || "NoticeSecurite",
    status: "brouillon",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: documentData.userId || "user-1",
    establishmentId: documentData.establishmentId || "estab-1",
    content: documentData.content || defaultContent,
  };

  documents.push(newDoc);
  return newDoc;
};

// Récupérer un document par son ID
export const getDocumentById = (id: string): SecurityDocument | undefined => {
  return documents.find(doc => doc.id === id);
};

// Mettre à jour un document existant
export const updateDocument = (
  id: string,
  updates: Partial<SecurityDocument>
): SecurityDocument | undefined => {
  const docIndex = documents.findIndex(doc => doc.id === id);
  if (docIndex === -1) return undefined;

  const updatedDoc = {
    ...documents[docIndex],
    ...updates,
    updatedAt: new Date(),
  };

  documents[docIndex] = updatedDoc;
  return updatedDoc;
};

// Supprimer un document
export const deleteDocument = (id: string): boolean => {
  const initialLength = documents.length;
  documents = documents.filter(doc => doc.id !== id);
  return documents.length !== initialLength;
};

// Pour les besoins du prototype, ajoutons quelques méthodes pour utiliser l'IA
export const generateAIContent = async (
  documentType: string,
  partialData: any
): Promise<any> => {
  // Simulation d'une réponse IA
  return new Promise(resolve => {
    setTimeout(() => {
      if (documentType === "NoticeSecurite") {
        resolve({
          descriptionEtablissement: `Description générée par IA pour ${partialData.title || 'cet établissement'}: Établissement de type ERP classé catégorie 4, comportant des locaux à sommeil et accueillant jusqu'à 300 personnes simultanément.`,
          moyensSecours: "L'établissement est équipé de moyens de secours conformes incluant: système de sécurité incendie de catégorie A, extincteurs adaptés à chaque type de risque, éclairage de sécurité conforme à la réglementation ERP.",
          consignesEvacuation: "En cas d'alarme incendie, le personnel doit guider le public vers les issues de secours balisées. Point de rassemblement situé sur le parking nord de l'établissement. Une formation annuelle est dispensée à l'ensemble du personnel.",
        });
      } else if (documentType === "PlanPrevention") {
        resolve({
          entrepriseUtilisatrice: partialData.title || 'Entreprise Utilisatrice',
          entrepriseExterieure: "Société de Maintenance Technique",
          natureTravaux: "Maintenance préventive des systèmes de ventilation et climatisation",
          risquesIdentifies: [
            "Travail en hauteur",
            "Risque électrique",
            "Manipulation de charges lourdes"
          ],
          mesuresPrevention: [
            "Port des EPI obligatoire",
            "Habilitation électrique requise",
            "Utilisation de moyens de levage adaptés"
          ],
        });
      }
    }, 1500);
  });
};

// Initialiser avec quelques documents pour les tests
const initDemoDocuments = () => {
  const noticeContent: NoticeSecuriteContent = {
    descriptionEtablissement: "ERP de type M, catégorie 3, spécialisé dans la vente au détail.",
    moyensSecours: "Extincteurs CO2 et eau, système d'alarme SSI catégorie A.",
    consignesEvacuation: "Évacuation par les issues de secours signalées, point de rassemblement sur le parking."
  };

  const planContent: PlanPreventionContent = {
    entrepriseUtilisatrice: "Grand Magasin XYZ",
    entrepriseExterieure: "Maintenance Tech SA",
    natureTravaux: "Rénovation système électrique",
    risquesIdentifies: ["Électrique", "Chute de hauteur"],
    mesuresPrevention: ["Habilitation électrique", "Utilisation de harnais"]
  };

  createSecurityDocument({
    title: "Notice de sécurité - Magasin XYZ",
    documentType: "NoticeSecurite",
    content: noticeContent,
    status: "valide",
  });

  createSecurityDocument({
    title: "Plan de prévention - Travaux électriques",
    documentType: "PlanPrevention",
    content: planContent,
    status: "brouillon",
  });
};

// Appeler l'initialisation
initDemoDocuments();

export default {
  createSecurityDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
  generateAIContent
};
