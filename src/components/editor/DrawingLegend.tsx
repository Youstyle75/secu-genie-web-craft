import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getIconsByCategory, type IconCategory } from './PlanIcons';

type DrawingLegendProps = {
  usedIcons: Set<string>;
};

const DrawingLegend = ({ usedIcons }: DrawingLegendProps) => {
  const categories: IconCategory[] = ['security', 'event', 'furniture', 'signs', 'emergency'];
  
  const categoryLabels: Record<IconCategory, string> = {
    security: 'Sécurité',
    event: 'Événement',
    furniture: 'Mobilier',
    signs: 'Signalétique',
    emergency: 'Urgence'
  };
  
  const categoryColors: Record<IconCategory, string> = {
    security: 'bg-red-100 text-red-700 border-red-200',
    event: 'bg-blue-100 text-blue-700 border-blue-200',
    furniture: 'bg-gray-100 text-gray-700 border-gray-200',
    signs: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    emergency: 'bg-orange-100 text-orange-700 border-orange-200'
  };
  
  if (usedIcons.size === 0) return null;
  
  return (
    <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Légende du plan</h3>
      <div className="space-y-3">
        {categories.map(category => {
          const icons = getIconsByCategory(category).filter(icon => 
            usedIcons.has(icon.type)
          );
          
          if (icons.length === 0) return null;
          
          return (
            <div key={category} className="space-y-2">
              <Badge 
                variant="outline" 
                className={`text-xs font-medium ${categoryColors[category]}`}
              >
                {categoryLabels[category]}
              </Badge>
              <div className="grid grid-cols-2 gap-2 ml-2">
                {icons.map(icon => (
                  <div key={icon.type} className="flex items-center gap-2">
                    <span className="text-lg">{icon.emoji}</span>
                    <span className="text-xs text-gray-600">{icon.label}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default DrawingLegend;
