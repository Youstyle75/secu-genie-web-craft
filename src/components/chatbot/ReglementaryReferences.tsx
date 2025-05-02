
import { ReglementaryReference } from './types';
import { ExternalLink } from 'lucide-react';

interface ReglementaryReferencesProps {
  references: ReglementaryReference[];
}

const ReglementaryReferences = ({ references }: ReglementaryReferencesProps) => {
  if (!references || references.length === 0) return null;
  
  return (
    <div className="mt-2 text-xs border-t border-gray-200 pt-1">
      <p className="font-medium text-gray-600">Sources réglementaires:</p>
      <ul className="mt-1 space-y-1">
        {references.map((ref) => (
          <li key={ref.id} className="flex items-center">
            <a 
              href={ref.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center"
            >
              <span className="truncate">{ref.title}</span>
              <ExternalLink className="h-3 w-3 ml-1 inline" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReglementaryReferences;
