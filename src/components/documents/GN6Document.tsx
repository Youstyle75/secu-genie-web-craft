
import React, { useState } from 'react';
import AIAssistantWidget from '../ai/AIAssistantWidget';
import GN6FormControls from './gn6/GN6FormControls';
import GN6FormSection from './gn6/GN6FormSection';
import GN6InformationSection from './gn6/GN6InformationSection';
import GN6EffectifSection from './gn6/GN6EffectifSection';
import GN6MeasuresSection from './gn6/GN6MeasuresSection';
import GN6SignatureSection from './gn6/GN6SignatureSection';
import GN6AttachmentsList from './gn6/GN6AttachmentsList';
import { GN6FormData } from '../../types/documents';

const GN6Document: React.FC = () => {
  const [formData, setFormData] = useState<GN6FormData>({
    nom: '',
    adresse: '',
    tel: '',
    qualite: '',
    accordExploitant: 'oui',
    natureManif: '',
    date: '',
    lieu: '',
    configuration: '',
    installations: '',
    nombreOrganisateurs: '',
    effectifMax: '',
    mesuresComplementaires: '',
    serviceOrdre: '',
    serviceSecurite: ''
  });

  const [currentSection, setCurrentSection] = useState('informations');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSuggestionAccept = (suggestion: string) => {
    // Cette fonction sera appelée lorsque l'utilisateur acceptera une suggestion de l'IA
    if (currentSection === 'informations' && !formData.qualite) {
      setFormData(prev => ({
        ...prev,
        qualite: "Association loi 1901 organisatrice d'événements culturels"
      }));
    } else if (currentSection === 'effectif' && !formData.effectifMax) {
      setFormData(prev => ({
        ...prev,
        effectifMax: "250 personnes (200 public + 50 organisation)"
      }));
    } else if (currentSection === 'mesures' && !formData.mesuresComplementaires) {
      setFormData(prev => ({
        ...prev,
        mesuresComplementaires: suggestion
      }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 relative">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold">Demande d'autorisation GN6</h2>
        <p className="text-gray-600">Article GN6 - Utilisation exceptionnelle ou occasionnelle de locaux</p>
      </div>

      <div className="text-sm text-gray-600 italic mb-6">
        Imprimé à remplir et à retourner à la mairie 1 mois minimum avant la date de la manifestation par l'exploitant ou par l'organisateur, accompagné des pièces à joindre, le tout en 2 exemplaires.
      </div>

      <GN6FormControls 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
      />

      <form className="space-y-6">
        <GN6FormSection isActive={currentSection === 'informations'}>
          <GN6InformationSection formData={formData} onChange={handleChange} />
        </GN6FormSection>

        <GN6FormSection isActive={currentSection === 'effectif'}>
          <GN6EffectifSection formData={formData} onChange={handleChange} />
        </GN6FormSection>

        <GN6FormSection isActive={currentSection === 'mesures'}>
          <GN6MeasuresSection formData={formData} onChange={handleChange} />
        </GN6FormSection>

        <GN6FormSection isActive={currentSection === 'signatures'}>
          <GN6SignatureSection />
        </GN6FormSection>
      </form>

      <GN6AttachmentsList />

      {/* Widget Assistant IA */}
      <AIAssistantWidget 
        documentType="GN6" 
        section={currentSection}
        onSuggestionAccept={handleSuggestionAccept} 
      />
    </div>
  );
};

export default GN6Document;
