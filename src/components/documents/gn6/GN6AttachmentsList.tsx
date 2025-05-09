
import React from 'react';

const GN6AttachmentsList: React.FC = () => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h3 className="font-bold mb-4">Pièces à joindre en deux exemplaires à la demande d'autorisation</h3>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>Formulaire de demande d'autorisation cosigné par l'exploitant et l'organisateur</li>
        <li>Note détaillant le mode de calcul de l'effectif théorique du public</li>
        <li>Descriptif des activités et aménagements prévus</li>
        <li>Plan de situation</li>
        <li>Plan de masse et plan côté des locaux avec aménagements</li>
        <li>Notice descriptive de sécurité</li>
        <li>Attestation d'assurance</li>
        <li>Composition du service de sécurité incendie</li>
        <li>Autres documents spécifiques selon le type d'événement</li>
      </ul>
    </div>
  );
};

export default GN6AttachmentsList;
