import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2 } from 'lucide-react';

interface NoticeERPHeaderProps {
  register: any;
  errors: any;
}

const NoticeERPHeader: React.FC<NoticeERPHeaderProps> = ({ register, errors }) => {
  const categoriesERP = [
    { value: 'J', label: 'Type J - Structures d\'accueil pour personnes âgées et handicapées' },
    { value: 'L', label: 'Type L - Salles d\'auditions, de conférences, de réunions, de spectacles ou à usage multiple' },
    { value: 'M', label: 'Type M - Magasins de vente, centres commerciaux' },
    { value: 'N', label: 'Type N - Restaurants et débits de boissons' },
    { value: 'O', label: 'Type O - Hôtels et pensions de famille' },
    { value: 'P', label: 'Type P - Salles de danse et salles de jeux' },
    { value: 'R', label: 'Type R - Établissements d\'enseignement, colonies de vacances' },
    { value: 'S', label: 'Type S - Bibliothèques, centres de documentation' },
    { value: 'T', label: 'Type T - Salles d\'exposition' },
    { value: 'U', label: 'Type U - Établissements sanitaires' },
    { value: 'V', label: 'Type V - Établissements de culte' },
    { value: 'W', label: 'Type W - Administrations, banques, bureaux' },
    { value: 'X', label: 'Type X - Établissements sportifs couverts' },
    { value: 'Y', label: 'Type Y - Musées' },
  ];

  return (
    <Card className="p-8 mb-6 bg-gradient-to-br from-accentBleu/5 via-white to-accentBleu/5 border-accentBleu/30">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-accentBleu/20">
        <div className="bg-accentBleu/10 p-4 rounded-relume-lg">
          <Building2 className="text-accentBleu" size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-textPrincipal">Notice de Sécurité ERP</h2>
          <p className="text-sm text-textPrincipal/60">Établissement Recevant du Public</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="form-label">Nom de l'établissement *</Label>
            <Input 
              {...register('content.identification.nomEtablissement')} 
              className="form-input"
              placeholder="Ex: Centre Commercial Les Arcades"
            />
            {errors?.content?.identification?.nomEtablissement && (
              <p className="form-error">{errors.content.identification.nomEtablissement.message}</p>
            )}
          </div>

          <div>
            <Label className="form-label">Adresse complète *</Label>
            <Input 
              {...register('content.identification.adresse')} 
              className="form-input"
              placeholder="Numéro, rue, complément"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="form-label">Code postal</Label>
            <Input 
              {...register('content.identification.codePostal')} 
              className="form-input"
              placeholder="75001"
            />
          </div>

          <div>
            <Label className="form-label">Commune</Label>
            <Input 
              {...register('content.identification.commune')} 
              className="form-input"
              placeholder="Paris"
            />
          </div>

          <div>
            <Label className="form-label">Département</Label>
            <Input 
              {...register('content.identification.departement')} 
              className="form-input"
              placeholder="75"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="form-label">Catégorie ERP (Type) *</Label>
            <select {...register('content.identification.categorieERP')} className="form-input">
              <option value="">Sélectionner une catégorie</option>
              {categoriesERP.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <Label className="form-label">Classement (catégorie)</Label>
            <select {...register('content.identification.classement')} className="form-input">
              <option value="">Sélectionner</option>
              <option value="1">1ère catégorie (au-dessus de 1500 personnes)</option>
              <option value="2">2ème catégorie (de 701 à 1500 personnes)</option>
              <option value="3">3ème catégorie (de 301 à 700 personnes)</option>
              <option value="4">4ème catégorie (300 personnes et au-dessous, à l'exception de la 5ème)</option>
              <option value="5">5ème catégorie (selon seuil du type)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="form-label">Références légales</Label>
            <Input 
              {...register('content.identification.referencesLegales')} 
              className="form-input"
              placeholder="Ex: Arrêté du 25 juin 1980 modifié"
            />
          </div>

          <div>
            <Label className="form-label">Date de la notice</Label>
            <Input 
              type="date"
              {...register('content.identification.dateNotice')} 
              className="form-input"
            />
          </div>
        </div>

        <div>
          <Label className="form-label">Maître d'ouvrage / Propriétaire</Label>
          <Input 
            {...register('content.identification.maitreOuvrage')} 
            className="form-input"
            placeholder="Nom du maître d'ouvrage"
          />
        </div>
      </div>
    </Card>
  );
};

export default NoticeERPHeader;
