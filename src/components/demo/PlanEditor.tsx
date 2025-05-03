
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { fabric } from 'fabric';
import { Button } from '@/components/ui/button';

type EditorElement = {
  id: string;
  type: 'extinguisher' | 'exit' | 'assembly' | 'firstaid';
  x: number;
  y: number;
  rotation: number;
};

const PlanEditor = () => {
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedType, setDraggedType] = useState<EditorElement['type'] | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [importLoading, setImportLoading] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Library elements info
  const libraryElements = [
    { type: 'extinguisher', label: 'Extincteur', icon: '🧯' },
    { type: 'exit', label: 'Sortie de Secours', icon: '🚪' },
    { type: 'assembly', label: 'Point de Rassemblement', icon: '👥' },
    { type: 'firstaid', label: 'Trousse de Secours', icon: '🩹' },
  ] as const;
  
  // Initialize Fabric canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 500,
      backgroundColor: '#f9fafb',
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
  
  // Handle dragging from library
  const handleDragStart = (type: EditorElement['type']) => {
    setDraggedType(type);
  };
  
  // Add element to canvas
  const addElementToCanvas = (type: EditorElement['type'], x: number, y: number) => {
    if (!canvas) return;
    
    const id = `${type}-${Date.now()}`;
    const iconText = getElementIcon(type);
    
    const text = new fabric.Text(iconText, {
      left: x,
      top: y,
      fontSize: 30,
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
  
  // Helper to get label from type
  const getElementLabel = (type: EditorElement['type']) => {
    return libraryElements.find(el => el.type === type)?.label || type;
  };
  
  // Element icons
  const getElementIcon = (type: EditorElement['type']) => {
    return libraryElements.find(el => el.type === type)?.icon || '❓';
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
  
  // Clear all elements
  const handleClear = () => {
    if (!canvas) return;
    
    if (elements.length === 0) return;
    
    if (window.confirm('Êtes-vous sûr de vouloir supprimer tous les éléments du plan ?')) {
      canvas.clear();
      canvas.setBackgroundColor('#f9fafb', canvas.renderAll.bind(canvas));
      setElements([]);
      setSelectedElement(null);
      
      toast.success(`Plan effacé`);
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
  
  // Import plan
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvas) return;
    
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error('Format de fichier non supporté. Utilisez PNG, JPEG ou PDF.');
      return;
    }
    
    setImportLoading(true);
    
    try {
      if (file.type === 'application/pdf') {
        // For PDFs, we'd normally use a PDF rendering library
        // This is simplified for demo purposes
        toast.info('Le support PDF est limité dans cette démo.');
        
        // In a real implementation, you'd convert PDF to image here
      } else {
        // For images
        const reader = new FileReader();
        
        reader.onload = (event) => {
          if (event.target?.result && canvas) {
            fabric.Image.fromURL(event.target.result.toString(), (img) => {
              // Scale down if needed
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
      }
    } catch (error) {
      console.error('Error importing file:', error);
      toast.error(`Erreur lors de l'importation`);
      setImportLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h3 className="text-xl font-bold mb-4">Éditeur de Plan</h3>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Element Library */}
        <div className="lg:w-1/4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold mb-3">Bibliothèque d'éléments</h4>
            
            <div className="space-y-3">
              {libraryElements.map(({ type, label, icon }) => (
                <div
                  key={type}
                  className="bg-white p-3 rounded-md border border-gray-200 cursor-grab hover:shadow-md transition-shadow"
                  draggable
                  onDragStart={() => handleDragStart(type)}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{icon}</span>
                    <span>{label}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Actions</h4>
              <div className="space-y-2">
                <Button 
                  onClick={handleImportClick}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  disabled={importLoading}
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Importer un plan
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={handleFileImport}
                />
                
                <Button 
                  onClick={handleSave}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
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
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                  </svg>
                  Exporter le plan
                </Button>
                
                <Button 
                  onClick={handleClear}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
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
                  Effacer le plan
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Editor Area */}
        <div className="lg:w-3/4">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg relative"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{ height: '500px' }}
          >
            <canvas ref={canvasRef} />
            
            {/* Toolbar for selected elements */}
            {selectedElement && canvas && (
              <div className="absolute top-4 right-4 bg-white shadow-md rounded-md flex p-1 z-10">
                <button
                  onClick={handleRotate}
                  className="p-2 hover:bg-gray-100 rounded"
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
                  className="p-2 hover:bg-red-100 text-red-600 rounded"
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
          
          <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h4 className="font-semibold mb-2">Instructions</h4>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li>Glissez-déposez des éléments depuis la bibliothèque vers le plan</li>
              <li>Importez un plan existant (PNG, JPEG ou PDF)</li>
              <li>Cliquez sur un élément pour le sélectionner</li>
              <li>Utilisez les boutons pour pivoter ou supprimer un élément</li>
              <li>Exportez votre plan une fois terminé</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanEditor;
