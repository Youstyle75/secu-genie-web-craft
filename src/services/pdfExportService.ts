import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportDocumentToPDF = async (document: any, signature?: any) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(document.title, margin, yPosition);
  yPosition += 10;

  // Document info
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(100, 100, 100);
  pdf.text(`Type: ${document.type}`, margin, yPosition);
  yPosition += 6;
  pdf.text(`Version: ${document.version}`, margin, yPosition);
  yPosition += 6;
  pdf.text(`Date: ${new Date(document.updated_at).toLocaleDateString('fr-FR')}`, margin, yPosition);
  yPosition += 10;

  // Separator line
  pdf.setDrawColor(200, 200, 200);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Content
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Contenu du document', margin, yPosition);
  yPosition += 8;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);

  // Content fields
  const content = document.content || {};
  Object.entries(content).forEach(([key, value]) => {
    if (yPosition > pageHeight - 30) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFont('helvetica', 'bold');
    pdf.text(`${key}:`, margin, yPosition);
    yPosition += 6;

    pdf.setFont('helvetica', 'normal');
    const lines = pdf.splitTextToSize(String(value), pageWidth - 2 * margin);
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin + 5, yPosition);
      yPosition += 5;
    });
    yPosition += 3;
  });

  // Signature
  if (signature) {
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = margin;
    }

    yPosition += 10;
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('Signature électronique', margin, yPosition);
    yPosition += 8;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(`Date: ${new Date(signature.signed_at).toLocaleString('fr-FR')}`, margin, yPosition);
    yPosition += 8;

    // Add signature image
    try {
      pdf.addImage(signature.signature_data, 'PNG', margin, yPosition, 60, 30);
    } catch (error) {
      console.error('Error adding signature image:', error);
    }
  }

  // Footer on all pages
  const totalPages = (pdf as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text(
      `Page ${i} sur ${totalPages} - Généré par Secugenie le ${new Date().toLocaleString('fr-FR')}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  pdf.save(`${document.title.replace(/\s+/g, '_')}_${Date.now()}.pdf`);
};
