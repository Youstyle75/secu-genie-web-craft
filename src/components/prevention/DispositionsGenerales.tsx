import React from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface DispositionsGeneralesProps {
  register: any;
}

const DispositionsGenerales: React.FC<DispositionsGeneralesProps> = ({ register }) => {
  const dispositions = [
    {
      id: 'accueil',
      label: 'Accueil et information du personnel',
      placeholder: 'Précisez les modalités d\'accueil et d\'information...'
    },
    {
      id: 'coordination',
      label: 'Coordination des travaux',
      placeholder: 'Décrivez les modalités de coordination...'
    },
    {
      id: 'urgence',
      label: 'Mesures d\'urgence',
      placeholder: 'Définissez les procédures d\'urgence...'
    },
    {
      id: 'communication',
      label: 'Communication et signalisation',
      placeholder: 'Précisez les moyens de communication...'
    },
    {
      id: 'inspection',
      label: 'Inspection commune',
      placeholder: 'Modalités d\'inspection commune des lieux...'
    },
  ];

  return (
    <Card className="p-6 mb-6 bg-formBackground border-formBorder">
      <h2 className="text-2xl font-bold text-textPrincipal mb-6">Dispositions Générales</h2>
      
      <div className="space-y-6">
        {dispositions.map((disposition) => (
          <div key={disposition.id}>
            <Label className="form-label text-base font-semibold">
              {disposition.label}
            </Label>
            <Textarea
              {...register(`content.dispositions.${disposition.id}`)}
              placeholder={disposition.placeholder}
              className="form-input min-h-[100px]"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DispositionsGenerales;
