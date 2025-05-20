
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { RelumeButton } from '@/components/ui/relume-button';
import { RelumeCard, RelumeCardContent, RelumeCardHeader, RelumeCardTitle } from '@/components/ui/relume-card';
import { SecurityDocument, Comment } from '@/types/securityDocument';

// Import service
import securityDocumentService from '@/services/securityDocumentService';

const DocumentReview = () => {
  const [document, setDocument] = useState<SecurityDocument | null>(null);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('content'); // 'content' ou 'comments'
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      // Récupérer le document à partir du service
      const doc = securityDocumentService.getDocumentById(id);
      if (doc) {
        // S'assurer que le document a un tableau de commentaires
        if (!doc.comments) {
          doc.comments = [];
        }
        setDocument(doc);
      }
      setLoading(false);
    }
  }, [id]);
  
  const handleApproveDocument = () => {
    if (!document || !id) return;
    
    const updatedDoc = securityDocumentService.updateDocument(id, {
      status: 'valide',
      updatedAt: new Date()
    });
    
    if (updatedDoc) {
      setDocument(updatedDoc);
    }
  };
  
  const handleRejectDocument = () => {
    if (!document || !id) return;
    
    const updatedDoc = securityDocumentService.updateDocument(id, {
      status: 'brouillon',
      updatedAt: new Date()
    });
    
    if (updatedDoc) {
      setDocument(updatedDoc);
    }
  };
  
  const handleAddComment = () => {
    if (!newComment.trim() || !document || !id) return;
    
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      authorId: 'current-user', // Dans une vraie application, cela viendrait de l'utilisateur connecté
      authorName: 'Utilisateur',
      content: newComment,
      timestamp: new Date(),
      resolved: false
    };
    
    const updatedComments = [...(document.comments || []), comment];
    const updatedDoc = securityDocumentService.updateDocument(id, {
      comments: updatedComments,
      updatedAt: new Date()
    });
    
    if (updatedDoc) {
      setDocument(updatedDoc);
      setNewComment('');
    }
  };
  
  const handleSignDocument = () => {
    if (!id) return;
    navigate(`/documents/${id}/sign`);
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-textPrincipal">{document.title}</h1>
            <p className="text-textPrincipal/70">
              Statut: <span className="font-medium">{document.status}</span> | 
              Type: <span className="font-medium">{document.documentType}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <RelumeButton variant="outline" onClick={() => navigate(-1)}>
              Retour
            </RelumeButton>
            {document.status === 'relecture' && (
              <>
                <RelumeButton variant="destructive" onClick={handleRejectDocument}>
                  Rejeter
                </RelumeButton>
                <RelumeButton variant="default" onClick={handleApproveDocument}>
                  Approuver
                </RelumeButton>
              </>
            )}
            {document.status === 'valide' && (
              <RelumeButton variant="default" onClick={handleSignDocument}>
                Signer
              </RelumeButton>
            )}
            {document.status === 'signe' && (
              <RelumeButton variant="default" onClick={() => navigate(`/documents/${id}/export`)}>
                Exporter
              </RelumeButton>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <div className="border-b border-formBorder">
            <nav className="flex gap-4">
              <button
                className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'content' ? 'border-accentBleu text-accentBleu' : 'border-transparent hover:border-formBorder text-textPrincipal/70'
                }`}
                onClick={() => setActiveTab('content')}
              >
                Contenu
              </button>
              <button
                className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'comments' ? 'border-accentBleu text-accentBleu' : 'border-transparent hover:border-formBorder text-textPrincipal/70'
                }`}
                onClick={() => setActiveTab('comments')}
              >
                Commentaires ({document.comments?.length || 0})
              </button>
            </nav>
          </div>
        </div>
        
        {activeTab === 'content' && (
          <RelumeCard variant="default" className="mb-8">
            <div className="document-content p-6 space-y-8">
              {document.documentType === 'NoticeSecurite' && (
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
                  
                  {document.content.preventionIncendie && (
                    <section>
                      <h2 className="text-xl font-semibold mb-2 text-accentBleu">Prévention incendie</h2>
                      <div className="bg-formBackground p-4 rounded-lg border border-formBorder">
                        {document.content.preventionIncendie}
                      </div>
                    </section>
                  )}
                </>
              )}
              
              {/* Autres types de documents... */}
            </div>
          </RelumeCard>
        )}
        
        {activeTab === 'comments' && (
          <div className="mb-8">
            <div className="comments-section space-y-6">
              {document.comments && document.comments.length > 0 ? (
                document.comments.map(comment => (
                  <RelumeCard key={comment.id} variant="flat" className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-textPrincipal">{comment.authorName}</div>
                      <div className="text-sm text-textPrincipal/60">
                        {new Date(comment.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <p className="text-textPrincipal">{comment.content}</p>
                    {comment.targetField && (
                      <div className="mt-2 text-sm text-textPrincipal/70">
                        Section: <span className="font-medium">{comment.targetField}</span>
                      </div>
                    )}
                  </RelumeCard>
                ))
              ) : (
                <div className="text-center text-textPrincipal/70 py-8">
                  Aucun commentaire pour ce document.
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3 text-textPrincipal">Ajouter un commentaire</h3>
              <div className="mb-4">
                <textarea
                  className="w-full border border-formBorder rounded-lg p-3 bg-formBackground text-textPrincipal min-h-[120px]"
                  placeholder="Écrivez votre commentaire ici..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
              </div>
              <RelumeButton variant="default" onClick={handleAddComment}>
                Envoyer le commentaire
              </RelumeButton>
            </div>
          </div>
        )}
        
        <div className="flex justify-end gap-3">
          <RelumeButton variant="outline" onClick={() => navigate(-1)}>
            Retour
          </RelumeButton>
          <RelumeButton 
            variant="default" 
            onClick={() => navigate(`/documents/${id}/export`)}
            disabled={document.status !== 'signe'}
          >
            Exporter
          </RelumeButton>
        </div>
        
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

export default DocumentReview;
