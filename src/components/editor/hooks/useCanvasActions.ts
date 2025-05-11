
import { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { toast } from 'sonner';
import { CanvasActionsType } from '../types';

const useCanvasActions = (): CanvasActionsType & {
  drawingMode: boolean;
  brushColor: string;
  setBrushColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
} => {
  const [drawingMode, setDrawingMode] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  
  // Get the canvas from window object
  useEffect(() => {
    const interval = setInterval(() => {
      if ((window as any).editorCanvas) {
        setCanvas((window as any).editorCanvas);
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  // Update drawing mode when it changes
  useEffect(() => {
    if (!canvas) return;
    
    canvas.isDrawingMode = drawingMode;
    
    if (drawingMode) {
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = brushColor;
        canvas.freeDrawingBrush.width = brushSize;
      }
    }
  }, [drawingMode, brushColor, brushSize, canvas]);
  
  // Toggle drawing mode
  const toggleDrawingMode = () => {
    setDrawingMode(!drawingMode);
    if (!drawingMode) {
      toast.info('Mode dessin activé');
    } else {
      toast.info('Mode dessin désactivé');
    }
  };
  
  // Add a rectangle
  const addRectangle = () => {
    if (!canvas) return;
    
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'transparent',
      stroke: '#000',
      strokeWidth: 2,
      width: 100,
      height: 50
    });
    
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
    toast.success('Rectangle ajouté');
  };
  
  // Add a circle
  const addCircle = () => {
    if (!canvas) return;
    
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      fill: 'transparent',
      stroke: '#000',
      strokeWidth: 2,
      radius: 30
    });
    
    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
    toast.success('Cercle ajouté');
  };
  
  // Add a line
  const addLine = () => {
    if (!canvas) return;
    
    const line = new fabric.Line([50, 50, 200, 50], {
      stroke: '#000',
      strokeWidth: 2
    });
    
    canvas.add(line);
    canvas.setActiveObject(line);
    canvas.renderAll();
    toast.success('Ligne ajoutée');
  };
  
  // Add text
  const addText = () => {
    if (!canvas) return;
    
    const text = new fabric.IText('Texte', {
      left: 100,
      top: 100,
      fontFamily: 'Arial',
      fontSize: 20,
      fill: '#FFFFFF', // Changé à blanc pour meilleure visibilité
    });
    
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    toast.success('Texte ajouté');
  };
  
  // Clear all elements
  const handleClear = () => {
    // Handled via events
    document.dispatchEvent(new CustomEvent('eraseAll'));
  };
  
  // Handle element removal
  const handleRemove = () => {
    // Handled via events
    document.dispatchEvent(new CustomEvent('eraseSelected'));
  };
  
  // Handle rotation
  const handleRotate = () => {
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.rotate((activeObject.angle || 0) + 90);
      canvas.renderAll();
      toast.info(`Élément pivoté`);
    }
  };
  
  // Save the plan
  const handleSave = () => {
    if (!canvas) return;
    
    try {
      // Generate data URL of the canvas
      const dataURL = canvas.toDataURL({ format: 'png' });
      
      // Create a download link
      const link = document.createElement('a');
      link.download = `SecuGenie-Plan-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataURL;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Plan sauvegardé avec succès !`);
      
    } catch (error) {
      console.error('Error saving plan:', error);
      toast.error(`Erreur lors de la sauvegarde du plan`);
    }
  };
  
  return {
    canvas,
    drawingMode,
    brushColor,
    setBrushColor,
    brushSize,
    setBrushSize,
    toggleDrawingMode,
    addRectangle,
    addCircle,
    addLine,
    addText,
    handleClear,
    handleRemove,
    handleRotate,
    handleSave
  };
};

export default useCanvasActions;
