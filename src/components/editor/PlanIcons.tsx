
import {
  Tent, Table, ArrowUpSquare, Sofa, Lamp, 
  DoorClosed, Wind, ArrowUpDown, FireExtinguisher, 
  DoorOpen, Signpost, ArrowRight, Ambulance,
  Fence, CircleParking, CircleParkingOff, CircleArrowDown,
  CircleArrowUp, CircleArrowRight, CircleArrowLeft, Power
} from 'lucide-react';

export type IconCategory = 'security' | 'event' | 'furniture' | 'signs' | 'emergency';

export interface PlanIconDefinition {
  type: string;
  label: string;
  icon: React.ReactNode;
  emoji: string;
  category: IconCategory;
}

export const planIcons: PlanIconDefinition[] = [
  // Sécurité Incendie
  { 
    type: 'extinguisher', 
    label: 'Extincteur', 
    icon: <FireExtinguisher className="w-full h-full" />, 
    emoji: '🧯', 
    category: 'security' 
  },
  { 
    type: 'exit', 
    label: 'Issue de Secours', 
    icon: <DoorOpen className="w-full h-full" />, 
    emoji: '🚪', 
    category: 'security' 
  },
  { 
    type: 'assembly', 
    label: 'Point de Rassemblement', 
    icon: <Signpost className="w-full h-full" />, 
    emoji: '👥', 
    category: 'security' 
  },
  { 
    type: 'firstaid', 
    label: 'Poste de Secours', 
    icon: <Wind className="w-full h-full" />, 
    emoji: '🩹', 
    category: 'security' 
  },

  // Événementiel
  { 
    type: 'tent', 
    label: 'Tente de Réception', 
    icon: <Tent className="w-full h-full" />, 
    emoji: '⛺', 
    category: 'event' 
  },
  { 
    type: 'table', 
    label: 'Table', 
    icon: <Table className="w-full h-full" />, 
    emoji: '🪑', 
    category: 'event' 
  },
  { 
    type: 'chair', 
    label: 'Chaise', 
    icon: <ArrowUpSquare className="w-full h-full" />, 
    emoji: '🪑', 
    category: 'event' 
  },
  { 
    type: 'stage', 
    label: 'Scène', 
    icon: <Signpost className="w-full h-full" />, 
    emoji: '🎭', 
    category: 'event' 
  },
  { 
    type: 'fence', 
    label: 'Barrière', 
    icon: <Fence className="w-full h-full" />, 
    emoji: '🚧', 
    category: 'event' 
  },

  // Mobilier
  { 
    type: 'sofa', 
    label: 'Canapé', 
    icon: <Sofa className="w-full h-full" />, 
    emoji: '🛋️', 
    category: 'furniture' 
  },
  { 
    type: 'lamp', 
    label: 'Lampe', 
    icon: <Lamp className="w-full h-full" />, 
    emoji: '💡', 
    category: 'furniture' 
  },
  { 
    type: 'door', 
    label: 'Porte', 
    icon: <DoorClosed className="w-full h-full" />, 
    emoji: '🚪', 
    category: 'furniture' 
  },
  { 
    type: 'stairs', 
    label: 'Escalier', 
    icon: <ArrowUpDown className="w-full h-full" />, 
    emoji: '🪜', 
    category: 'furniture' 
  },

  // Signalétique
  { 
    type: 'arrowRight', 
    label: 'Flèche Droite', 
    icon: <ArrowRight className="w-full h-full" />, 
    emoji: '➡️', 
    category: 'signs' 
  },
  { 
    type: 'arrowUp', 
    label: 'Flèche Haut', 
    icon: <CircleArrowUp className="w-full h-full" />, 
    emoji: '⬆️', 
    category: 'signs' 
  },
  { 
    type: 'arrowDown', 
    label: 'Flèche Bas', 
    icon: <CircleArrowDown className="w-full h-full" />, 
    emoji: '⬇️', 
    category: 'signs' 
  },
  { 
    type: 'parking', 
    label: 'Parking', 
    icon: <CircleParking className="w-full h-full" />, 
    emoji: '🅿️', 
    category: 'signs' 
  },

  // Urgence et véhicules
  { 
    type: 'ambulance', 
    label: 'Ambulance/VSAV', 
    icon: <Ambulance className="w-full h-full" />, 
    emoji: '🚑', 
    category: 'emergency' 
  },
  { 
    type: 'power', 
    label: 'Groupe Électrogène', 
    icon: <Power className="w-full h-full" />, 
    emoji: '⚡', 
    category: 'emergency' 
  },
];

// Fonction utilitaire pour obtenir les icônes par catégorie
export const getIconsByCategory = (category: IconCategory): PlanIconDefinition[] => {
  return planIcons.filter(icon => icon.category === category);
};

// Fonction pour obtenir l'icône par type
export const getIconByType = (type: string): PlanIconDefinition | undefined => {
  return planIcons.find(icon => icon.type === type);
};
