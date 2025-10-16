import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Accessibility } from 'lucide-react';

interface NoticeERPAnnexeProps {
  register: any;
  watch: any;
}

const NoticeERPAnnexe: React.FC<NoticeERPAnnexeProps> = ({ register, watch }) => {
  return (
    <Card className="p-6 mb-6 bg-gradient-to-br from-purple-50 to-white border-purple-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-3 rounded-relume-lg">
          <Accessibility className="text-purple-600" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-textPrincipal">Annexe - Accessibilité et Évacuation</h2>
          <p className="text-sm text-textPrincipal/60">Dispositions pour les personnes à mobilité réduite</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Accessibilité générale */}
        <div>
          <h3 className="text-lg font-semibold text-purple-700 mb-4">Accessibilité de l'établissement</h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="acces-handicap"
                {...register('content.annexe.accessibilite.accesHandicap')}
              />
              <Label htmlFor="acces-handicap" className="cursor-pointer">
                L'établissement est accessible aux personnes handicapées
              </Label>
            </div>

            <div>
              <Label className="form-label">Cheminements extérieurs accessibles</Label>
              <Textarea
                {...register('content.annexe.accessibilite.cheminementsExterieurs')}
                className="form-input min-h-[80px]"
                placeholder="Décrivez les cheminements, rampes, absence d'obstacles..."
              />
            </div>

            <div>
              <Label className="form-label">Stationnements PMR</Label>
              <Input
                type="number"
                {...register('content.annexe.accessibilite.stationnementsPMR')}
                className="form-input"
                placeholder="Nombre de places réservées"
                min="0"
              />
            </div>

            <div>
              <Label className="form-label">Accès principal</Label>
              <Textarea
                {...register('content.annexe.accessibilite.accesPrincipal')}
                className="form-input min-h-[80px]"
                placeholder="Décrivez l'accès principal (largeur, absence de ressaut, automatisation...)"
              />
            </div>
          </div>
        </div>

        {/* Circulation intérieure */}
        <div className="bg-white border border-purple-200 rounded-relume-md p-4">
          <h3 className="text-lg font-semibold text-purple-700 mb-4">Circulation intérieure</h3>

          <div className="space-y-4">
            <div>
              <Label className="form-label">Largeur des circulations (cm)</Label>
              <Input
                type="number"
                {...register('content.annexe.circulation.largeurCirculations')}
                className="form-input"
                placeholder="Minimum 120 cm"
                min="0"
              />
            </div>

            <div>
              <Label className="form-label">Ascenseurs accessibles</Label>
              <Input
                type="number"
                {...register('content.annexe.circulation.ascenseursAccessibles')}
                className="form-input"
                placeholder="Nombre d'ascenseurs accessibles PMR"
                min="0"
              />
            </div>

            <div>
              <Label className="form-label">Sanitaires accessibles</Label>
              <Textarea
                {...register('content.annexe.circulation.sanitairesAccessibles')}
                className="form-input min-h-[60px]"
                placeholder="Nombre et localisation des sanitaires PMR"
              />
            </div>
          </div>
        </div>

        {/* Évacuation des personnes handicapées */}
        <div className="bg-white border border-purple-200 rounded-relume-md p-4">
          <h3 className="text-lg font-semibold text-purple-700 mb-4">Dispositifs d'évacuation</h3>

          <div className="space-y-4">
            <div>
              <Label className="form-label">Espaces d'attente sécurisés (EAS)</Label>
              <Input
                type="number"
                {...register('content.annexe.evacuation.nombresEAS')}
                className="form-input"
                placeholder="Nombre d'EAS"
                min="0"
              />
            </div>

            <div>
              <Label className="form-label">Localisation des EAS</Label>
              <Textarea
                {...register('content.annexe.evacuation.localisationEAS')}
                className="form-input min-h-[80px]"
                placeholder="Précisez la localisation et les caractéristiques des espaces d'attente sécurisés"
              />
            </div>

            <div>
              <Label className="form-label">Dispositifs d'alarme adaptés</Label>
              <Textarea
                {...register('content.annexe.evacuation.alarmeAdaptee')}
                className="form-input min-h-[80px]"
                placeholder="Alarme sonore et visuelle, boucles magnétiques..."
              />
            </div>

            <div>
              <Label className="form-label">Assistance à l'évacuation</Label>
              <Textarea
                {...register('content.annexe.evacuation.assistanceEvacuation')}
                className="form-input min-h-[100px]"
                placeholder="Décrivez les procédures d'assistance, personnel formé, matériel d'évacuation..."
              />
            </div>
          </div>
        </div>

        {/* Signalétique */}
        <div>
          <h3 className="text-lg font-semibold text-purple-700 mb-4">Signalétique</h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="signaletique-braille"
                {...register('content.annexe.signaletique.braille')}
              />
              <Label htmlFor="signaletique-braille" className="cursor-pointer">
                Signalétique en braille
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="signaletique-relief"
                {...register('content.annexe.signaletique.relief')}
              />
              <Label htmlFor="signaletique-relief" className="cursor-pointer">
                Signalétique en relief
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="signaletique-contrastee"
                {...register('content.annexe.signaletique.contrastee')}
              />
              <Label htmlFor="signaletique-contrastee" className="cursor-pointer">
                Signalétique contrastée
              </Label>
            </div>

            <div>
              <Label className="form-label">Précisions complémentaires</Label>
              <Textarea
                {...register('content.annexe.signaletique.precisions')}
                className="form-input min-h-[80px]"
                placeholder="Décrivez les dispositifs de signalétique mis en place..."
              />
            </div>
          </div>
        </div>

        {/* Observations */}
        <div>
          <Label className="form-label">Observations complémentaires</Label>
          <Textarea
            {...register('content.annexe.observations')}
            className="form-input min-h-[120px]"
            placeholder="Toute information complémentaire concernant l'accessibilité et l'évacuation des personnes handicapées..."
          />
        </div>
      </div>
    </Card>
  );
};

export default NoticeERPAnnexe;
