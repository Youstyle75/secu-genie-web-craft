import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface NoticeERPImplantationProps {
  register: any;
}

const NoticeERPImplantation: React.FC<NoticeERPImplantationProps> = ({ register }) => {
  return (
    <Card className="p-6 mb-6 bg-formBackground border-formBorder">
      <h2 className="text-2xl font-bold text-textPrincipal mb-6">Implantation et Construction</h2>

      <div className="space-y-6">
        {/* Hauteur du bâtiment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="form-label">Hauteur du plancher bas (m)</Label>
            <Input
              type="number"
              step="0.01"
              {...register('content.implantation.hauteurPlancherBas')}
              className="form-input"
              placeholder="0.00"
            />
          </div>

          <div>
            <Label className="form-label">Hauteur du plancher haut (m)</Label>
            <Input
              type="number"
              step="0.01"
              {...register('content.implantation.hauteurPlancherHaut')}
              className="form-input"
              placeholder="0.00"
            />
          </div>

          <div>
            <Label className="form-label">Nombre de niveaux</Label>
            <Input
              type="number"
              {...register('content.implantation.nombreNiveaux')}
              className="form-input"
              min="0"
              placeholder="0"
            />
          </div>
        </div>

        {/* Desserte */}
        <div>
          <Label className="form-label">Desserte du bâtiment</Label>
          <Textarea
            {...register('content.implantation.desserte')}
            className="form-input min-h-[80px]"
            placeholder="Décrivez les voies d'accès, voiries, cheminements pompiers..."
          />
        </div>

        {/* Isolement */}
        <div>
          <Label className="form-label">Isolement par rapport aux tiers</Label>
          <Textarea
            {...register('content.implantation.isolement')}
            className="form-input min-h-[80px]"
            placeholder="Distance par rapport aux limites de propriété, bâtiments tiers..."
          />
        </div>

        {/* Résistance au feu */}
        <div className="bg-white border border-formBorder rounded-relume-md p-4">
          <h3 className="text-lg font-semibold text-accentBleu mb-4">Résistance au feu des éléments de construction</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="form-label">Structure</Label>
              <select {...register('content.implantation.resistanceFeu.structure')} className="form-input">
                <option value="">Sélectionner</option>
                <option value="SF">Stable au feu (SF)</option>
                <option value="CF">Coupe-feu (CF)</option>
                <option value="PF">Pare-flammes (PF)</option>
              </select>
            </div>

            <div>
              <Label className="form-label">Durée (minutes)</Label>
              <select {...register('content.implantation.resistanceFeu.dureeStructure')} className="form-input">
                <option value="">Sélectionner</option>
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
                <option value="120">120 minutes</option>
              </select>
            </div>

            <div>
              <Label className="form-label">Planchers</Label>
              <select {...register('content.implantation.resistanceFeu.planchers')} className="form-input">
                <option value="">Sélectionner</option>
                <option value="SF">Stable au feu (SF)</option>
                <option value="CF">Coupe-feu (CF)</option>
                <option value="PF">Pare-flammes (PF)</option>
              </select>
            </div>

            <div>
              <Label className="form-label">Durée (minutes)</Label>
              <select {...register('content.implantation.resistanceFeu.dureePlanchers')} className="form-input">
                <option value="">Sélectionner</option>
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
                <option value="120">120 minutes</option>
              </select>
            </div>

            <div>
              <Label className="form-label">Murs extérieurs</Label>
              <select {...register('content.implantation.resistanceFeu.mursExterieurs')} className="form-input">
                <option value="">Sélectionner</option>
                <option value="SF">Stable au feu (SF)</option>
                <option value="CF">Coupe-feu (CF)</option>
                <option value="PF">Pare-flammes (PF)</option>
              </select>
            </div>

            <div>
              <Label className="form-label">Durée (minutes)</Label>
              <select {...register('content.implantation.resistanceFeu.dureeMursExterieurs')} className="form-input">
                <option value="">Sélectionner</option>
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
                <option value="120">120 minutes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Matériaux */}
        <div>
          <Label className="form-label">Matériaux utilisés</Label>
          <Textarea
            {...register('content.implantation.materiaux')}
            className="form-input min-h-[100px]"
            placeholder="Décrivez les matériaux de construction, revêtements, isolants..."
          />
        </div>

        {/* Réaction au feu des matériaux */}
        <div>
          <Label className="form-label">Classement de réaction au feu des matériaux</Label>
          <Textarea
            {...register('content.implantation.reactionFeuMateriaux')}
            className="form-input min-h-[80px]"
            placeholder="Ex: M0, M1, M2... ou A1, A2, B, C, D, E, F (Euroclasses)"
          />
        </div>
      </div>
    </Card>
  );
};

export default NoticeERPImplantation;
