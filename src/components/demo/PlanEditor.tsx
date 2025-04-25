
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

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
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Library elements info
  const libraryElements = [
    { type: 'extinguisher', label: 'Extincteur', icon: '🧯' },
    { type: 'exit', label: 'Sortie de Secours', icon: '🚪' },
    { type: 'assembly', label: 'Point de Rassemblement', icon: '👥' },
    { type: 'firstaid', label: 'Trousse de Secours', icon: '🩹' },
  ] as const;
  
  // Handle dragging from library
  const handleDragStart = (type: EditorElement['type']) => {
    setDraggedType(type);
  };
  
  // Handle dropping on the plan
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (!draggedType || !editorRef.current) return;
    
    const rect = editorRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Add new element
    const newElement: EditorElement = {
      id: `${draggedType}-${Date.now()}`,
      type: draggedType,
      x,
      y,
      rotation: 0,
    };
    
    setElements((prev) => [...prev, newElement]);
    setDraggedType(null);
    
    toast.success(`${getElementLabel(draggedType)} ajouté au plan`);
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
  
  // Handle element click
  const handleElementClick = (id: string) => {
    setSelectedElement(id === selectedElement ? null : id);
  };
  
  // Handle element drag
  const handleElementDrag = (e: React.MouseEvent, id: string) => {
    if (!selectedElement || selectedElement !== id || !editorRef.current) return;
    
    setIsDragging(true);
    
    const moveHandler = (moveEvent: MouseEvent) => {
      const rect = editorRef.current!.getBoundingClientRect();
      const x = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      const y = ((moveEvent.clientY - rect.top) / rect.height) * 100;
      
      setElements(prev =>
        prev.map(el =>
          el.id === id ? { ...el, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) } : el
        )
      );
    };
    
    const upHandler = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
      
      toast.info(`Position de l'élément mise à jour`);
    };
    
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
  };
  
  // Handle rotation
  const handleRotate = (id: string) => {
    setElements(prev =>
      prev.map(el =>
        el.id === id ? { ...el, rotation: (el.rotation + 90) % 360 } : el
      )
    );
    
    toast.info(`Élément pivoté`);
  };
  
  // Handle element removal
  const handleRemove = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
    
    toast.success(`Élément supprimé du plan`);
  };
  
  // Clear all elements
  const handleClear = () => {
    if (elements.length === 0) return;
    
    if (window.confirm('Êtes-vous sûr de vouloir supprimer tous les éléments du plan ?')) {
      setElements([]);
      setSelectedElement(null);
      
      toast.success(`Plan effacé`);
    }
  };
  
  // Save the plan
  const handleSave = () => {
    // In a real implementation, this would save to a server/database
    // For demo purposes, we just show a success toast
    toast.success(`Plan sauvegardé avec succès !`);
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
                <button
                  onClick={handleClear}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded transition-colors"
                >
                  Effacer le plan
                </button>
                <button
                  onClick={handleSave}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded transition-colors"
                >
                  Sauvegarder le plan
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Editor Area */}
        <div className="lg:w-3/4">
          <div
            ref={editorRef}
            className="bg-secondary border-2 border-dashed border-gray-300 h-[500px] rounded-lg relative"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {/* Grid background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
            
            {/* Placeholder text when empty */}
            {elements.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                <svg
                  className="w-12 h-12 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p>Glissez-déposez des éléments depuis la bibliothèque</p>
              </div>
            )}
            
            {/* Placed Elements */}
            {elements.map((element) => (
              <div
                key={element.id}
                className={`absolute cursor-pointer transition-transform ${
                  selectedElement === element.id ? 'ring-2 ring-accent' : ''
                }`}
                style={{
                  left: `${element.x}%`,
                  top: `${element.y}%`,
                  transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
                  zIndex: selectedElement === element.id ? 10 : 1,
                }}
                onClick={() => handleElementClick(element.id)}
                onMouseDown={(e) => handleElementDrag(e, element.id)}
              >
                <div className="text-3xl select-none">{getElementIcon(element.type)}</div>
                
                {/* Controls when selected */}
                {selectedElement === element.id && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white shadow-md rounded-md flex p-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRotate(element.id);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(element.id);
                      }}
                      className="p-1 hover:bg-red-100 text-red-600 rounded"
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
            ))}
          </div>
          
          <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h4 className="font-semibold mb-2">Instructions</h4>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li>Glissez-déposez des éléments depuis la bibliothèque vers le plan</li>
              <li>Cliquez sur un élément pour le sélectionner</li>
              <li>Déplacez les éléments sélectionnés en maintenant le clic</li>
              <li>Utilisez les boutons pour pivoter ou supprimer un élément</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanEditor;
