
import { useState } from 'react';
import PlanEditorCanvas from './PlanEditorCanvas';
import ElementLibrary from './ElementLibrary';
import InstructionsPanel from './InstructionsPanel';
import EraseToolModal from './EraseToolModal';
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

  return (
    <div className="bg-dark-light rounded-lg shadow-md p-4 md:p-6 relative">
      <h3 className="text-xl font-bold mb-4 text-dark-foreground">Éditeur de Plan Avancé</h3>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Element Library */}
        <div className="lg:w-1/4">
          <ElementLibrary 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleDragStart={(type) => setDraggedType(type)}
            openEraseModal={() => setIsEraseModalOpen(true)}
            importLoading={importLoading}
            setImportLoading={setImportLoading}
          />
        </div>
        
        {/* Editor Area */}
        <div className="lg:w-3/4">
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
