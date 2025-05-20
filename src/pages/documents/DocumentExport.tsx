
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { SecurityDocument, documentContentToHTML, NoticeSecuriteContent, PlanPreventionContent, GN6Content } from '@/types/securityDocument';
import { RelumeButton } from '@/components/ui/relume-button';
import { RelumeCard, RelumeCardContent, RelumeCardHeader, RelumeCardTitle } from '@/components/ui/relume-card';
import Layout from '@/components/layout/Layout';

// Import service
import securityDocumentService from '@/services/securityDocumentService';

// Type guards for content types
const isNoticeSecurite = (content: NoticeSecuriteContent | PlanPreventionContent | GN6Content): content is NoticeSecuriteContent => {
  return 'descriptionEtablissement' in content && 'moyensSecours' in content && 'consignesEvacuation' in content;
};

const isPlanPrevention = (content: NoticeSecuriteContent | PlanPreventionContent | GN6Content): content is PlanPreventionContent => {
  return 'entrepriseUtilisatrice' in content && 'entrepriseExterieure' in content && 'natureTravaux' in content;
};

const DocumentExport = () => {
  const [document, setDocument] = useState<SecurityDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      // Récupérer le document à partir du service
      const doc = securityDocumentService.getDocumentById(id);
      if (doc) {
        setDocument(doc);
      }
      setLoading(false);
    }
  }, [id]);
  
  const handleExportPDF = async () => {
    if (!document) return;
    
    setExporting(true);
    
    try {
      // Créer un conteneur temporaire pour le rendu du document
      const container = document.createElement('div');
      container.className = 'document-export-container';
      container.style.width = '210mm'; // Format A4
      container.style.padding = '15mm';
      container.style.backgroundColor = 'white';
      container.style.boxSizing = 'border-box';
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      
      document.body.appendChild(container);
      
      // Rendre le contenu du document dans le conteneur
      const htmlContent = documentContentToHTML(document);
      container.appendChild(htmlContent);
      
      // Convertir en canvas puis PDF
      const canvas = await html2canvas(container, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      
      // Télécharger le PDF
      const filename = `${document.title.replace(/\s+/g, '_')}.pdf`;
      pdf.save(filename);
      
      // Nettoyer
      document.body.removeChild(container);
      
    } catch (error) {
      console.error('Erreur lors de l\'exportation PDF:', error);
    } finally {
      setExporting(false);
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin h-12 w-12 border-4 border-accentBleu border-t-transparent rounded-full"></div>
        </div>
      </Layout>
    );
  }
  
  if (!document) {
    return (
      <Layout>
        <RelumeCard variant="flat" className="max-w-2xl mx-auto mt-8">
          <RelumeCardHeader>
            <RelumeCardTitle>Document non trouvé</RelumeCardTitle>
          </RelumeCardHeader>
          <RelumeCardContent>
            <p className="mb-4">Le document demandé n'existe pas ou a été supprimé.</p>
            <RelumeButton variant="default" onClick={() => navigate(-1)}>
              Retour
            </RelumeButton>
          </RelumeCardContent>
        </RelumeCard>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-textPrincipal">Exporter le document</h1>
          <div className="flex gap-4">
            <RelumeButton 
              variant="secondary" 
              onClick={() => navigate(`/documents/${id}`)}
            >
              Retour au document
            </RelumeButton>
            <RelumeButton 
              variant="default" 
              onClick={handleExportPDF} 
              disabled={exporting}
            >
              {exporting ? 'Export en cours...' : 'Exporter en PDF'}
            </RelumeButton>
          </div>
        </div>
        
        <RelumeCard variant="default" className="mb-8 p-8 shadow-relume-medium">
          <div className="document-preview">
            <h1 className="text-3xl font-bold mb-6 text-center border-b pb-4">{document.title}</h1>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm text-textPrincipal/70 mb-2">
                <span>Créé le: {new Date(document.createdAt).toLocaleDateString()}</span>
                <span>Type: {document.documentType}</span>
              </div>
              <div className="flex justify-between text-sm text-textPrincipal/70">
                <span>Statut: {document.status}</span>
                <span>Version: {document.version || "1.0"}</span>
              </div>
            </div>
            
            <div className="document-content space-y-8">
              {document.documentType === 'NoticeSecurite' && isNoticeSecurite(document.content) && (
                <>
                  <section>
                    <h2 className="text-xl font-semibold mb-2 text-accentBleu">Description de l'établissement</h2>
                    <div className="bg-formBackground p-4 rounded-lg border border-formBorder">
                      {document.content.descriptionEtablissement || 'Non spécifié'}
                    </div>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-semibold mb-2 text-accentBleu">Moyens de secours</h2>
                    <div className="bg-formBackground p-4 rounded-lg border border-formBorder">
                      {document.content.moyensSecours || 'Non spécifié'}
                    </div>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-semibold mb-2 text-accentBleu">Consignes d'évacuation</h2>
                    <div className="bg-formBackground p-4 rounded-lg border border-formBorder">
                      {document.content.consignesEvacuation || 'Non spécifié'}
                    </div>
                  </section>
                </>
              )}
              
              {document.documentType === 'PlanPrevention' && isPlanPrevention(document.content) && (
                <>
                  <section>
                    <h2 className="text-xl font-semibold mb-2 text-accentBleu">Entreprise utilisatrice</h2>
                    <div className="bg-formBackground p-4 rounded-lg border border-formBorder">
                      {document.content.entrepriseUtilisatrice || 'Non spécifié'}
                    </div>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-semibold mb-2 text-accentBleu">Entreprise extérieure</h2>
                    <div className="bg-formBackground p-4 rounded-lg border border-formBorder">
                      {document.content.entrepriseExterieure || 'Non spécifié'}
                    </div>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-semibold mb-2 text-accentBleu">Nature des travaux</h2>
                    <div className="bg-formBackground p-4 rounded-lg border border-formBorder">
                      {document.content.natureTravaux || 'Non spécifié'}
                    </div>
                  </section>
                </>
              )}
            </div>
            
            {document.status === 'signe' && (
              <div className="mt-12 border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Document signé</h3>
                <div className="flex justify-end">
                  <div className="signature-placeholder w-64 h-24 border border-dashed border-accentBleu rounded-md flex items-center justify-center">
                    <p className="text-sm text-accentBleu">Signature électronique</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </RelumeCard>
        
        <div className="flex justify-center gap-4">
          <RelumeButton 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            Annuler
          </RelumeButton>
          <RelumeButton 
            variant="default" 
            onClick={handleExportPDF} 
            disabled={exporting}
          >
            {exporting ? 'Export en cours...' : 'Exporter en PDF'}
          </RelumeButton>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentExport;
