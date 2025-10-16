
import { useRef } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eraser, Square, Circle as CircleIcon, SeparatorHorizontal,
  Type, FileImage, Save, Trash2, MoveUpRight, Hexagon, FileDown
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
    addArrow,
    addPolyline,
    addColoredZone,
    addText,
    handleSave,
    handleClear,
    toggleDrawingMode,
    exportSVG,
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
    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-lg">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as IconCategory)}>
        <TabsList className="w-full mb-4 flex overflow-x-auto bg-gray-100 rounded-lg p-1">
          <TabsTrigger value="security" className="flex-shrink-0 text-xs whitespace-nowrap text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md transition-all">Sécurité</TabsTrigger>
          <TabsTrigger value="event" className="flex-shrink-0 text-xs whitespace-nowrap text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md transition-all">Événement</TabsTrigger>
          <TabsTrigger value="furniture" className="flex-shrink-0 text-xs whitespace-nowrap text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md transition-all">Mobilier</TabsTrigger>
          <TabsTrigger value="signs" className="flex-shrink-0 text-xs whitespace-nowrap text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md transition-all">Signalétique</TabsTrigger>
          <TabsTrigger value="emergency" className="flex-shrink-0 text-xs whitespace-nowrap text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md transition-all">Urgence</TabsTrigger>
        </TabsList>
        
        <TabsContent value="security">
          <h4 className="font-semibold mb-3 text-sm text-gray-700">Éléments de sécurité</h4>
          <div className="space-y-2">
            {securityIcons.map(({ type, label, icon }) => (
              <div
                key={type}
                className="bg-white/80 p-3 rounded-lg border border-gray-200 cursor-grab hover:shadow-md hover:border-blue-300 transition-all active:scale-95"
                draggable
                onDragStart={() => handleDragStart(type)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl min-w-8 h-8 flex items-center text-gray-700">{icon}</div>
                  <span className="text-sm truncate text-gray-700 font-medium">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="event">
          <h4 className="font-semibold mb-3 text-sm text-gray-700">Éléments événementiels</h4>
          <div className="space-y-2">
            {eventIcons.map(({ type, label, icon }) => (
              <div
                key={type}
                className="bg-white/80 p-3 rounded-lg border border-gray-200 cursor-grab hover:shadow-md hover:border-blue-300 transition-all active:scale-95"
                draggable
                onDragStart={() => handleDragStart(type)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl min-w-8 h-8 flex items-center text-gray-700">{icon}</div>
                  <span className="text-sm truncate text-gray-700 font-medium">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="furniture">
          <h4 className="font-semibold mb-3 text-sm text-gray-700">Mobilier et équipements</h4>
          <div className="space-y-2">
            {furnitureIcons.map(({ type, label, icon }) => (
              <div
                key={type}
                className="bg-white/80 p-3 rounded-lg border border-gray-200 cursor-grab hover:shadow-md hover:border-blue-300 transition-all active:scale-95"
                draggable
                onDragStart={() => handleDragStart(type)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl min-w-8 h-8 flex items-center text-gray-700">{icon}</div>
                  <span className="text-sm truncate text-gray-700 font-medium">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="signs">
          <h4 className="font-semibold mb-3 text-sm text-gray-700">Signalétique</h4>
          <div className="space-y-2">
            {signsIcons.map(({ type, label, icon }) => (
              <div
                key={type}
                className="bg-white/80 p-3 rounded-lg border border-gray-200 cursor-grab hover:shadow-md hover:border-blue-300 transition-all active:scale-95"
                draggable
                onDragStart={() => handleDragStart(type)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl min-w-8 h-8 flex items-center text-gray-700">{icon}</div>
                  <span className="text-sm truncate text-gray-700 font-medium">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="emergency">
          <h4 className="font-semibold mb-3 text-sm text-gray-700">Urgence et véhicules</h4>
          <div className="space-y-2">
            {emergencyIcons.map(({ type, label, icon }) => (
              <div
                key={type}
                className="bg-white/80 p-3 rounded-lg border border-gray-200 cursor-grab hover:shadow-md hover:border-blue-300 transition-all active:scale-95"
                draggable
                onDragStart={() => handleDragStart(type)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl min-w-8 h-8 flex items-center text-gray-700">{icon}</div>
                  <span className="text-sm truncate text-gray-700 font-medium">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6">
        <h4 className="font-semibold mb-3 text-sm text-gray-700">Outils de dessin</h4>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button 
            onClick={toggleDrawingMode}
            variant={drawingMode ? "default" : "outline"}
            size="sm"
            className="flex items-center justify-center gap-2 rounded-lg shadow-sm hover:shadow-md transition-all"
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
            <span className="text-xs">Dessin</span>
          </Button>
          <Button
            onClick={addRectangle}
            variant="outline"
            size="sm"
            className="flex items-center justify-center gap-2 rounded-lg shadow-sm hover:shadow-md transition-all hover:border-blue-300"
          >
            <Square className="w-4 h-4" />
            <span className="text-xs">Rectangle</span>
          </Button>
          <Button
            onClick={addCircle}
            variant="outline"
            size="sm"
            className="flex items-center justify-center gap-2 rounded-lg shadow-sm hover:shadow-md transition-all hover:border-green-300"
          >
            <CircleIcon className="w-4 h-4" />
            <span className="text-xs">Cercle</span>
          </Button>
          <Button
            onClick={addLine}
            variant="outline"
            size="sm"
            className="flex items-center justify-center gap-2 rounded-lg shadow-sm hover:shadow-md transition-all hover:border-gray-300"
          >
            <SeparatorHorizontal className="w-4 h-4" />
            <span className="text-xs">Ligne</span>
          </Button>
          <Button
            onClick={addArrow}
            variant="outline"
            size="sm"
            className="flex items-center justify-center gap-2 rounded-lg shadow-sm hover:shadow-md transition-all hover:border-red-300"
          >
            <MoveUpRight className="w-4 h-4" />
            <span className="text-xs">Flèche</span>
          </Button>
          <Button
            onClick={addPolyline}
            variant="outline"
            size="sm"
            className="flex items-center justify-center gap-2 rounded-lg shadow-sm hover:shadow-md transition-all hover:border-blue-300"
          >
            <Hexagon className="w-4 h-4" />
            <span className="text-xs">Polyligne</span>
          </Button>
          <Button
            onClick={addColoredZone}
            variant="outline"
            size="sm"
            className="flex items-center justify-center gap-2 rounded-lg shadow-sm hover:shadow-md transition-all hover:border-gray-300"
          >
            <Square className="w-4 h-4 opacity-50" />
            <span className="text-xs">Zone</span>
          </Button>
          <Button
            onClick={addText}
            variant="outline"
            size="sm"
            className="flex items-center justify-center gap-2 rounded-lg shadow-sm hover:shadow-md transition-all hover:border-gray-300"
            title="Ajouter du texte"
          >
            <Type className="w-4 h-4" />
            <span className="text-xs">Texte</span>
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
        <h4 className="font-semibold mb-3 text-sm text-gray-700">Import & Export</h4>
        <div className="space-y-2">
          <Button 
            onClick={handleImportClick}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 rounded-lg shadow-sm hover:shadow-md transition-all"
            disabled={importLoading}
          >
            <FileImage className="w-4 h-4" />
            <span className="text-sm">Importer un plan</span>
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleFileImport}
          />
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={handleSave}
              variant="outline"
              className="flex items-center justify-center gap-1 rounded-lg shadow-sm hover:shadow-md transition-all text-xs"
            >
              <Save className="w-3.5 h-3.5" />
              PNG
            </Button>
            <Button 
              onClick={exportSVG}
              variant="outline"
              className="flex items-center justify-center gap-1 rounded-lg shadow-sm hover:shadow-md transition-all text-xs"
            >
              <FileDown className="w-3.5 h-3.5" />
              SVG
            </Button>
          </div>
          
          <Button 
            onClick={openEraseModal}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Effacer tout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ElementLibrary;
