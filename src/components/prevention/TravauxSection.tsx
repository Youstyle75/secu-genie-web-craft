import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TravauxSectionProps {
  register: any;
  errors: any;
}

const TravauxSection: React.FC<TravauxSectionProps> = ({ register, errors }) => {
  return (
    <Card className="p-6 mb-6 bg-formBackground border-formBorder">
      <h2 className="text-2xl font-bold text-textPrincipal mb-6">Travaux à réaliser</h2>
      
      <div className="space-y-6">
        <div>
          <Label className="form-label">Nature des travaux</Label>
          <Textarea 
            {...register('content.natureTravaux')} 
            className="form-input min-h-[120px]"
            placeholder="Décrivez la nature des travaux à effectuer..."
          />
          {errors?.content?.natureTravaux && (
            <p className="form-error">{errors.content.natureTravaux.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="form-label">Date de début</Label>
            <Input type="date" {...register('content.dateDebut')} className="form-input" />
          </div>
          
          <div>
            <Label className="form-label">Date de fin</Label>
            <Input type="date" {...register('content.dateFin')} className="form-input" />
          </div>
          
          <div>
            <Label className="form-label">Horaires</Label>
            <Input 
              {...register('content.horaires')} 
              className="form-input"
              placeholder="Ex: 8h-17h"
            />
          </div>
        </div>

        <div>
          <Label className="form-label">Lieu d'intervention</Label>
          <Input 
            {...register('content.lieuIntervention')} 
            className="form-input"
            placeholder="Précisez le lieu exact de l'intervention"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="form-label">Effectif prévu</Label>
            <Input 
              type="number" 
              {...register('content.effectifPrevu')} 
              className="form-input"
              min="0"
            />
          </div>
          
          <div>
            <Label className="form-label">Sous-traitants</Label>
            <Input 
              {...register('content.sousTraitants')} 
              className="form-input"
              placeholder="Nom des sous-traitants"
            />
          </div>
          
          <div>
            <Label className="form-label">Visite préalable</Label>
            <select {...register('content.visitePrealable')} className="form-input">
              <option value="">Sélectionner</option>
              <option value="effectuee">Effectuée</option>
              <option value="programmee">Programmée</option>
              <option value="non-requise">Non requise</option>
            </select>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TravauxSection;
