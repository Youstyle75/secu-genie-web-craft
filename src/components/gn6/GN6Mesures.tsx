import React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Shield, AlertTriangle, Users as UsersIcon } from 'lucide-react';

interface GN6MesuresProps {
  register: any;
  watch: any;
}

const GN6Mesures: React.FC<GN6MesuresProps> = ({ register, watch }) => {
  const mesuresComplementaires = [
    { id: 'barrieresSecurite', label: 'Barrières de sécurité et mise en place de cheminements' },
    { id: 'eclairageSecurite', label: 'Éclairage de sécurité et d\'évacuation' },
    { id: 'extincteurs', label: 'Extincteurs et moyens de première intervention' },
    { id: 'alarmeIncendie', label: 'Système d\'alarme incendie' },
    { id: 'issuesSecours', label: 'Balisage des issues de secours' },
    { id: 'planEvacuation', label: 'Plan d\'évacuation affiché' },
    { id: 'pointRassemblement', label: 'Points de rassemblement définis' },
    { id: 'secouristes', label: 'Équipe de secouristes / poste de secours' },
    { id: 'sanitaires', label: 'Sanitaires et points d\'eau' },
    { id: 'stockageDechets', label: 'Zone de stockage des déchets' },
  ];

  return (
    <Card className="p-6 mb-6 bg-formBackground border-formBorder">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-accentBleu" size={28} />
        <h2 className="text-2xl font-bold text-textPrincipal">Mesures de Sécurité</h2>
      </div>

      {/* Mesures complémentaires */}
      <div className="mb-8 bg-white border border-formBorder rounded-relume-md p-6">
        <h3 className="text-lg font-semibold text-textPrincipal mb-4">Mesures complémentaires mises en place</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mesuresComplementaires.map((mesure) => (
            <div key={mesure.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-formBackground transition-colors">
              <Checkbox
                id={`mesure-${mesure.id}`}
                {...register(`content.mesures.${mesure.id}`)}
              />
              <Label
                htmlFor={`mesure-${mesure.id}`}
                className="text-sm font-normal cursor-pointer leading-relaxed"
              >
                {mesure.label}
              </Label>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Label className="form-label">Précisions complémentaires sur les mesures</Label>
          <Textarea
            {...register('content.mesures.precisions')}
            className="form-input min-h-[100px]"
            placeholder="Décrivez toute mesure complémentaire spécifique à votre manifestation..."
          />
        </div>
      </div>

      {/* Service de sécurité */}
      <div className="mb-8 bg-white border border-formBorder rounded-relume-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <UsersIcon className="text-accentBleu" size={24} />
          <h3 className="text-lg font-semibold text-textPrincipal">Service de sécurité et d'ordre</h3>
        </div>

        <div className="space-y-6">
          {/* Sécurité privée */}
          <div className="border-l-4 border-accentBleu pl-4">
            <div className="flex items-center space-x-3 mb-3">
              <Checkbox
                id="securite-privee"
                {...register('content.securite.securitePrivee.present')}
              />
              <Label htmlFor="securite-privee" className="text-base font-semibold cursor-pointer">
                Service de sécurité privée
              </Label>
            </div>

            {watch('content.securite.securitePrivee.present') && (
              <div className="ml-7 space-y-3 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="form-label">Nombre d'agents</Label>
                    <Input
                      type="number"
                      {...register('content.securite.securitePrivee.nombre')}
                      className="form-input"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label className="form-label">Société de sécurité</Label>
                    <Input
                      {...register('content.securite.securitePrivee.societe')}
                      className="form-input"
                      placeholder="Nom de la société"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sécurité publique */}
          <div className="border-l-4 border-accentBleu pl-4">
            <div className="flex items-center space-x-3 mb-3">
              <Checkbox
                id="securite-publique"
                {...register('content.securite.securitePublique.present')}
              />
              <Label htmlFor="securite-publique" className="text-base font-semibold cursor-pointer">
                Service d'ordre public (police, gendarmerie)
              </Label>
            </div>

            {watch('content.securite.securitePublique.present') && (
              <div className="ml-7 space-y-3 mt-4">
                <Textarea
                  {...register('content.securite.securitePublique.details')}
                  className="form-input min-h-[80px]"
                  placeholder="Précisez les modalités de coordination avec les forces de l'ordre..."
                />
              </div>
            )}
          </div>

          {/* Pompiers */}
          <div className="border-l-4 border-accentRouge pl-4">
            <div className="flex items-center space-x-3 mb-3">
              <Checkbox
                id="pompiers"
                {...register('content.securite.pompiers.present')}
              />
              <Label htmlFor="pompiers" className="text-base font-semibold cursor-pointer">
                Présence de pompiers / SSIAP
              </Label>
            </div>

            {watch('content.securite.pompiers.present') && (
              <div className="ml-7 space-y-3 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="form-label">Nombre de pompiers / SSIAP</Label>
                    <Input
                      type="number"
                      {...register('content.securite.pompiers.nombre')}
                      className="form-input"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label className="form-label">Type d'intervention</Label>
                    <select {...register('content.securite.pompiers.type')} className="form-input">
                      <option value="">Sélectionner</option>
                      <option value="prevention">Prévention</option>
                      <option value="surveillance">Surveillance continue</option>
                      <option value="intervention">Moyens d'intervention</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Assurances */}
      <div className="bg-white border border-formBorder rounded-relume-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-orange-600" size={24} />
          <h3 className="text-lg font-semibold text-textPrincipal">Assurances</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="assurance-rc"
              {...register('content.assurances.responsabiliteCivile')}
            />
            <Label htmlFor="assurance-rc" className="cursor-pointer">
              Assurance responsabilité civile souscrite
            </Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="form-label">Compagnie d'assurance</Label>
              <Input
                {...register('content.assurances.compagnie')}
                className="form-input"
                placeholder="Nom de la compagnie"
              />
            </div>
            <div>
              <Label className="form-label">Numéro de contrat</Label>
              <Input
                {...register('content.assurances.numeroContrat')}
                className="form-input"
                placeholder="N° de contrat"
              />
            </div>
          </div>

          <div>
            <Label className="form-label">Montant de garantie</Label>
            <Input
              {...register('content.assurances.montantGarantie')}
              className="form-input"
              placeholder="Ex: 2 000 000 €"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GN6Mesures;
