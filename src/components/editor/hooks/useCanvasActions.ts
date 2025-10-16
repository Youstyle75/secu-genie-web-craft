
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
      fill: 'rgba(37, 99, 235, 0.1)',
      stroke: '#2563eb',
      strokeWidth: 2,
      width: 120,
      height: 80,
      rx: 4,
      ry: 4
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
      fill: 'rgba(19, 206, 102, 0.1)',
      stroke: '#13ce66',
      strokeWidth: 2,
      radius: 40
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
      stroke: '#64748b',
      strokeWidth: 3,
      strokeLineCap: 'round'
    });
    
    canvas.add(line);
    canvas.setActiveObject(line);
    canvas.renderAll();
    toast.success('Ligne ajoutée');
  };
  
  // Add arrow
  const addArrow = () => {
    if (!canvas) return;
    
    const arrow = new fabric.Path('M 0 0 L 100 0 L 90 -10 M 100 0 L 90 10', {
      stroke: '#e43e3e',
      strokeWidth: 3,
      fill: '',
      left: 100,
      top: 100,
      strokeLineCap: 'round',
      strokeLineJoin: 'round'
    });
    
    canvas.add(arrow);
    canvas.setActiveObject(arrow);
    canvas.renderAll();
    toast.success('Flèche ajoutée');
  };
  
  // Add polyline
  const addPolyline = () => {
    if (!canvas) return;
    
    const points = [
      { x: 50, y: 50 },
      { x: 100, y: 100 },
      { x: 150, y: 50 },
      { x: 200, y: 100 }
    ];
    
    const polyline = new fabric.Polyline(points, {
      stroke: '#2563eb',
      strokeWidth: 3,
      fill: 'transparent',
      left: 100,
      top: 100,
      strokeLineCap: 'round',
      strokeLineJoin: 'round'
    });
    
    canvas.add(polyline);
    canvas.setActiveObject(polyline);
    canvas.renderAll();
    toast.success('Polyligne ajoutée');
  };
  
  // Add colored zone
  const addColoredZone = () => {
    if (!canvas) return;
    
    const zone = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'rgba(241, 245, 249, 0.7)',
      stroke: '#64748b',
      strokeWidth: 1,
      strokeDashArray: [5, 5],
      width: 150,
      height: 100,
      rx: 8,
      ry: 8
    });
    
    canvas.add(zone);
    canvas.setActiveObject(zone);
    canvas.renderAll();
    toast.success('Zone colorée ajoutée');
  };
  
  // Add text
  const addText = () => {
    if (!canvas) return;
    
    const text = new fabric.IText('Texte', {
      left: 100,
      top: 100,
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: 16,
      fill: '#1e293b',
      fontWeight: '500'
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
  
  // Save the plan as PNG
  const handleSave = () => {
    if (!canvas) return;
    
    try {
      const dataURL = canvas.toDataURL({ 
        format: 'png',
        quality: 1,
        multiplier: 2
      });
      
      const link = document.createElement('a');
      link.download = `SecuGenie-Plan-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Plan exporté en PNG !');
    } catch (error) {
      console.error('Error saving plan:', error);
      toast.error('Erreur lors de l\'export PNG');
    }
  };
  
  // Export as SVG
  const exportSVG = () => {
    if (!canvas) return;
    
    try {
      const svg = canvas.toSVG();
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.download = `SecuGenie-Plan-${new Date().toISOString().slice(0, 10)}.svg`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Plan exporté en SVG !');
    } catch (error) {
      console.error('Error exporting SVG:', error);
      toast.error('Erreur lors de l\'export SVG');
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
    addArrow,
    addPolyline,
    addColoredZone,
    addText,
    handleClear,
    handleRemove,
    handleRotate,
    handleSave,
    exportSVG
  };
};

export default useCanvasActions;
