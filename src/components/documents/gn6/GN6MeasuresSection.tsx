
import React, { ChangeEvent } from 'react';
import { GN6FormData } from '../../../types/documents';

interface GN6MeasuresSectionProps {
  formData: GN6FormData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const GN6MeasuresSection: React.FC<GN6MeasuresSectionProps> = ({ formData, onChange }) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mesures complémentaires envisagées pour assurer la sécurité</label>
        <textarea 
          name="mesuresComplementaires" 
          value={formData.mesuresComplementaires} 
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">Détaillez toutes les mesures prévues (moyens d'alarme, issues de secours, éclairage, etc.)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service d'ordre</label>
          <input 
            type="text" 
            name="serviceOrdre" 
            value={formData.serviceOrdre} 
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <p className="text-xs text-gray-500 mt-1">Nombre d'agents et qualification (APS)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service de sécurité incendie</label>
          <input 
            type="text" 
            name="serviceSecurite" 
            value={formData.serviceSecurite} 
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <p className="text-xs text-gray-500 mt-1">Nombre d'agents et qualification (SSIAP)</p>
        </div>
      </div>
      
      <div className="bg-primary/10 p-4 rounded-md border border-primary/20">
        <p className="text-sm font-medium text-primary">
          <span className="font-bold">Conseil de l'IA:</span> Pour un ERP de type L avec un effectif entre 300 et 1500 personnes, prévoyez au minimum 1 agent SSIAP 1. Au-delà de 1500 personnes, il faut au moins 1 SSIAP 2 et 1 SSIAP 1. N'oubliez pas les moyens d'extinction adaptés aux risques spécifiques.
        </p>
      </div>
    </>
  );
};

export default GN6MeasuresSection;
