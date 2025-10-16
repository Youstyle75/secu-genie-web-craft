import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';

interface NoticeERPPresentationProps {
  register: any;
  control: any;
  watch: any;
}

const NoticeERPPresentation: React.FC<NoticeERPPresentationProps> = ({ register, control, watch }) => {
  const { fields: niveauxFields, append: appendNiveau, remove: removeNiveau } = useFieldArray({
    control,
    name: 'content.presentation.effectifsParNiveau',
  });

  return (
    <Card className="p-6 mb-6 bg-formBackground border-formBorder">
      <h2 className="text-2xl font-bold text-textPrincipal mb-6">Présentation du Projet</h2>

      <div className="space-y-6">
        {/* Description du projet */}
        <div>
          <Label className="form-label">Description générale du projet</Label>
          <Textarea
            {...register('content.presentation.description')}
            className="form-input min-h-[150px]"
            placeholder="Décrivez le projet d'aménagement, de construction ou de modification..."
          />
        </div>

        {/* Conditions d'exploitation */}
        <div>
          <Label className="form-label">Conditions d'exploitation</Label>
          <Textarea
            {...register('content.presentation.conditionsExploitation')}
            className="form-input min-h-[100px]"
            placeholder="Horaires d'ouverture, type d'activités, spécificités..."
          />
        </div>

        {/* Effectifs - Tableau dynamique */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label className="form-label text-lg">Effectifs par niveau</Label>
            <Button
              type="button"
              onClick={() => appendNiveau({ niveau: '', public: 0, personnel: 0 })}
              variant="outline"
              size="sm"
              className="btn-outline"
            >
              <Plus size={16} className="mr-2" />
              Ajouter un niveau
            </Button>
          </div>

          {niveauxFields.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Niveau</TableHead>
                    <TableHead>Effectif Public</TableHead>
                    <TableHead>Effectif Personnel</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {niveauxFields.map((field, index) => {
                    const publicValue = parseInt(watch(`content.presentation.effectifsParNiveau.${index}.public`) || '0');
                    const personnelValue = parseInt(watch(`content.presentation.effectifsParNiveau.${index}.personnel`) || '0');
                    const total = publicValue + personnelValue;

                    return (
                      <TableRow key={field.id}>
                        <TableCell>
                          <Input
                            {...register(`content.presentation.effectifsParNiveau.${index}.niveau`)}
                            placeholder="Ex: RDC, R+1, Sous-sol"
                            className="form-input"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            {...register(`content.presentation.effectifsParNiveau.${index}.public`)}
                            placeholder="0"
                            className="form-input"
                            min="0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            {...register(`content.presentation.effectifsParNiveau.${index}.personnel`)}
                            placeholder="0"
                            className="form-input"
                            min="0"
                          />
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-accentBleu">{total}</span>
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeNiveau(index)}
                            className="text-accentRouge hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 bg-white border border-dashed border-formBorder rounded-relume-md">
              <p className="text-textPrincipal/60">Aucun niveau défini. Cliquez sur "Ajouter un niveau"</p>
            </div>
          )}
        </div>

        {/* Effectif total calculé */}
        <div className="bg-accentBleu/10 p-4 rounded-relume-md border border-accentBleu/30">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-textPrincipal">Effectif total de l'établissement :</span>
            <span className="text-2xl font-bold text-accentBleu">
              {niveauxFields.reduce((total, field, index) => {
                const pub = parseInt(watch(`content.presentation.effectifsParNiveau.${index}.public`) || '0');
                const pers = parseInt(watch(`content.presentation.effectifsParNiveau.${index}.personnel`) || '0');
                return total + pub + pers;
              }, 0)}
            </span>
          </div>
        </div>

        {/* Locaux à sommeil */}
        <div className="border border-formBorder rounded-relume-md p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Checkbox
              id="locaux-sommeil"
              {...register('content.presentation.locauxSommeil.present')}
            />
            <Label htmlFor="locaux-sommeil" className="text-base font-semibold cursor-pointer">
              Présence de locaux à sommeil
            </Label>
          </div>

          {watch('content.presentation.locauxSommeil.present') && (
            <div className="ml-7 space-y-3">
              <Input
                type="number"
                {...register('content.presentation.locauxSommeil.nombre')}
                placeholder="Nombre de locaux à sommeil"
                className="form-input"
                min="0"
              />
              <Input
                type="number"
                {...register('content.presentation.locauxSommeil.capacite')}
                placeholder="Capacité totale (nombre de personnes)"
                className="form-input"
                min="0"
              />
            </div>
          )}
        </div>

        {/* Classement final */}
        <div>
          <Label className="form-label">Classement final de l'ERP</Label>
          <Input
            {...register('content.presentation.classementFinal')}
            className="form-input"
            placeholder="Ex: ERP de type L, 4ème catégorie"
          />
        </div>
      </div>
    </Card>
  );
};

export default NoticeERPPresentation;
