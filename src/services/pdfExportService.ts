import jsPDF from 'jspdf';
import { toast } from 'sonner';

export interface PDFDocumentMetadata {
  type: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
  author?: string;
  version?: string;
  status?: string;
  reference?: string;
}

export interface PDFSignature {
  date: string;
  imageData?: string; // base64 image
  name: string;
  role: string;
}

export interface PDFDocument {
  metadata: PDFDocumentMetadata;
  content: any;
  signature?: PDFSignature;
}

/**
 * SecuGenie PDF Export Service - Conformité 2025
 * Génération de documents professionnels avec:
 * - Logo SecuGenie
 * - En-têtes et pieds de page
 * - Numérotation automatique
 * - Signature intégrée
 * - Horodatage
 */
export class PDFExportService {
  private doc: jsPDF;
  private pageHeight = 297; // A4 height in mm
  private pageWidth = 210; // A4 width in mm
  private margin = 20;
  private currentY = 20;
  private lineHeight = 7;
  
  // Colors - SecuGenie Relume Style
  private primaryColor: [number, number, number] = [230, 57, 70]; // #E63946
  private secondaryColor: [number, number, number] = [46, 204, 113]; // #2ECC71
  private textColor: [number, number, number] = [45, 55, 72]; // #2D3748
  private mutedColor: [number, number, number] = [113, 128, 150]; // #718096

  constructor() {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
  }

  /**
   * Export a complete document to PDF
   */
  async exportDocument(document: PDFDocument): Promise<void> {
    try {
      this.resetDocument();
      
      // Add header with logo
      this.addHeader(document.metadata);
      
      // Add document title
      this.addTitle(document.metadata.title);
      
      // Add metadata section
      this.addMetadata(document.metadata);
      
      // Add regulatory reference for GN6
      if (document.metadata.type === 'dossier-gn6') {
        this.addRegulatoryReference();
      }
      
      // Add content sections
      this.addContent(document.content);
      
      // Add signature if present
      if (document.signature) {
        this.addSignature(document.signature);
      }
      
      // Add footer to all pages
      this.addFooters(document.metadata);
      
      // Generate filename
      const filename = this.generateFilename(document.metadata);
      
      // Save PDF
      this.doc.save(filename);
      
      toast.success('Document exporté en PDF avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
      toast.error('Erreur lors de l\'export PDF');
    }
  }

  /**
   * Reset document for new export
   */
  private resetDocument(): void {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    this.currentY = 20;
  }

  /**
   * Add header with SecuGenie logo and document type
   */
  private addHeader(metadata: PDFDocumentMetadata): void {
    // Logo placeholder (replace with actual logo)
    this.doc.setFillColor(...this.primaryColor);
    this.doc.rect(this.margin, 10, 30, 10, 'F');
    
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(...this.primaryColor);
    this.doc.text('SecuGenie', this.margin + 35, 17);
    
    // Document type badge
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(...this.mutedColor);
    this.doc.text(metadata.type.toUpperCase(), this.pageWidth - this.margin, 17, { align: 'right' });
    
    // Separator line
    this.doc.setDrawColor(...this.primaryColor);
    this.doc.setLineWidth(0.5);
    this.doc.line(this.margin, 25, this.pageWidth - this.margin, 25);
    
    this.currentY = 35;
  }

  /**
   * Add document title
   */
  private addTitle(title: string): void {
    this.doc.setFontSize(20);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(...this.textColor);
    
    const titleLines = this.doc.splitTextToSize(title, this.pageWidth - 2 * this.margin);
    this.doc.text(titleLines, this.margin, this.currentY);
    
    this.currentY += titleLines.length * 10 + 10;
  }

  /**
   * Add metadata section
   */
  private addMetadata(metadata: PDFDocumentMetadata): void {
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(...this.mutedColor);
    
    const metadataText = [
      `Date de création: ${new Date(metadata.createdAt).toLocaleDateString('fr-FR')}`,
      metadata.author ? `Auteur: ${metadata.author}` : '',
      metadata.version ? `Version: ${metadata.version}` : '',
      metadata.reference ? `Référence: ${metadata.reference}` : '',
      metadata.status ? `Statut: ${metadata.status}` : '',
    ].filter(Boolean);
    
    metadataText.forEach((text) => {
      this.doc.text(text, this.margin, this.currentY);
      this.currentY += this.lineHeight;
    });
    
    this.currentY += 10;
  }

  /**
   * Add regulatory reference for GN6 documents
   */
  private addRegulatoryReference(): void {
    // Background box
    this.doc.setFillColor(248, 249, 250);
    this.doc.rect(this.margin, this.currentY - 5, this.pageWidth - 2 * this.margin, 25, 'F');
    
    this.doc.setFontSize(9);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(...this.textColor);
    this.doc.text('Cadre réglementaire:', this.margin + 5, this.currentY);
    
    this.currentY += this.lineHeight;
    
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(...this.mutedColor);
    const regulatoryText = [
      'Arrêté du 25 juin 1980 modifié - Article GN 6',
      'Manifestations dans les établissements de type PA et CTS',
      'Conformité: Arrêtés 01/04/2025 et 29/07/2025',
    ];
    
    regulatoryText.forEach((text) => {
      this.doc.text(text, this.margin + 5, this.currentY);
      this.currentY += this.lineHeight;
    });
    
    this.currentY += 10;
  }

  /**
   * Add document content
   */
  private addContent(content: any): void {
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(...this.textColor);
    
    // Convert content object to readable format
    this.renderContentSections(content);
  }

  /**
   * Recursively render content sections
   */
  private renderContentSections(obj: any, level: number = 0): void {
    Object.entries(obj).forEach(([key, value]) => {
      if (this.currentY > this.pageHeight - 30) {
        this.doc.addPage();
        this.currentY = 30;
      }
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Section title
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(12 - level);
        this.doc.text(this.formatKey(key), this.margin + level * 5, this.currentY);
        this.currentY += this.lineHeight + 2;
        
        this.doc.setFont('helvetica', 'normal');
        this.renderContentSections(value, level + 1);
      } else if (Array.isArray(value)) {
        this.doc.setFont('helvetica', 'bold');
        this.doc.text(`${this.formatKey(key)}:`, this.margin + level * 5, this.currentY);
        this.currentY += this.lineHeight;
        
        this.doc.setFont('helvetica', 'normal');
        value.forEach((item, index) => {
          this.doc.text(`${index + 1}. ${JSON.stringify(item)}`, this.margin + level * 5 + 5, this.currentY);
          this.currentY += this.lineHeight;
        });
      } else if (value !== null && value !== undefined && value !== '') {
        this.doc.setFont('helvetica', 'normal');
        this.doc.text(`${this.formatKey(key)}: ${value}`, this.margin + level * 5, this.currentY);
        this.currentY += this.lineHeight;
      }
    });
  }

  /**
   * Format object keys for display
   */
  private formatKey(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  /**
   * Add signature section
   */
  private addSignature(signature: PDFSignature): void {
    // Ensure we're on a new page if needed
    if (this.currentY > this.pageHeight - 70) {
      this.doc.addPage();
      this.currentY = 30;
    }
    
    this.currentY += 10;
    
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(12);
    this.doc.setTextColor(...this.textColor);
    this.doc.text('Signature', this.margin, this.currentY);
    
    this.currentY += 10;
    
    // Signature box
    this.doc.setDrawColor(...this.mutedColor);
    this.doc.setLineWidth(0.5);
    this.doc.rect(this.margin, this.currentY, 80, 40);
    
    // Add signature image if present
    if (signature.imageData) {
      try {
        this.doc.addImage(
          signature.imageData,
          'PNG',
          this.margin + 5,
          this.currentY + 5,
          70,
          30
        );
      } catch (error) {
        console.error('Error adding signature image:', error);
      }
    }
    
    this.currentY += 45;
    
    // Signature details
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);
    this.doc.text(`Nom: ${signature.name}`, this.margin, this.currentY);
    this.currentY += this.lineHeight;
    this.doc.text(`Fonction: ${signature.role}`, this.margin, this.currentY);
    this.currentY += this.lineHeight;
    this.doc.text(`Date: ${new Date(signature.date).toLocaleDateString('fr-FR')}`, this.margin, this.currentY);
  }

  /**
   * Add footer to all pages
   */
  private addFooters(metadata: PDFDocumentMetadata): void {
    const totalPages = this.doc.getNumberOfPages();
    
    for (let i = 1; i <= totalPages; i++) {
      this.doc.setPage(i);
      
      // Footer line
      this.doc.setDrawColor(...this.mutedColor);
      this.doc.setLineWidth(0.5);
      this.doc.line(this.margin, this.pageHeight - 15, this.pageWidth - this.margin, this.pageHeight - 15);
      
      // Footer text
      this.doc.setFontSize(8);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(...this.mutedColor);
      
      const footerLeft = `SecuGenie - ${metadata.type}`;
      const footerCenter = `Généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`;
      const footerRight = `Page ${i}/${totalPages}`;
      
      this.doc.text(footerLeft, this.margin, this.pageHeight - 10);
      this.doc.text(footerCenter, this.pageWidth / 2, this.pageHeight - 10, { align: 'center' });
      this.doc.text(footerRight, this.pageWidth - this.margin, this.pageHeight - 10, { align: 'right' });
    }
  }

  /**
   * Generate filename for PDF export
   */
  private generateFilename(metadata: PDFDocumentMetadata): string {
    const date = new Date(metadata.createdAt).toISOString().split('T')[0];
    const sanitizedTitle = metadata.title
      .replace(/[^a-z0-9]/gi, '-')
      .replace(/-+/g, '-')
      .toLowerCase()
      .substring(0, 50);
    
    return `secugenie-${metadata.type}-${sanitizedTitle}-${date}.pdf`;
  }
}

// Export singleton instance
export const pdfExportService = new PDFExportService();

/**
 * Quick export function for direct use (legacy compatibility)
 */
export const exportDocumentToPDF = async (document: PDFDocument): Promise<void> => {
  const service = new PDFExportService();
  await service.exportDocument(document);
};
