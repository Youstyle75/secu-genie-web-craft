
import React from 'react';

const GN6SignatureSection: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Date et signature de l'organisateur</p>
          <div className="h-24 border border-gray-300 rounded-md"></div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Date et signature de l'exploitant</p>
          <div className="h-24 border border-gray-300 rounded-md"></div>
        </div>
        
        <div className="md:col-span-2 mt-4">
          <div className="bg-secondary/10 p-4 rounded-md border border-secondary/20">
            <p className="text-sm font-medium text-secondary">
              <span className="font-bold">Important:</span> N'oubliez pas de joindre tous les documents nécessaires en deux exemplaires (plans, notice de sécurité, attestation d'assurance, etc.)
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GN6SignatureSection;
