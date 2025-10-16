import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PlanPreventionHeaderProps {
  register: any;
  errors: any;
}

const PlanPreventionHeader: React.FC<PlanPreventionHeaderProps> = ({ register, errors }) => {
  return (
    <Card className="p-6 mb-6 bg-formBackground border-formBorder">
      <h2 className="text-2xl font-bold text-textPrincipal mb-6">Informations générales</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Entreprise Utilisatrice */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-accentBleu mb-3">Entreprise Utilisatrice</h3>
          
          <div>
            <Label className="form-label">Raison sociale</Label>
            <Input {...register('content.entrepriseUtilisatrice.raisonSociale')} className="form-input" />
            {errors?.content?.entrepriseUtilisatrice?.raisonSociale && (
              <p className="form-error">{errors.content.entrepriseUtilisatrice.raisonSociale.message}</p>
            )}
          </div>
          
          <div>
            <Label className="form-label">Adresse</Label>
            <Input {...register('content.entrepriseUtilisatrice.adresse')} className="form-input" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="form-label">Nom du correspondant</Label>
              <Input {...register('content.entrepriseUtilisatrice.correspondantNom')} className="form-input" />
            </div>
            <div>
              <Label className="form-label">Fonction</Label>
              <Input {...register('content.entrepriseUtilisatrice.correspondantFonction')} className="form-input" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="form-label">Téléphone</Label>
              <Input type="tel" {...register('content.entrepriseUtilisatrice.correspondantTel')} className="form-input" />
            </div>
            <div>
              <Label className="form-label">Email</Label>
              <Input type="email" {...register('content.entrepriseUtilisatrice.correspondantEmail')} className="form-input" />
            </div>
          </div>
        </div>

        {/* Entreprise Extérieure */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-accentBleu mb-3">Entreprise Extérieure</h3>
          
          <div>
            <Label className="form-label">Raison sociale</Label>
            <Input {...register('content.entrepriseExterieure.raisonSociale')} className="form-input" />
            {errors?.content?.entrepriseExterieure?.raisonSociale && (
              <p className="form-error">{errors.content.entrepriseExterieure.raisonSociale.message}</p>
            )}
          </div>
          
          <div>
            <Label className="form-label">Adresse</Label>
            <Input {...register('content.entrepriseExterieure.adresse')} className="form-input" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="form-label">Nom du correspondant</Label>
              <Input {...register('content.entrepriseExterieure.correspondantNom')} className="form-input" />
            </div>
            <div>
              <Label className="form-label">Fonction</Label>
              <Input {...register('content.entrepriseExterieure.correspondantFonction')} className="form-input" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="form-label">Téléphone</Label>
              <Input type="tel" {...register('content.entrepriseExterieure.correspondantTel')} className="form-input" />
            </div>
            <div>
              <Label className="form-label">Email</Label>
              <Input type="email" {...register('content.entrepriseExterieure.correspondantEmail')} className="form-input" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PlanPreventionHeader;
