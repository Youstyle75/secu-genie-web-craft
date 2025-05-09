
import React, { useState } from 'react';
import AIAssistantWidget from '../ai/AIAssistantWidget';

const GN6Document = () => {
  const [formData, setFormData] = useState({
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
    // Pour l'instant, nous affichons juste une alerte
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

      <div className="mb-6">
        <div className="flex flex-wrap mb-4 gap-2">
          <button 
            onClick={() => setCurrentSection('informations')} 
            className={`px-3 py-1 text-sm rounded-md ${currentSection === 'informations' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Informations générales
          </button>
          <button 
            onClick={() => setCurrentSection('effectif')} 
            className={`px-3 py-1 text-sm rounded-md ${currentSection === 'effectif' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Effectif
          </button>
          <button 
            onClick={() => setCurrentSection('mesures')} 
            className={`px-3 py-1 text-sm rounded-md ${currentSection === 'mesures' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Mesures de sécurité
          </button>
          <button 
            onClick={() => setCurrentSection('signatures')} 
            className={`px-3 py-1 text-sm rounded-md ${currentSection === 'signatures' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Signatures
          </button>
        </div>
      </div>

      <form className="space-y-6">
        {currentSection === 'informations' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NOM</label>
                <input 
                  type="text" 
                  name="nom" 
                  value={formData.nom} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse et téléphone</label>
                <input 
                  type="text" 
                  name="adresse" 
                  value={formData.adresse} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualité des organisateurs</label>
                <input 
                  type="text" 
                  name="qualite" 
                  value={formData.qualite} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">Ex: Association loi 1901, entreprise privée, collectivité territoriale...</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Accord écrit de l'exploitant</label>
                <select 
                  name="accordExploitant" 
                  value={formData.accordExploitant} 
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Configuration du lieu</label>
                <input 
                  type="text" 
                  name="configuration" 
                  value={formData.configuration} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Installation(s) technique(s) particulière(s)</label>
              <textarea 
                name="installations" 
                value={formData.installations} 
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
              ></textarea>
            </div>
            
            <div className="bg-primary/10 p-4 rounded-md border border-primary/20">
              <p className="text-sm font-medium text-primary">
                <span className="font-bold">Conseil de l'IA:</span> La qualité des organisateurs doit préciser le statut juridique de l'entité (association, entreprise, etc.). Pour une manifestation temporaire, précisez bien la nature exacte de l'événement et sa durée complète incluant montage et démontage.
              </p>
            </div>
          </div>
        )}

        {currentSection === 'effectif' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de personnes concourant à l'organisation</label>
                <input 
                  type="text" 
                  name="nombreOrganisateurs" 
                  value={formData.nombreOrganisateurs} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Effectif maximal du public attendu</label>
                <input 
                  type="text" 
                  name="effectifMax" 
                  value={formData.effectifMax} 
                  onChange={handleChange}
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
          </div>
        )}

        {currentSection === 'mesures' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mesures complémentaires envisagées pour assurer la sécurité</label>
              <textarea 
                name="mesuresComplementaires" 
                value={formData.mesuresComplementaires} 
                onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
          </div>
        )}

        {currentSection === 'signatures' && (
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
        )}
      </form>

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
