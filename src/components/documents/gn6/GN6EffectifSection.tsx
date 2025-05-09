
import React, { ChangeEvent } from 'react';
import { GN6FormData } from '../../../types/documents';

interface GN6EffectifSectionProps {
  formData: GN6FormData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const GN6EffectifSection: React.FC<GN6EffectifSectionProps> = ({ formData, onChange }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de personnes concourant à l'organisation</label>
          <input 
            type="text" 
            name="nombreOrganisateurs" 
            value={formData.nombreOrganisateurs} 
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Effectif maximal du public attendu</label>
          <input 
            type="text" 
            name="effectifMax" 
            value={formData.effectifMax} 
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <p className="text-xs text-gray-500 mt-1">Précisez le mode de calcul selon la configuration</p>
        </div>
      </div>
      
      <div className="bg-primary/10 p-4 rounded-md border border-primary/20">
        <p className="text-sm font-medium text-primary">
          <span className="font-bold">Conseil de l'IA:</span> Le calcul de l'effectif doit respecter les ratios réglementaires : 3 pers/m² pour les expositions, 1 pers/m² pour les salles polyvalentes, 1 pers/siège pour les configurations assises. N'oubliez pas d'inclure le personnel d'organisation dans le total.
        </p>
      </div>
    </>
  );
};

export default GN6EffectifSection;
