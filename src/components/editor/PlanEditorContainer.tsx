
import { useState, useMemo } from 'react';
import PlanEditorCanvas from './PlanEditorCanvas';
import ElementLibrary from './ElementLibrary';
import InstructionsPanel from './InstructionsPanel';
import EraseToolModal from './EraseToolModal';
import DrawingLegend from './DrawingLegend';
import AIAssistantWidget from '../ai/AIAssistantWidget';
import { IconCategory } from './PlanIcons';
import { EditorElement } from './types';

const PlanEditorContainer = () => {
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedType, setDraggedType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<IconCategory>('security');
  const [isEraseModalOpen, setIsEraseModalOpen] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  
  // Track used icons for legend
  const usedIcons = useMemo(() => {
    return new Set(elements.map(el => el.type));
  }, [elements]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl p-6 md:p-8 relative editor-component border border-gray-200">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Éditeur de Plan Avancé</h3>
        <p className="text-sm text-gray-600">Créez des plans de sécurité professionnels avec outils et icônes</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Element Library */}
        <div className="lg:w-1/4 space-y-4">
          <ElementLibrary 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleDragStart={(type) => setDraggedType(type)}
            openEraseModal={() => setIsEraseModalOpen(true)}
            importLoading={importLoading}
            setImportLoading={setImportLoading}
          />
          
          {/* Dynamic Legend */}
          {usedIcons.size > 0 && (
            <DrawingLegend usedIcons={usedIcons} />
          )}
        </div>
        
        {/* Editor Area */}
        <div className="lg:w-3/4 space-y-4">
          <PlanEditorCanvas 
            elements={elements}
            setElements={setElements}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            draggedType={draggedType}
            setDraggedType={setDraggedType}
            importLoading={importLoading}
            setImportLoading={setImportLoading}
          />
          
          <InstructionsPanel />
        </div>
      </div>
      
      {/* Modal de suppression */}
      <EraseToolModal 
        isOpen={isEraseModalOpen}
        onClose={() => setIsEraseModalOpen(false)}
        onEraseSelected={() => {
          if (selectedElement) {
            // This is handled in the canvas component
            document.dispatchEvent(new CustomEvent('eraseSelected'));
          }
        }}
        onEraseAll={() => {
          document.dispatchEvent(new CustomEvent('eraseAll'));
        }}
      />
      
      {/* Widget Assistant IA */}
      <AIAssistantWidget context="editeur-plan" />
    </div>
  );
};

export default PlanEditorContainer;
