
import { useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import { toast } from 'sonner';
import { getIconsByCategory } from './PlanIcons';
import { EditorElement } from './types';

type PlanEditorCanvasProps = {
  elements: EditorElement[];
  setElements: React.Dispatch<React.SetStateAction<EditorElement[]>>;
  selectedElement: string | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<string | null>>;
  draggedType: string | null;
  setDraggedType: React.Dispatch<React.SetStateAction<string | null>>;
  importLoading: boolean;
  setImportLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlanEditorCanvas: React.FC<PlanEditorCanvasProps> = ({ 
  elements,
  setElements,
  selectedElement,
  setSelectedElement,
  draggedType,
  setDraggedType,
  importLoading,
  setImportLoading
}) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Initialize Fabric canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 500,
      backgroundColor: '#f9fafb',
      isDrawingMode: false
    });
    
    fabricCanvas.on('selection:created', (e) => {
      const activeObj = e.selected?.[0];
      if (activeObj && activeObj.data?.id) {
        setSelectedElement(activeObj.data.id);
      }
    });
    
    fabricCanvas.on('selection:cleared', () => {
      setSelectedElement(null);
    });
    
    setCanvas(fabricCanvas);
    
    return () => {
      fabricCanvas.dispose();
    };
  }, []);
  
  // Helper to get label from type
  const getElementLabel = (type: string) => {
    const allIcons = [
      ...getIconsByCategory('security'),
      ...getIconsByCategory('event'),
      ...getIconsByCategory('furniture'),
      ...getIconsByCategory('signs'),
      ...getIconsByCategory('emergency')
    ];
    return allIcons.find(el => el.type === type)?.label || type;
  };
  
  // Add element to canvas
  const addElementToCanvas = (type: string, x: number, y: number) => {
    if (!canvas) return;
    
    const id = `${type}-${Date.now()}`;
    const allIcons = [
      ...getIconsByCategory('security'),
      ...getIconsByCategory('event'),
      ...getIconsByCategory('furniture'),
      ...getIconsByCategory('signs'),
      ...getIconsByCategory('emergency')
    ];
    const iconDef = allIcons.find(icon => icon.type === type);
    
    const iconText = iconDef?.emoji || '❓';
    
    const text = new fabric.Text(iconText, {
      left: x,
      top: y,
      fontSize: 30,
      fill: '#FFFFFF', // Changé à blanc pour meilleure visibilité
      selectable: true,
      data: { id, type }
    });
    
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    
    const newElement: EditorElement = {
      id,
      type,
      x,
      y,
      rotation: 0,
    };
    
    setElements(prev => [...prev, newElement]);
    toast.success(`${getElementLabel(type)} ajouté au plan`);
  };
  
  // Handle dropping on the plan
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (!draggedType || !canvas) return;
    
    const rect = canvas.getElement().getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    addElementToCanvas(draggedType, x, y);
    setDraggedType(null);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  // Handle element removal
  const handleRemove = () => {
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      
      if (activeObject.data?.id) {
        setElements(prev => prev.filter(el => el.id !== activeObject.data.id));
      }
      
      setSelectedElement(null);
      toast.success(`Élément supprimé du plan`);
    }
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
  
  // Listen for custom events from ElementLibrary
  useEffect(() => {
    const handleImportImage = (e: Event) => {
      if (!canvas) return;
      
      const { file } = (e as CustomEvent).detail;
      if (!file) return;
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result && canvas) {
          fabric.Image.fromURL(event.target.result.toString(), (img) => {
            // Redimensionner si nécessaire
            if (img.width && img.width > canvas.width) {
              img.scaleToWidth(canvas.width * 0.9);
            }
            
            canvas.add(img);
            canvas.renderAll();
            setImportLoading(false);
            toast.success('Plan importé avec succès !');
          });
        }
      };
      
      reader.readAsDataURL(file);
    };
    
    const handleEraseSelected = () => {
      handleRemove();
    };
    
    const handleEraseAll = () => {
      if (!canvas) return;
      
      if (elements.length === 0) return;
      
      canvas.clear();
      canvas.setBackgroundColor('#f9fafb', canvas.renderAll.bind(canvas));
      setElements([]);
      setSelectedElement(null);
      
      toast.success(`Plan effacé`);
    };
    
    document.addEventListener('importImage', handleImportImage);
    document.addEventListener('eraseSelected', handleEraseSelected);
    document.addEventListener('eraseAll', handleEraseAll);
    
    return () => {
      document.removeEventListener('importImage', handleImportImage);
      document.removeEventListener('eraseSelected', handleEraseSelected);
      document.removeEventListener('eraseAll', handleEraseAll);
    };
  }, [canvas, elements]);
  
  // Share canvas with the context
  useEffect(() => {
    if (canvas) {
      (window as any).editorCanvas = canvas;
      
      return () => {
        delete (window as any).editorCanvas;
      };
    }
  }, [canvas]);
  
  return (
    <div
      className="border-2 border-dark-light rounded-lg relative"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ height: '500px' }}
    >
      <canvas ref={canvasRef} />
      
      {/* Toolbar for selected elements */}
      {selectedElement && canvas && (
        <div className="absolute top-4 right-4 bg-dark-light shadow-md rounded-md flex p-1 z-10">
          <button
            onClick={handleRotate}
            className="p-2 hover:bg-dark-medium rounded text-dark-foreground"
            title="Pivoter"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
          <button
            onClick={handleRemove}
            className="p-2 hover:bg-dark-medium text-red-400 rounded"
            title="Supprimer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default PlanEditorCanvas;
