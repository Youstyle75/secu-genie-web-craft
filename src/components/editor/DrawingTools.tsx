
import React from 'react';
import { DrawingToolProps } from './types';

const DrawingTools: React.FC<DrawingToolProps> = ({ 
  brushColor, 
  setBrushColor, 
  brushSize, 
  setBrushSize 
}) => {
  return (
    <div className="mb-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-dark-foreground">Couleur du pinceau</label>
        <div className="flex gap-2">
          {['#000000', '#ff0000', '#0000ff', '#008000', '#ffa500'].map(color => (
            <div
              key={color}
              className={`w-6 h-6 rounded-full cursor-pointer border ${brushColor === color ? 'border-gray-600 ring-2 ring-primary' : 'border-gray-300'}`}
              style={{ backgroundColor: color }}
              onClick={() => setBrushColor(color)}
              title={color}
            />
          ))}
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            className="w-6 h-6 cursor-pointer"
            title="Couleur personnalisée"
          />
        </div>
        
        <label className="text-sm text-dark-foreground">Taille du pinceau</label>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default DrawingTools;
