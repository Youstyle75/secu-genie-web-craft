
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { RelumeButton } from '@/components/ui/relume-button';
import { RelumeCard, RelumeCardContent, RelumeCardHeader, RelumeCardTitle } from '@/components/ui/relume-card';
import SignaturePad from '@/components/documents/SignaturePad';
import { SecurityDocument } from '@/types/securityDocument';

// Import service
import securityDocumentService from '@/services/securityDocumentService';

const DocumentSign = () => {
  const [document, setDocument] = useState<SecurityDocument | null>(null);
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [signerName, setSignerName] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
  
  const handleSignatureChange = (dataUrl: string) => {
    setSignatureImage(dataUrl);
  };
  
  const handleSubmitSignature = () => {
    if (!document || !id || !signatureImage || !signerName) return;
    
    setSubmitting(true);
    
    // Simuler un délai d'envoi (dans une vraie application, ce serait un appel API)
    setTimeout(() => {
      // Mettre à jour le document avec la signature
      const updatedDoc = securityDocumentService.updateDocument(id, {
        status: 'signe',
        updatedAt: new Date(),
      });
      
      if (updatedDoc) {
        setDocument(updatedDoc);
        
        // Rediriger vers la page d'export du document
        navigate(`/documents/${id}/export`);
      } else {
        // Gérer l'erreur
        setSubmitting(false);
      }
    }, 1000);
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
          <h1 className="text-3xl font-bold text-textPrincipal">Signature du document</h1>
          <RelumeButton variant="outline" onClick={() => navigate(-1)}>
            Retour
          </RelumeButton>
        </div>
        
        <RelumeCard variant="default" className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-textPrincipal">{document.title}</h2>
            
            <div className="document-summary mb-8">
              <h3 className="text-lg font-medium mb-3 text-accentBleu">Résumé du document</h3>
              
              <div className="bg-formBackground p-4 rounded-lg border border-formBorder mb-4">
                {document.documentType === 'NoticeSecurite' && (
                  <>
                    <div className="mb-2">
                      <span className="font-medium">Type de document:</span> Notice de Sécurité
                    </div>
                    <div className="mb-2">
                      <span className="font-medium">Description de l'établissement:</span> {document.content.descriptionEtablissement?.substring(0, 100)}...
                    </div>
                    {document.content.preventionIncendie && (
                      <div className="mb-2">
                        <span className="font-medium">Prévention incendie:</span> {document.content.preventionIncendie?.substring(0, 100)}...
                      </div>
                    )}
                  </>
                )}
                
                {/* Autres types de documents... */}
              </div>
              
              <div className="text-accentBleu/90 text-sm">
                En signant ce document, vous certifiez avoir pris connaissance de son contenu et vous vous engagez à respecter les consignes qui y sont énoncées.
              </div>
            </div>
            
            <div className="signature-section space-y-6">
              <h3 className="text-lg font-medium mb-1 text-accentBleu">Votre signature</h3>
              
              <div className="mb-4">
                <label htmlFor="signerName" className="block text-sm font-medium mb-1 text-textPrincipal">
                  Nom du signataire
                </label>
                <input
                  type="text"
                  id="signerName"
                  className="w-full border border-formBorder rounded-md p-2.5 bg-formBackground text-textPrincipal"
                  placeholder="Saisissez votre nom complet"
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                  required
                />
              </div>
              
              <div className="signature-pad-container border border-formBorder rounded-lg overflow-hidden">
                <SignaturePad onSignatureChange={handleSignatureChange} />
              </div>
              
              <div className="flex justify-end gap-3">
                <RelumeButton
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Annuler
                </RelumeButton>
                <RelumeButton
                  variant="default"
                  onClick={handleSubmitSignature}
                  disabled={!signatureImage || !signerName || submitting}
                >
                  {submitting ? 'Enregistrement...' : 'Valider la signature'}
                </RelumeButton>
              </div>
            </div>
          </div>
        </RelumeCard>
        
        <div className="mt-8 border-t pt-4 border-formBorder">
          <div className="flex justify-between items-center text-sm text-textPrincipal/70">
            <div>
              Créé le: {new Date(document.createdAt).toLocaleDateString()}
            </div>
            <div>
              Version: {document.version || "1.0"}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentSign;
