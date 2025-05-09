
import React from 'react';

interface GN6FormControlsProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const GN6FormControls: React.FC<GN6FormControlsProps> = ({ 
  currentSection, 
  onSectionChange 
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap mb-4 gap-2">
        <button 
          onClick={() => onSectionChange('informations')} 
          className={`px-3 py-1 text-sm rounded-md ${currentSection === 'informations' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Informations générales
        </button>
        <button 
          onClick={() => onSectionChange('effectif')} 
          className={`px-3 py-1 text-sm rounded-md ${currentSection === 'effectif' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Effectif
        </button>
        <button 
          onClick={() => onSectionChange('mesures')} 
          className={`px-3 py-1 text-sm rounded-md ${currentSection === 'mesures' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Mesures de sécurité
        </button>
        <button 
          onClick={() => onSectionChange('signatures')} 
          className={`px-3 py-1 text-sm rounded-md ${currentSection === 'signatures' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Signatures
        </button>
      </div>
    </div>
  );
};

export default GN6FormControls;
