
import React, { useState } from 'react';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold">Demande d'autorisation GN6</h2>
        <p className="text-gray-600">Article GN6 - Utilisation exceptionnelle ou occasionnelle de locaux</p>
      </div>

      <div className="text-sm text-gray-600 italic mb-6">
        Imprimé à remplir et à retourner à la mairie 1 mois minimum avant la date de la manifestation par l'exploitant ou par l'organisateur, accompagné des pièces à joindre, le tout en 2 exemplaires.
      </div>

      <form className="space-y-6">
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
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mesures complémentaires envisagées pour assurer la sécurité</label>
          <textarea 
            name="mesuresComplementaires" 
            value={formData.mesuresComplementaires} 
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
          ></textarea>
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Date et signature de l'organisateur</p>
            <div className="h-24 border border-gray-300 rounded-md"></div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Date et signature de l'exploitant</p>
            <div className="h-24 border border-gray-300 rounded-md"></div>
          </div>
        </div>
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
    </div>
  );
};

export default GN6Document;
