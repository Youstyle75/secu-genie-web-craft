
import React from 'react';
import { DrawingToolProps } from './types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Palette de couleurs Relume
const RELUME_COLORS = [
  { name: 'Bleu Primary', value: '#2563eb', description: 'Bleu professionnel' },
  { name: 'Rouge Danger', value: '#e43e3e', description: 'Rouge sécurité' },
  { name: 'Vert Sécurité', value: '#13ce66', description: 'Vert validation' },
  { name: 'Gris Doux', value: '#64748b', description: 'Gris neutre' },
  { name: 'Noir', value: '#1e293b', description: 'Noir profond' },
  { name: 'Orange Alert', value: '#f97316', description: 'Orange attention' },
];

const DrawingTools: React.FC<DrawingToolProps> = ({ 
  brushColor, 
  setBrushColor, 
  brushSize, 
  setBrushSize 
}) => {
  return (
    <TooltipProvider>
      <div className="mb-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 shadow-sm">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-2 block">
              Palette de couleurs
            </label>
            <div className="flex flex-wrap gap-2">
              {RELUME_COLORS.map(color => (
                <Tooltip key={color.value}>
                  <TooltipTrigger asChild>
                    <button
                      className={`w-8 h-8 rounded-lg cursor-pointer border-2 transition-all hover:scale-110 hover:shadow-md ${
                        brushColor === color.value 
                          ? 'border-gray-900 ring-2 ring-gray-900/20 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setBrushColor(color.value)}
                      aria-label={color.name}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-gray-900 text-white text-xs">
                    <p className="font-medium">{color.name}</p>
                    <p className="text-gray-400 text-[10px]">{color.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
              <Tooltip>
                <TooltipTrigger asChild>
                  <input
                    type="color"
                    value={brushColor}
                    onChange={(e) => setBrushColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-gray-300 transition-all"
                    title="Couleur personnalisée"
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-gray-900 text-white text-xs">
                  Couleur personnalisée
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-gray-700">
                Épaisseur du trait
              </label>
              <span className="text-xs text-gray-500 font-mono">{brushSize}px</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DrawingTools;
