import React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertTriangle } from 'lucide-react';

interface RisquesSectionProps {
  register: any;
  watch: any;
}

const RisquesSection: React.FC<RisquesSectionProps> = ({ register, watch }) => {
  const risqueCategories = [
    {
      id: 'physiques',
      title: 'Risques Physiques',
      color: 'accentBleu',
      items: [
        { id: 'bruit', label: 'Bruit' },
        { id: 'vibrations', label: 'Vibrations' },
        { id: 'temperature', label: 'Températures extrêmes' },
        { id: 'rayonnement', label: 'Rayonnements' },
      ]
    },
    {
      id: 'chimiques',
      title: 'Risques Chimiques',
      color: 'accentRouge',
      items: [
        { id: 'produits-toxiques', label: 'Produits toxiques' },
        { id: 'produits-corrosifs', label: 'Produits corrosifs' },
        { id: 'poussières', label: 'Poussières' },
        { id: 'fumees', label: 'Fumées' },
      ]
    },
    {
      id: 'biologiques',
      title: 'Risques Biologiques',
      color: 'text-green-600',
      items: [
        { id: 'bacteries', label: 'Bactéries' },
        { id: 'virus', label: 'Virus' },
        { id: 'champignons', label: 'Champignons' },
        { id: 'parasites', label: 'Parasites' },
      ]
    },
    {
      id: 'mecaniques',
      title: 'Risques Mécaniques',
      color: 'text-orange-600',
      items: [
        { id: 'chutes-hauteur', label: 'Chutes de hauteur' },
        { id: 'chutes-plain-pied', label: 'Chutes de plain-pied' },
        { id: 'circulation', label: 'Circulation des véhicules' },
        { id: 'ecrasement', label: 'Écrasement' },
        { id: 'coupures', label: 'Coupures' },
      ]
    },
    {
      id: 'electriques',
      title: 'Risques Électriques',
      color: 'text-yellow-600',
      items: [
        { id: 'electrisation', label: 'Électrisation' },
        { id: 'electrocution', label: 'Électrocution' },
        { id: 'incendie-electrique', label: 'Incendie d\'origine électrique' },
      ]
    },
    {
      id: 'amiante',
      title: 'Amiante',
      color: 'text-purple-600',
      items: [
        { id: 'amiante-friable', label: 'Amiante friable' },
        { id: 'amiante-non-friable', label: 'Amiante non friable' },
      ]
    },
  ];

  return (
    <Card className="p-6 mb-6 bg-formBackground border-formBorder">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="text-accentRouge" size={28} />
        <h2 className="text-2xl font-bold text-textPrincipal">Analyse des Risques</h2>
      </div>
      
      <Accordion type="multiple" className="space-y-4">
        {risqueCategories.map((category) => (
          <AccordionItem 
            key={category.id} 
            value={category.id}
            className="border border-formBorder rounded-relume-md overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3 bg-white hover:bg-formBackground">
              <span className={`font-semibold text-${category.color}`}>
                {category.title}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-4 bg-white">
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`risque-${category.id}-${item.id}`}
                        {...register(`content.risques.${category.id}.${item.id}.present`)}
                      />
                      <Label 
                        htmlFor={`risque-${category.id}-${item.id}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {item.label}
                      </Label>
                    </div>
                    
                    {watch(`content.risques.${category.id}.${item.id}.present`) && (
                      <Textarea
                        {...register(`content.risques.${category.id}.${item.id}.mesures`)}
                        placeholder="Mesures de prévention associées..."
                        className="form-input min-h-[80px] ml-6"
                      />
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};

export default RisquesSection;
