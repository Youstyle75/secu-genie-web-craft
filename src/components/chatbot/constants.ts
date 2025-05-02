
export const quickReplies = [
  {
    id: 'services',
    text: 'Services SecuGenie',
    answer: 'SecuGenie propose des solutions de création et de gestion de documents de sécurité pour les événements et ERP : plans d\'évacuation, registres de sécurité, analyses de risque, consignes personnalisées et plans de prévention. Tous nos documents sont conformes à la réglementation en vigueur et générés par notre IA spécialisée.'
  },
  {
    id: 'regulation',
    text: 'Réglementation ERP',
    answer: 'Les ERP sont soumis au Code de la Construction et de l\'Habitation et au règlement de sécurité du 25 juin 1980 modifié. La réglementation varie selon le type (J, L, M, N, O, P...) et la catégorie d\'ERP (1 à 5). Nos solutions vous aident à rester conforme à ces exigences légales et à générer les documents nécessaires.'
  },
  {
    id: 'pricing',
    text: 'Tarifs SecuGenie',
    answer: 'Nous proposons plusieurs formules adaptées à vos besoins : Starter (à partir de 19€/mois), Pro (à partir de 49€/mois) et Enterprise (solution personnalisée). Chaque formule inclut un nombre différent de documents générables mensuellement et des fonctionnalités spécifiques.'
  },
  {
    id: 'evacuation',
    text: 'Plans d\'évacuation',
    answer: 'Nos plans d\'évacuation sont conformes à la norme NF ISO 23601. Ils sont générés automatiquement à partir de votre plan et incluent tous les éléments obligatoires : issues de secours, équipements de sécurité incendie, point de rassemblement, et consignes de sécurité personnalisées.'
  },
  {
    id: 'document-security',
    text: 'Documents obligatoires',
    answer: 'Les documents de sécurité obligatoires varient selon votre structure. Pour un ERP, vous devez disposer d\'un registre de sécurité, de plans d\'évacuation, et des consignes de sécurité. Pour un événement, un dossier de sécurité incluant DPS et analyse des risques est généralement requis. SecuGenie vous aide à générer tous ces documents.'
  },
  {
    id: 'legal-updates',
    text: 'Mises à jour réglementaires',
    answer: 'Notre équipe juridique et notre IA surveillent constamment les évolutions réglementaires via l\'API Légifrance. Tous nos abonnés sont automatiquement informés des changements qui les concernent, et leurs documents sont mis à jour pour rester conformes à la législation en vigueur.'
  },
  {
    id: 'gn6',
    text: 'Dossier GN6',
    answer: 'Le dossier GN6 est un document obligatoire pour les manifestations exceptionnelles dans les ERP. Il doit contenir une notice technique de sécurité détaillée, des plans de sécurité, la configuration des espaces, l\'analyse des risques spécifiques et les mesures compensatoires prévues. Notre outil vous guide pas à pas dans sa création.'
  },
  {
    id: 'dps',
    text: 'Dispositif Prévisionnel de Secours',
    answer: 'Le DPS est dimensionné selon la grille d\'évaluation des risques (RIS) qui prend en compte le nombre de participants, le comportement prévisible, l\'environnement et l\'accessibilité. Notre outil calcule automatiquement le RIS et vous propose un dimensionnement adapté selon le Référentiel National des Missions de Sécurité Civile.'
  }
];

export const reglementaryCategories = {
  ERP: [
    'Code de la Construction et de l\'Habitation (CCH)',
    'Règlement de sécurité du 25 juin 1980',
    'Dispositions particulières selon type d\'ERP',
    'Commissions de sécurité'
  ],
  SECURITE_EVENEMENTIELLE: [
    'Dispositifs Prévisionnels de Secours',
    'GN6 - Manifestations exceptionnelles',
    'Protection contre les risques d\'incendie et de panique',
    'Réglementation des Grands Rassemblements'
  ],
  INCENDIE: [
    'Moyens de secours',
    'Système de Sécurité Incendie (SSI)',
    'Désenfumage',
    'Formation du personnel'
  ],
  EVACUATION: [
    'Plans d\'évacuation NF ISO 23601',
    'Cheminements et issues de secours',
    'Consignes de sécurité',
    'Points de rassemblement'
  ],
  SANITAIRE: [
    'Réglementations Covid-19',
    'Gestion des risques sanitaires',
    'Accessibilité PMR',
    'Dispositions sanitaires événementielles'
  ]
};
