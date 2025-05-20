import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Layout from '@/components/layout/Layout';
import { SecurityDocument } from '@/types/securityDocument';
import { toast } from 'sonner';

const DocumentExport = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<SecurityDocument | null>(null);

  useEffect(() => {
    if (!id) {
      console.error("Document ID is missing.");
      return;
    }

    // Mock fetch function to simulate API call
    const fetchDocument = async (documentId: string): Promise<SecurityDocument> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Mock data for demonstration
          const mockDocument: SecurityDocument = {
            id: documentId,
            title: 'Mock Document Title',
            documentType: 'NoticeSecurite',
            status: 'brouillon',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'mockUserId',
            establishmentId: 'mockEstablishmentId',
            content: {
              descriptionEtablissement: 'This is a mock establishment description.',
              moyensSecours: 'Mock emergency resources',
              consignesEvacuation: 'Mock evacuation instructions',
            },
            createElement: (tag: string) => document.createElement(tag),
            getElementById: (elementId: string) => document.getElementById(elementId),
            body: document.body,
          };
          resolve(mockDocument);
        }, 500);
      });
    };

    fetchDocument(id)
      .then(setDocument)
      .catch((error) => {
        console.error("Failed to fetch document:", error);
        toast.error("Failed to load document");
      });
  }, [id]);

  const exportDocumentToPdf = async () => {
    if (!document) {
      toast.error("Document not loaded yet.");
      return;
    }

    try {
      const container = document.createElement ? document.createElement('div') : document.content;
      if (document.body) document.body.appendChild(container);
      container.innerHTML = `
        <div style="padding: 20px; font-family: 'Arial', sans-serif;">
          <h1 style="font-size: 24px; color: #333; margin-bottom: 20px;">${document.title}</h1>
          <p style="font-size: 16px; color: #666;">${document.content.descriptionEtablissement}</p>
          <h2 style="font-size: 20px; color: #333; margin-top: 30px; margin-bottom: 10px;">Emergency Resources</h2>
          <p style="font-size: 16px; color: #666;">${document.content.moyensSecours}</p>
          <h2 style="font-size: 20px; color: #333; margin-top: 30px; margin-bottom: 10px;">Evacuation Instructions</h2>
          <p style="font-size: 16px; color: #666;">${document.content.consignesEvacuation}</p>
        </div>
      `;

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${document.title}.pdf`);

      if (document.body) document.body.removeChild(container);
      toast.success("Document exported successfully!");
    } catch (error) {
      console.error("Error exporting document:", error);
      toast.error("Failed to export document.");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Export Document</h1>
        {document ? (
          <div>
            <h2 className="text-xl mb-2">{document.title}</h2>
            <button
              onClick={exportDocumentToPdf}
              className="bg-accentBleu hover:bg-accentBleu/80 text-white font-bold py-2 px-4 rounded"
            >
              Export to PDF
            </button>
          </div>
        ) : (
          <p>Loading document...</p>
        )}
      </div>
    </Layout>
  );
};

export default DocumentExport;
