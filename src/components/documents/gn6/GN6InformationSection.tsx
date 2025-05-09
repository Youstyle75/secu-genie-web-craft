
import React, { ChangeEvent } from 'react';
import { GN6FormData } from '../../../types/documents';

interface GN6InformationSectionProps {
  formData: GN6FormData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const GN6InformationSection: React.FC<GN6InformationSectionProps> = ({ formData, onChange }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">NOM</label>
          <input 
            type="text" 
            name="nom" 
            value={formData.nom} 
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse et téléphone</label>
          <input 
            type="text" 
            name="adresse" 
            value={formData.adresse} 
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Qualité des organisateurs</label>
          <input 
            type="text" 
            name="qualite" 
            value={formData.qualite} 
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <p className="text-xs text-gray-500 mt-1">Ex: Association loi 1901, entreprise privée, collectivité territoriale...</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Accord écrit de l'exploitant</label>
          <select 
            name="accordExploitant" 
            value={formData.accordExploitant} 
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="oui">Oui</option>
            <option value="non">Non</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nature de la manifestation</label>
          <input 
            type="text" 
            name="natureManif" 
            value={formData.natureManif} 
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <p className="text-xs text-gray-500 mt-1">Ex: Concert, exposition, conférence, spectacle...</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date(s) et heure(s) prévues</label>
          <input 
            type="text" 
            name="date" 
            value={formData.date} 
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <p className="text-xs text-gray-500 mt-1">Format: JJ/MM/AAAA de XXh à XXh</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
          <input 
            type="text" 
            name="lieu" 
            value={formData.lieu} 
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Configuration du lieu</label>
          <input 
            type="text" 
            name="configuration" 
            value={formData.configuration} 
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Installation(s) technique(s) particulière(s)</label>
        <textarea 
          name="installations" 
          value={formData.installations} 
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
        ></textarea>
      </div>
      
      <div className="bg-primary/10 p-4 rounded-md border border-primary/20">
        <p className="text-sm font-medium text-primary">
          <span className="font-bold">Conseil de l'IA:</span> La qualité des organisateurs doit préciser le statut juridique de l'entité (association, entreprise, etc.). Pour une manifestation temporaire, précisez bien la nature exacte de l'événement et sa durée complète incluant montage et démontage.
        </p>
      </div>
    </>
  );
};

export default GN6InformationSection;
