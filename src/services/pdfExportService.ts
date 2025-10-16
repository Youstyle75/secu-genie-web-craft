import jsPDF from 'jspdf';
import { toast } from 'sonner';
import { generateFileName, type DocumentMetadata } from './jsonExportService';

interface PDFDocument {
  title: string;
  type: string;
  version?: string;
  updatedAt?: string;
  content: any;
  metadata?: DocumentMetadata;
}

interface PDFSignature {
  date: string;
  imageData: string;
  name?: string;
  role?: string;
}

/**
 * Export document to professional PDF with proper formatting
 */
export const exportDocumentToPDF = async (
  document: PDFDocument, 
  signature?: PDFSignature
): Promise<void> => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (2 * margin);
    let yPosition = margin;

    // Add SecuGenie Logo/Header
    pdf.setFillColor(37, 99, 235); // Primary blue
    pdf.rect(0, 0, pageWidth, 15, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SecuGenie', margin, 10);
    
    yPosition = 25;
    pdf.setTextColor(0, 0, 0);

    // Document Title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    const titleLines = pdf.splitTextToSize(document.title, contentWidth);
    pdf.text(titleLines, margin, yPosition);
    yPosition += titleLines.length * 8;

    // Metadata Section
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 116, 139); // Muted gray
    
    const metadataY = yPosition + 5;
    pdf.text(`Type: ${document.type}`, margin, metadataY);
    
    if (document.version) {
      pdf.text(`Version: ${document.version}`, margin, metadataY + 5);
    }
    
    if (document.updatedAt) {
      const formattedDate = new Date(document.updatedAt).toLocaleDateString('fr-FR');
      pdf.text(`Date: ${formattedDate}`, margin, metadataY + (document.version ? 10 : 5));
    }
    
    if (document.metadata?.author) {
      pdf.text(`Auteur: ${document.metadata.author}`, margin, metadataY + 15);
    }

    // Separator line
    yPosition = metadataY + 25;
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    
    yPosition += 10;
    pdf.setTextColor(0, 0, 0);

    // Document Content
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    
    const contentText = typeof document.content === 'string' 
      ? document.content 
      : JSON.stringify(document.content, null, 2);
    
    const contentLines = pdf.splitTextToSize(contentText, contentWidth);
    
    for (let i = 0; i < contentLines.length; i++) {
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = margin;
      }
      
      pdf.text(contentLines[i], margin, yPosition);
      yPosition += 6;
    }

    // Signature Section
    if (signature) {
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin;
      } else {
        yPosition += 10;
      }

      pdf.setDrawColor(226, 232, 240);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Signature', margin, yPosition);
      yPosition += 10;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      
      if (signature.name) {
        pdf.text(`Signataire: ${signature.name}`, margin, yPosition);
        yPosition += 5;
      }
      
      if (signature.role) {
        pdf.text(`Fonction: ${signature.role}`, margin, yPosition);
        yPosition += 5;
      }
      
      const signatureDate = new Date(signature.date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      pdf.text(`Date: ${signatureDate}`, margin, yPosition);
      yPosition += 10;

      try {
        pdf.addImage(signature.imageData, 'PNG', margin, yPosition, 50, 25);
      } catch (error) {
        console.error('Error adding signature image:', error);
      }
    }

    // Footer on all pages
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(148, 163, 184);
      pdf.setFont('helvetica', 'normal');
      
      const footerText = `SecuGenie - Document généré le ${new Date().toLocaleDateString('fr-FR')}`;
      const footerY = pageHeight - 10;
      pdf.text(footerText, margin, footerY);
      pdf.text(`Page ${i} sur ${pageCount}`, pageWidth - margin - 20, footerY);
    }

    // Generate filename and save
    const fileName = document.metadata 
      ? generateFileName(document.metadata, 'pdf')
      : `secugenie-${document.type}-${new Date().toISOString().split('T')[0]}.pdf`;

    pdf.save(fileName);
    toast.success('Document PDF exporté avec succès');
    
  } catch (error) {
    console.error('Error exporting document to PDF:', error);
    toast.error('Erreur lors de l\'export PDF');
    throw error;
  }
};
