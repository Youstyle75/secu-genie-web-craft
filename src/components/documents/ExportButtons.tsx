import React from 'react';
import { FileDown, FileJson, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { exportDocumentToPDF } from '@/services/pdfExportService';
import { exportToJSON, type ExportData } from '@/services/jsonExportService';
import { toast } from 'sonner';

interface ExportButtonsProps {
  documentData: ExportData;
  onExportPDF?: () => void;
  onExportJSON?: () => void;
  onExportImage?: () => void;
  className?: string;
  showImageExport?: boolean;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({
  documentData,
  onExportPDF,
  onExportJSON,
  onExportImage,
  className = '',
  showImageExport = false
}) => {
  const handlePDFExport = async () => {
    try {
      if (onExportPDF) {
        onExportPDF();
      } else {
        await exportDocumentToPDF({
          title: documentData.metadata.title,
          type: documentData.metadata.type,
          version: documentData.metadata.version,
          updatedAt: documentData.metadata.updatedAt,
          content: documentData.content,
          metadata: documentData.metadata
        });
      }
    } catch (error) {
      console.error('Export PDF error:', error);
      toast.error('Erreur lors de l\'export PDF');
    }
  };

  const handleJSONExport = () => {
    try {
      if (onExportJSON) {
        onExportJSON();
      } else {
        exportToJSON(documentData);
      }
    } catch (error) {
      console.error('Export JSON error:', error);
      toast.error('Erreur lors de l\'export JSON');
    }
  };

  const handleImageExport = () => {
    if (onExportImage) {
      onExportImage();
    } else {
      toast.info('Export d\'image disponible depuis l\'éditeur de plan');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={`gap-2 ${className}`}
        >
          <FileDown className="h-4 w-4" />
          Exporter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white z-50">
        <DropdownMenuLabel className="text-sm font-semibold">
          Formats d'export
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handlePDFExport}
          className="cursor-pointer flex items-center gap-2 hover:bg-secondary"
        >
          <FileDown className="h-4 w-4 text-danger" />
          <div className="flex-1">
            <div className="text-sm font-medium">PDF Professionnel</div>
            <div className="text-xs text-muted-foreground">
              Document formaté avec métadonnées
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={handleJSONExport}
          className="cursor-pointer flex items-center gap-2 hover:bg-secondary"
        >
          <FileJson className="h-4 w-4 text-primary" />
          <div className="flex-1">
            <div className="text-sm font-medium">JSON (API)</div>
            <div className="text-xs text-muted-foreground">
              Format pour automatisation
            </div>
          </div>
        </DropdownMenuItem>

        {showImageExport && (
          <DropdownMenuItem 
            onClick={handleImageExport}
            className="cursor-pointer flex items-center gap-2 hover:bg-secondary"
          >
            <FileImage className="h-4 w-4 text-success" />
            <div className="flex-1">
              <div className="text-sm font-medium">PNG/SVG</div>
              <div className="text-xs text-muted-foreground">
                Images haute qualité
              </div>
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportButtons;
