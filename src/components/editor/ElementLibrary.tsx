
import { useRef } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eraser, Square, Circle as CircleIcon, SeparatorHorizontal,
  Type, FileImage, Save, Trash2 
} from 'lucide-react';
import { getIconsByCategory, IconCategory } from './PlanIcons';
import DrawingTools from './DrawingTools';
import useCanvasActions from '../editor/hooks/useCanvasActions';

type ElementLibraryProps = {
  activeTab: IconCategory;
  setActiveTab: (tab: IconCategory) => void;
  handleDragStart: (type: string) => void;
  openEraseModal: () => void;
  importLoading: boolean;
  setImportLoading: (loading: boolean) => void;
};

const ElementLibrary = ({
  activeTab,
  setActiveTab,
  handleDragStart,
  openEraseModal,
  importLoading,
  setImportLoading
}: ElementLibraryProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { 
    addRectangle, 
    addCircle, 
    addLine, 
    addText,
    handleSave,
    handleClear,
    toggleDrawingMode,
    drawingMode,
    brushColor,
    setBrushColor,
    brushSize,
    setBrushSize
  } = useCanvasActions();

  // Obtenir les icônes pour chaque catégorie
  const securityIcons = getIconsByCategory('security');
  const eventIcons = getIconsByCategory('event');
  const furnitureIcons = getIconsByCategory('furniture');
  const signsIcons = getIconsByCategory('signs');
  const emergencyIcons = getIconsByCategory('emergency');
  
  // Import plan
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error('Format de fichier non supporté. Utilisez PNG, JPEG ou PDF.');
      return;
    }
    
    setImportLoading(true);
    
    try {
      if (file.type === 'application/pdf') {
        // Pour les PDFs, nous utiliserions normalement une bibliothèque de rendu PDF
        toast.info('Le support PDF est limité dans cette démo.');
        setImportLoading(false);
      } else {
        // L'importation est gérée par l'événement custom
        document.dispatchEvent(new CustomEvent('importImage', { detail: { file } }));
      }
    } catch (error) {
      console.error('Error importing file:', error);
      toast.error(`Erreur lors de l'importation`);
      setImportLoading(false);
    }
  };

  return (
    <div className="bg-dark-medium p-4 rounded-lg border border-dark-light">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as IconCategory)}>
        <TabsList className="w-full mb-4 flex overflow-x-auto bg-dark-light">
          <TabsTrigger value="security" className="flex-shrink-0 text-xs whitespace-nowrap text-dark-foreground data-[state=active]:bg-dark-medium data-[state=active]:text-accent">Sécurité</TabsTrigger>
          <TabsTrigger value="event" className="flex-shrink-0 text-xs whitespace-nowrap text-dark-foreground data-[state=active]:bg-dark-medium data-[state=active]:text-accent">Événement</TabsTrigger>
          <TabsTrigger value="furniture" className="flex-shrink-0 text-xs whitespace-nowrap text-dark-foreground data-[state=active]:bg-dark-medium data-[state=active]:text-accent">Mobilier</TabsTrigger>
          <TabsTrigger value="signs" className="flex-shrink-0 text-xs whitespace-nowrap text-dark-foreground data-[state=active]:bg-dark-medium data-[state=active]:text-accent">Signalétique</TabsTrigger>
          <TabsTrigger value="emergency" className="flex-shrink-0 text-xs whitespace-nowrap text-dark-foreground data-[state=active]:bg-dark-medium data-[state=active]:text-accent">Urgence</TabsTrigger>
        </TabsList>
        
        <TabsContent value="security">
          <h4 className="font-semibold mb-3 text-dark-foreground">Éléments de sécurité</h4>
          <div className="space-y-3">
            {securityIcons.map(({ type, label, icon }) => (
              <div
                key={type}
                className="bg-dark-light p-3 rounded-md border border-dark-medium cursor-grab hover:shadow-md transition-shadow"
                draggable
                onDragStart={() => handleDragStart(type)}
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-2 min-w-8 h-8 flex items-center text-dark-foreground">{icon}</div>
                  <span className="text-sm truncate text-dark-foreground">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="event">
          <h4 className="font-semibold mb-3 text-dark-foreground">Éléments événementiels</h4>
          <div className="space-y-3">
            {eventIcons.map(({ type, label, icon }) => (
              <div
                key={type}
                className="bg-dark-light p-3 rounded-md border border-dark-medium cursor-grab hover:shadow-md transition-shadow"
                draggable
                onDragStart={() => handleDragStart(type)}
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-2 min-w-8 h-8 flex items-center text-dark-foreground">{icon}</div>
                  <span className="text-sm truncate text-dark-foreground">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="furniture">
          <h4 className="font-semibold mb-3 text-dark-foreground">Mobilier et équipements</h4>
          <div className="space-y-3">
            {furnitureIcons.map(({ type, label, icon }) => (
              <div
                key={type}
                className="bg-dark-light p-3 rounded-md border border-dark-medium cursor-grab hover:shadow-md transition-shadow"
                draggable
                onDragStart={() => handleDragStart(type)}
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-2 min-w-8 h-8 flex items-center text-dark-foreground">{icon}</div>
                  <span className="text-sm truncate text-dark-foreground">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="signs">
          <h4 className="font-semibold mb-3 text-dark-foreground">Signalétique</h4>
          <div className="space-y-3">
            {signsIcons.map(({ type, label, icon }) => (
              <div
                key={type}
                className="bg-dark-light p-3 rounded-md border border-dark-medium cursor-grab hover:shadow-md transition-shadow"
                draggable
                onDragStart={() => handleDragStart(type)}
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-2 min-w-8 h-8 flex items-center text-dark-foreground">{icon}</div>
                  <span className="text-sm truncate text-dark-foreground">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="emergency">
          <h4 className="font-semibold mb-3 text-dark-foreground">Urgence et véhicules</h4>
          <div className="space-y-3">
            {emergencyIcons.map(({ type, label, icon }) => (
              <div
                key={type}
                className="bg-dark-light p-3 rounded-md border border-dark-medium cursor-grab hover:shadow-md transition-shadow"
                draggable
                onDragStart={() => handleDragStart(type)}
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-2 min-w-8 h-8 flex items-center text-dark-foreground">{icon}</div>
                  <span className="text-sm truncate text-dark-foreground">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6">
        <h4 className="font-semibold mb-3 text-dark-foreground">Outils de dessin</h4>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button 
            onClick={toggleDrawingMode}
            variant={drawingMode ? "default" : "outline"}
            size="sm"
            className="flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Dessin libre
          </Button>
          <Button
            onClick={openEraseModal}
            variant="outline"
            size="sm"
            className="flex items-center justify-center gap-2 text-red-500 hover:bg-red-50"
          >
            <Eraser className="w-4 h-4" />
            Effacer
          </Button>
          <Button
            onClick={addRectangle}
            variant="outline"
            size="sm"
            className="flex items-center justify-center gap-2"
          >
            <Square className="w-4 h-4" />
            Rectangle
          </Button>
          <Button
            onClick={addCircle}
            variant="outline"
            size="sm"
            className="flex items-center justify-center gap-2"
          >
            <CircleIcon className="w-4 h-4" />
            Cercle
          </Button>
          <Button
            onClick={addLine}
            variant="outline"
            size="sm"
            className="flex items-center justify-center gap-2"
          >
            <SeparatorHorizontal className="w-4 h-4" />
            Ligne
          </Button>
          <Button
            onClick={addText}
            variant="outline"
            size="sm"
            className="flex items-center justify-center gap-2"
            title="Ajouter du texte"
          >
            <Type className="w-4 h-4" />
            Texte
          </Button>
        </div>
        
        {drawingMode && (
          <DrawingTools
            drawingMode={drawingMode}
            setDrawingMode={toggleDrawingMode}
            brushColor={brushColor}
            setBrushColor={setBrushColor}
            brushSize={brushSize}
            setBrushSize={setBrushSize}
          />
        )}
      </div>
      
      <div className="mt-6">
        <h4 className="font-semibold mb-3 text-dark-foreground">Actions</h4>
        <div className="space-y-2">
          <Button 
            onClick={handleImportClick}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            disabled={importLoading}
          >
            <FileImage className="w-5 h-5" />
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
            <Save className="w-5 h-5" />
            Exporter le plan
          </Button>
          
          <Button 
            onClick={openEraseModal}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-5 h-5" />
            Effacer le plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ElementLibrary;
