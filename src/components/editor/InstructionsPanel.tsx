
import React from 'react';

const InstructionsPanel: React.FC = () => {
  return (
    <div className="mt-4 bg-dark-medium p-3 rounded-lg border border-dark-light">
      <h4 className="font-semibold mb-2 text-dark-foreground">Instructions</h4>
      <ul className="text-sm text-dark-secondary list-disc pl-5 space-y-1">
        <li>Glissez-déposez des éléments depuis la bibliothèque vers le plan</li>
        <li>Utilisez les outils de dessin pour créer des formes personnalisées</li>
        <li>Ajoutez du texte, des lignes, des rectangles ou des cercles</li>
        <li>Importez un plan existant (PNG, JPEG ou PDF)</li>
        <li>Cliquez sur un élément pour le sélectionner, pivoter ou supprimer</li>
        <li>Utilisez l'outil "Effacer" pour supprimer des éléments facilement</li>
        <li>Exportez votre plan une fois terminé</li>
      </ul>
      
      <div className="mt-4 p-2 bg-accent/10 rounded-md">
        <p className="text-sm text-accent font-medium">
          <span className="font-bold">Conseil de l'IA:</span> N'oubliez pas de positionner des issues de secours et des moyens d'extinction adaptés. La réglementation ERP exige généralement un extincteur tous les 200m².
        </p>
      </div>
    </div>
  );
};

export default InstructionsPanel;
