import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  DoorOpen, 
  Wind, 
  Zap, 
  Lightbulb, 
  Thermometer, 
  Flame, 
  AlertTriangle 
} from 'lucide-react';

interface NoticeERPSectionsAccordionProps {
  register: any;
}

const NoticeERPSectionsAccordion: React.FC<NoticeERPSectionsAccordionProps> = ({ register }) => {
  const sections = [
    {
      id: 'degagements',
      title: 'Dégagements et Ascenseurs',
      icon: DoorOpen,
      color: 'text-blue-600',
      fields: [
        {
          id: 'nombreSorties',
          label: 'Nombre de sorties',
          type: 'number',
          placeholder: '0'
        },
        {
          id: 'largeurDegagements',
          label: 'Largeur des dégagements (UP)',
          type: 'text',
          placeholder: 'Ex: 2 UP'
        },
        {
          id: 'distanceMaxEvacuation',
          label: 'Distance maximale d\'évacuation (m)',
          type: 'number',
          placeholder: '0'
        },
        {
          id: 'ascenseurs',
          label: 'Nombre d\'ascenseurs',
          type: 'number',
          placeholder: '0'
        },
        {
          id: 'ascenseursAccessibles',
          label: 'Ascenseurs accessibles PMR',
          type: 'number',
          placeholder: '0'
        },
        {
          id: 'descriptionDegagements',
          label: 'Description détaillée',
          type: 'textarea',
          placeholder: 'Décrivez les dégagements, escaliers, issues de secours...'
        },
      ]
    },
    {
      id: 'desenfumage',
      title: 'Désenfumage',
      icon: Wind,
      color: 'text-cyan-600',
      fields: [
        {
          id: 'systemeDesenfumage',
          label: 'Type de système',
          type: 'select',
          options: [
            { value: '', label: 'Sélectionner' },
            { value: 'naturel', label: 'Désenfumage naturel' },
            { value: 'mecanique', label: 'Désenfumage mécanique' },
            { value: 'mixte', label: 'Désenfumage mixte' },
          ]
        },
        {
          id: 'locauxDesenfumes',
          label: 'Locaux désenfumés',
          type: 'textarea',
          placeholder: 'Listez les locaux équipés de désenfumage...'
        },
        {
          id: 'surfaceUtileDesenfumage',
          label: 'Surface utile de désenfumage (m²)',
          type: 'number',
          placeholder: '0'
        },
        {
          id: 'commandeDesenfumage',
          label: 'Commande de désenfumage',
          type: 'textarea',
          placeholder: 'Décrivez le système de commande (manuelle, automatique, détection...)'
        },
      ]
    },
    {
      id: 'electricite',
      title: 'Installations Électriques',
      icon: Zap,
      color: 'text-yellow-600',
      fields: [
        {
          id: 'puissanceSouscrite',
          label: 'Puissance souscrite (kVA)',
          type: 'number',
          placeholder: '0'
        },
        {
          id: 'typeAlimentation',
          label: 'Type d\'alimentation',
          type: 'select',
          options: [
            { value: '', label: 'Sélectionner' },
            { value: 'normal', label: 'Alimentation normale uniquement' },
            { value: 'secours', label: 'Alimentation normale + secours' },
          ]
        },
        {
          id: 'groupeElectrogene',
          label: 'Présence groupe électrogène',
          type: 'select',
          options: [
            { value: '', label: 'Sélectionner' },
            { value: 'oui', label: 'Oui' },
            { value: 'non', label: 'Non' },
          ]
        },
        {
          id: 'tableauElectrique',
          label: 'Localisation tableau électrique principal',
          type: 'text',
          placeholder: 'Ex: Local technique RDC'
        },
        {
          id: 'protections',
          label: 'Protections et sécurités',
          type: 'textarea',
          placeholder: 'Décrivez les dispositifs de protection (disjoncteurs, parafoudre, mise à la terre...)'
        },
      ]
    },
    {
      id: 'eclairage',
      title: 'Éclairage de Sécurité',
      icon: Lightbulb,
      color: 'text-orange-600',
      fields: [
        {
          id: 'typeEclairage',
          label: 'Type d\'éclairage de sécurité',
          type: 'select',
          options: [
            { value: '', label: 'Sélectionner' },
            { value: 'permanent', label: 'Permanent' },
            { value: 'non-permanent', label: 'Non permanent' },
          ]
        },
        {
          id: 'eclairageEvacuation',
          label: 'Éclairage d\'évacuation',
          type: 'textarea',
          placeholder: 'Décrivez les blocs d\'évacuation, BAES...'
        },
        {
          id: 'eclairageAmbiance',
          label: 'Éclairage d\'ambiance',
          type: 'textarea',
          placeholder: 'Si applicable, décrivez l\'éclairage d\'ambiance anti-panique'
        },
        {
          id: 'autonomie',
          label: 'Autonomie (heures)',
          type: 'number',
          placeholder: '1'
        },
      ]
    },
    {
      id: 'chauffage',
      title: 'Chauffage et Ventilation',
      icon: Thermometer,
      color: 'text-red-600',
      fields: [
        {
          id: 'typeChauffage',
          label: 'Type de chauffage',
          type: 'select',
          options: [
            { value: '', label: 'Sélectionner' },
            { value: 'electrique', label: 'Électrique' },
            { value: 'gaz', label: 'Gaz' },
            { value: 'fioul', label: 'Fioul' },
            { value: 'urbain', label: 'Chauffage urbain' },
            { value: 'autre', label: 'Autre' },
          ]
        },
        {
          id: 'puissanceChauffage',
          label: 'Puissance installée (kW)',
          type: 'number',
          placeholder: '0'
        },
        {
          id: 'ventilation',
          label: 'Système de ventilation',
          type: 'select',
          options: [
            { value: '', label: 'Sélectionner' },
            { value: 'naturelle', label: 'Ventilation naturelle' },
            { value: 'mecanique', label: 'Ventilation mécanique contrôlée (VMC)' },
            { value: 'double-flux', label: 'VMC double flux' },
          ]
        },
        {
          id: 'descriptionChauffageVentilation',
          label: 'Description détaillée',
          type: 'textarea',
          placeholder: 'Décrivez les installations de chauffage et ventilation...'
        },
      ]
    },
    {
      id: 'gaz',
      title: 'Gaz et Hydrocarbures',
      icon: Flame,
      color: 'text-purple-600',
      fields: [
        {
          id: 'presenceGaz',
          label: 'Présence de gaz',
          type: 'select',
          options: [
            { value: '', label: 'Sélectionner' },
            { value: 'oui', label: 'Oui' },
            { value: 'non', label: 'Non' },
          ]
        },
        {
          id: 'typeGaz',
          label: 'Type de gaz',
          type: 'text',
          placeholder: 'Ex: Gaz naturel, propane, butane...'
        },
        {
          id: 'localisationStockage',
          label: 'Localisation stockage',
          type: 'text',
          placeholder: 'Local de stockage ou citerne'
        },
        {
          id: 'dispositifsSecurite',
          label: 'Dispositifs de sécurité',
          type: 'textarea',
          placeholder: 'Décrivez les détecteurs, coupures d\'urgence, ventilation...'
        },
      ]
    },
    {
      id: 'locaux-risques',
      title: 'Locaux à Risques Particuliers',
      icon: AlertTriangle,
      color: 'text-red-600',
      fields: [
        {
          id: 'presenceLocauxRisques',
          label: 'Présence de locaux à risques',
          type: 'select',
          options: [
            { value: '', label: 'Sélectionner' },
            { value: 'oui', label: 'Oui' },
            { value: 'non', label: 'Non' },
          ]
        },
        {
          id: 'listeLocauxRisques',
          label: 'Liste des locaux à risques',
          type: 'textarea',
          placeholder: 'Ex: Local technique, chaufferie, stockage produits dangereux...'
        },
        {
          id: 'mesuresProtection',
          label: 'Mesures de protection',
          type: 'textarea',
          placeholder: 'Décrivez l\'isolement, les protections incendie, ventilation...'
        },
      ]
    },
  ];

  return (
    <Card className="p-6 mb-6 bg-formBackground border-formBorder">
      <h2 className="text-2xl font-bold text-textPrincipal mb-6">Dispositions Techniques</h2>

      <Accordion type="multiple" className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="border border-formBorder rounded-relume-md overflow-hidden bg-white"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-formBackground">
                <div className="flex items-center gap-3">
                  <Icon className={section.color} size={24} />
                  <span className="font-semibold text-textPrincipal">{section.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-5 bg-white">
                <div className="space-y-4">
                  {section.fields.map((field) => (
                    <div key={field.id}>
                      <Label className="form-label">{field.label}</Label>
                      {field.type === 'textarea' ? (
                        <Textarea
                          {...register(`content.${section.id}.${field.id}`)}
                          placeholder={field.placeholder}
                          className="form-input min-h-[100px]"
                        />
                      ) : field.type === 'select' ? (
                        <select
                          {...register(`content.${section.id}.${field.id}`)}
                          className="form-input"
                        >
                          {field.options?.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      ) : (
                        <Input
                          type={field.type}
                          {...register(`content.${section.id}.${field.id}`)}
                          placeholder={field.placeholder}
                          className="form-input"
                          min={field.type === 'number' ? '0' : undefined}
                          step={field.type === 'number' ? '0.01' : undefined}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Card>
  );
};

export default NoticeERPSectionsAccordion;
