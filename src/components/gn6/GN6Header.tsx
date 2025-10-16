import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, Users } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface GN6HeaderProps {
  register: any;
  errors: any;
  watch: any;
  setValue: any;
}

const GN6Header: React.FC<GN6HeaderProps> = ({ register, errors, watch, setValue }) => {
  const dateDebut = watch('content.informations.dateDebut');
  const dateFin = watch('content.informations.dateFin');

  return (
    <Card className="p-8 mb-6 bg-gradient-to-br from-accentBleu/5 via-white to-accentBleu/5 border-accentBleu/30">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-accentBleu/20">
        <div className="bg-accentBleu/10 p-4 rounded-relume-lg">
          <Users className="text-accentBleu" size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-textPrincipal">Dossier GN6</h2>
          <p className="text-sm text-textPrincipal/60">Manifestation exceptionnelle accueillant du public</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Organisateur */}
        <div className="bg-white border border-formBorder rounded-relume-md p-6">
          <h3 className="text-lg font-semibold text-accentBleu mb-4">Organisateur de la manifestation</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="form-label">Nom de l'organisateur *</Label>
                <Input 
                  {...register('content.organisateur.nom')} 
                  className="form-input"
                  placeholder="Nom complet ou raison sociale"
                />
                {errors?.content?.organisateur?.nom && (
                  <p className="form-error">{errors.content.organisateur.nom.message}</p>
                )}
              </div>

              <div>
                <Label className="form-label">Qualité / Fonction</Label>
                <Input 
                  {...register('content.organisateur.qualite')} 
                  className="form-input"
                  placeholder="Ex: Président association, Directeur..."
                />
              </div>
            </div>

            <div>
              <Label className="form-label">Adresse complète *</Label>
              <Input 
                {...register('content.organisateur.adresse')} 
                className="form-input"
                placeholder="Numéro, rue, complément d'adresse"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="form-label">Code postal</Label>
                <Input 
                  {...register('content.organisateur.codePostal')} 
                  className="form-input"
                  placeholder="75001"
                />
              </div>

              <div>
                <Label className="form-label">Ville</Label>
                <Input 
                  {...register('content.organisateur.ville')} 
                  className="form-input"
                  placeholder="Paris"
                />
              </div>

              <div>
                <Label className="form-label">Téléphone *</Label>
                <Input 
                  type="tel"
                  {...register('content.organisateur.telephone')} 
                  className="form-input"
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Manifestation */}
        <div className="bg-white border border-formBorder rounded-relume-md p-6">
          <h3 className="text-lg font-semibold text-accentBleu mb-4">Nature de la manifestation</h3>

          <div className="space-y-4">
            <div>
              <Label className="form-label">Intitulé de la manifestation *</Label>
              <Input 
                {...register('content.informations.intitule')} 
                className="form-input"
                placeholder="Ex: Festival de musique, Salon professionnel..."
              />
            </div>

            <div>
              <Label className="form-label">Description détaillée</Label>
              <Textarea
                {...register('content.informations.description')}
                className="form-input min-h-[100px]"
                placeholder="Décrivez la nature de la manifestation, les activités prévues..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="form-label">Date de début *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal form-input",
                        !dateDebut && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateDebut ? format(new Date(dateDebut), "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateDebut ? new Date(dateDebut) : undefined}
                      onSelect={(date) => setValue('content.informations.dateDebut', date?.toISOString())}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="form-label">Date de fin *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal form-input",
                        !dateFin && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFin ? format(new Date(dateFin), "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFin ? new Date(dateFin) : undefined}
                      onSelect={(date) => setValue('content.informations.dateFin', date?.toISOString())}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label className="form-label">Horaires</Label>
              <Input 
                {...register('content.informations.horaires')} 
                className="form-input"
                placeholder="Ex: 10h00 - 22h00"
              />
            </div>
          </div>
        </div>

        {/* Lieu et Configuration */}
        <div className="bg-white border border-formBorder rounded-relume-md p-6">
          <h3 className="text-lg font-semibold text-accentBleu mb-4">Lieu et Configuration</h3>

          <div className="space-y-4">
            <div>
              <Label className="form-label">Lieu de la manifestation *</Label>
              <Input 
                {...register('content.lieu.adresse')} 
                className="form-input"
                placeholder="Adresse complète du lieu"
              />
            </div>

            <div>
              <Label className="form-label">Accord de l'exploitant</Label>
              <select {...register('content.lieu.accordExploitant')} className="form-input">
                <option value="">Sélectionner</option>
                <option value="obtenu">Accord obtenu</option>
                <option value="en-cours">En cours d'obtention</option>
                <option value="non-requis">Non requis (organisateur = exploitant)</option>
              </select>
            </div>

            <div>
              <Label className="form-label">Configuration du lieu</Label>
              <Textarea
                {...register('content.lieu.configuration')}
                className="form-input min-h-[100px]"
                placeholder="Décrivez la configuration : plein air, sous chapiteau, salle fermée, surface couverte..."
              />
            </div>

            <div>
              <Label className="form-label">Installations techniques prévues</Label>
              <Textarea
                {...register('content.lieu.installationsTechniques')}
                className="form-input min-h-[100px]"
                placeholder="Scène, sonorisation, éclairage, structures temporaires, installations électriques..."
              />
            </div>
          </div>
        </div>

        {/* Effectifs */}
        <div className="bg-accentBleu/10 border border-accentBleu/30 rounded-relume-md p-6">
          <h3 className="text-lg font-semibold text-accentBleu mb-4">Effectifs prévisionnels</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="form-label">Public accueilli *</Label>
              <Input 
                type="number"
                {...register('content.effectifs.public')} 
                className="form-input bg-white"
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <Label className="form-label">Personnel organisateur</Label>
              <Input 
                type="number"
                {...register('content.effectifs.personnel')} 
                className="form-input bg-white"
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <Label className="form-label">Intervenants / Artistes</Label>
              <Input 
                type="number"
                {...register('content.effectifs.intervenants')} 
                className="form-input bg-white"
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="mt-4 p-4 bg-white rounded-relume-md">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-textPrincipal">Effectif total prévisionnel :</span>
              <span className="text-2xl font-bold text-accentBleu">
                {(parseInt(watch('content.effectifs.public') || '0') +
                  parseInt(watch('content.effectifs.personnel') || '0') +
                  parseInt(watch('content.effectifs.intervenants') || '0'))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GN6Header;
