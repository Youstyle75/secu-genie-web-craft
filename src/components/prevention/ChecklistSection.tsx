import React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ChecklistSectionProps {
  register: any;
  watch: any;
  setValue: any;
}

const ChecklistSection: React.FC<ChecklistSectionProps> = ({ register, watch, setValue }) => {
  const moyensList = [
    { id: 'electricite', label: 'Alimentation électrique' },
    { id: 'eau', label: 'Point d\'eau' },
    { id: 'vestiaires', label: 'Vestiaires' },
    { id: 'sanitaires', label: 'Sanitaires' },
    { id: 'local-repos', label: 'Local de repos' },
    { id: 'parkings', label: 'Parking' },
    { id: 'acces', label: 'Voies d\'accès' },
  ];

  const documentsList = [
    { id: 'kbis', label: 'Extrait KBIS' },
    { id: 'rc-pro', label: 'Attestation RC Pro' },
    { id: 'permis-feu', label: 'Permis de feu' },
    { id: 'habilitations', label: 'Habilitations électriques' },
    { id: 'caces', label: 'CACES' },
    { id: 'protocole', label: 'Protocole de sécurité' },
  ];

  return (
    <Card className="p-6 mb-6 bg-formBackground border-formBorder">
      <h2 className="text-2xl font-bold text-textPrincipal mb-6">Checklists</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Moyens mis à disposition */}
        <div>
          <h3 className="text-lg font-semibold text-accentBleu mb-4">Moyens mis à disposition</h3>
          <div className="space-y-3">
            {moyensList.map((moyen) => (
              <div key={moyen.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`moyen-${moyen.id}`}
                  {...register(`content.moyens.${moyen.id}`)}
                />
                <Label 
                  htmlFor={`moyen-${moyen.id}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {moyen.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Documents joints */}
        <div>
          <h3 className="text-lg font-semibold text-accentBleu mb-4">Documents joints</h3>
          <div className="space-y-3">
            {documentsList.map((doc) => (
              <div key={doc.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`doc-${doc.id}`}
                  {...register(`content.documents.${doc.id}`)}
                />
                <Label 
                  htmlFor={`doc-${doc.id}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {doc.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChecklistSection;
