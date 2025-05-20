
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Edit, Check, AlertTriangle, MessageSquare, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Layout from '@/components/layout/Layout';
import { SecurityDocument, Comment } from '@/types/securityDocument';

const DocumentReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [document, setDocument] = useState<SecurityDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  
  useEffect(() => {
    // Simuler le chargement du document
    const fetchDocument = async () => {
      try {
        setIsLoading(true);
        // Dans un environnement réel, on ferait un appel API ici
        setTimeout(() => {
          // Document simulé
          const mockDocument: SecurityDocument = {
            id: id || 'mock-id',
            title: 'Notice de Sécurité - Salle des fêtes de Paris',
            documentType: 'NoticeSecurite',
            status: 'relecture',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'user-123',
            establishmentId: 'establishment-456',
            version: 1,
            content: {
              descriptionEtablissement: 'Établissement recevant du public de type L (salle de spectacle) de 3ème catégorie permettant l\'accueil jusqu\'à 500 personnes. Bâtiment principal sur deux niveaux avec accès direct sur la voie publique par 3 issues de secours principales.',
              moyensSecours: 'Conformément à la réglementation pour les ERP de type L de 3ème catégorie, l\'établissement est équipé d\'un système d\'alarme de type 3, d\'extincteurs appropriés aux risques à tous les niveaux, d\'un éclairage de sécurité, et d\'un système de désenfumage mécanique.',
              consignesEvacuation: 'En cas d\'incendie ou d\'alarme, l\'évacuation se fait par les issues de secours signalées. Le personnel est formé pour guider les visiteurs vers les sorties et les points de rassemblement situés à l\'extérieur du bâtiment. Des plans d\'évacuation sont affichés à chaque étage.',
              preventionIncendie: 'Vérification annuelle des installations électriques. Formation du personnel aux consignes de sécurité et à la manipulation des extincteurs. Exercices d\'évacuation semestriels. Maintien des issues de secours dégagées en permanence.',
              accessibiliteSecours: 'L\'établissement est accessible aux véhicules de secours par l\'entrée principale et l\'accès de service à l\'arrière du bâtiment. Une voie pompiers est maintenue libre en permanence autour du bâtiment. Des poteaux incendie sont situés à moins de 100m.',
              classementType: 'Type L - Catégorie 3',
              effectifMaximum: 500,
              dispositionsParticulieres: 'Configuration de la salle modulable selon les événements. La jauge maximale doit être strictement respectée.',
              amenagements: 'Scène surélevée de 80cm, mobilier conforme aux normes de sécurité en vigueur, revêtements de sol M3.',
              installationsTechniques: 'Équipement électrique aux normes, chauffage central, ventilation mécanique contrôlée, éclairage de sécurité conforme.'
            },
            comments: [
              {
                id: 'comment-1',
                userId: 'user-789',
                userName: 'Marc Dubois',
                content: 'Vérifier la conformité du système d\'alarme avec les dernières normes.',
                timestamp: new Date(Date.now() - 86400000), // 24h avant
                sectionId: 'moyensSecours'
              },
              {
                id: 'comment-2',
                userId: 'user-456',
                userName: 'Sophie Martin',
                content: 'Il faudrait préciser le nombre d\'issues de secours à chaque niveau.',
                timestamp: new Date(Date.now() - 43200000), // 12h avant
                sectionId: 'descriptionEtablissement'
              }
            ]
          };
          
          setDocument(mockDocument);
          setComments(mockDocument.comments || []);
          setIsLoading(false);
        }, 1500);
        
      } catch (error) {
        console.error('Erreur lors du chargement du document:', error);
        toast.error('Erreur lors du chargement du document');
        setIsLoading(false);
      }
    };
    
    fetchDocument();
  }, [id]);
  
  const handleAddComment = () => {
    if (!newComment.trim() || !selectedSection) return;
    
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      userId: 'current-user-id',
      userName: 'Vous',
      content: newComment,
      timestamp: new Date(),
      sectionId: selectedSection
    };
    
    setComments(prev => [...prev, comment]);
    setNewComment('');
    setShowCommentForm(false);
    toast.success('Commentaire ajouté');
  };
  
  const handleValidateDocument = () => {
    // Simuler la validation du document
    toast.success('Document validé avec succès');
    setTimeout(() => {
      navigate(`/documents/${id}/signer`);
    }, 1500);
  };
  
  const handleRequestChanges = () => {
    // Simuler la demande de modifications
    toast.info('Demande de modifications envoyée');
    setTimeout(() => {
      navigate('/documents');
    }, 1500);
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="h-12 w-12 rounded-full bg-gray-300"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-500">Chargement du document...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!document) {
    return (
      <Layout>
        <div className="container py-8">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>
              Le document demandé n'a pas été trouvé. Vérifiez l'URL ou retournez à la liste des documents.
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button variant="outline" onClick={() => navigate('/documents')}>
              Retour à la liste des documents
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Helper pour afficher le contenu d'un document Notice de Sécurité
  const renderNoticeSecuriteContent = () => {
    const content = document.content as any;
    
    const sections = [
      { id: 'descriptionEtablissement', title: 'Description de l\'établissement', content: content.descriptionEtablissement },
      { id: 'classementType', title: 'Classement', content: content.classementType },
      { id: 'effectifMaximum', title: 'Effectif maximum', content: content.effectifMaximum.toString() },
      { id: 'moyensSecours', title: 'Moyens de secours', content: content.moyensSecours },
      { id: 'consignesEvacuation', title: 'Consignes d\'évacuation', content: content.consignesEvacuation },
      { id: 'preventionIncendie', title: 'Prévention incendie', content: content.preventionIncendie },
      { id: 'accessibiliteSecours', title: 'Accessibilité pour les secours', content: content.accessibiliteSecours },
      { id: 'dispositionsParticulieres', title: 'Dispositions particulières', content: content.dispositionsParticulieres },
      { id: 'amenagements', title: 'Aménagements', content: content.amenagements },
      { id: 'installationsTechniques', title: 'Installations techniques', content: content.installationsTechniques }
    ];
    
    return (
      <div className="space-y-6">
        {sections.map(section => (
          <div key={section.id} id={section.id} className="relative">
            <div 
              className={`p-4 border rounded-lg ${
                comments.some(c => c.sectionId === section.id) ? 'border-amber-400 bg-amber-50' : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setSelectedSection(section.id);
                          setShowCommentForm(true);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ajouter un commentaire</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-gray-700">{section.content}</p>
              
              {/* Afficher les commentaires pour cette section */}
              {comments.filter(c => c.sectionId === section.id).length > 0 && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">Commentaires</h4>
                  <div className="space-y-3">
                    {comments
                      .filter(c => c.sectionId === section.id)
                      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                      .map(comment => (
                        <div key={comment.id} className="flex items-start space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">{comment.userName}</span>
                              <span className="text-xs text-gray-500">
                                {comment.timestamp.toLocaleDateString()} {comment.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
            
            {/* Formulaire d'ajout de commentaire */}
            {showCommentForm && selectedSection === section.id && (
              <div className="mt-2 bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>V</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea 
                      value={newComment} 
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Ajouter un commentaire..."
                      className="min-h-[100px] mt-1"
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setShowCommentForm(false);
                          setNewComment('');
                        }}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Annuler
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Envoyer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{document.title}</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <span>Version {document.version}</span>
              <span>•</span>
              <span>Mis à jour le {document.updatedAt.toLocaleDateString()}</span>
              <span>•</span>
              <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-md text-sm font-medium">
                En relecture
              </span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Retour
            </Button>
            <Button
              variant="destructive"
              onClick={handleRequestChanges}
            >
              <Edit className="mr-2 h-4 w-4" />
              Demander des modifications
            </Button>
            <Button
              variant="default"
              onClick={handleValidateDocument}
            >
              <Check className="mr-2 h-4 w-4" />
              Valider et signer
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="document">
          <TabsList className="mb-6">
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="commentaires">
              Commentaires ({comments.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="document" className="bg-white p-6 rounded-lg shadow-sm">
            {document.documentType === 'NoticeSecurite' && renderNoticeSecuriteContent()}
          </TabsContent>
          
          <TabsContent value="commentaires">
            <Card>
              <CardHeader>
                <CardTitle>Tous les commentaires</CardTitle>
                <CardDescription>
                  Consultez et répondez aux commentaires sur ce document
                </CardDescription>
              </CardHeader>
              <CardContent>
                {comments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Aucun commentaire pour le moment.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {comments
                      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                      .map(comment => (
                        <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-0">
                          <div className="flex items-start space-x-3">
                            <Avatar>
                              <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <span className="font-medium">{comment.userName}</span>
                                <span className="text-sm text-gray-500">
                                  {comment.timestamp.toLocaleDateString()} à {comment.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="mt-1">{comment.content}</p>
                              <div className="mt-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => {
                                    const section = document.content[comment.sectionId as keyof typeof document.content];
                                    const sectionElement = document.getElementById(comment.sectionId || '');
                                    if (sectionElement) {
                                      sectionElement.scrollIntoView({ behavior: 'smooth' });
                                    }
                                  }}
                                >
                                  Voir la section
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )}
                
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium mb-4">Ajouter un commentaire général</h3>
                  <div className="space-y-4">
                    <Textarea 
                      placeholder="Votre commentaire sur l'ensemble du document..."
                      className="min-h-[120px]"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={() => {
                          if (!newComment.trim()) return;
                          
                          const comment: Comment = {
                            id: `comment-${Date.now()}`,
                            userId: 'current-user-id',
                            userName: 'Vous',
                            content: newComment,
                            timestamp: new Date()
                          };
                          
                          setComments(prev => [...prev, comment]);
                          setNewComment('');
                          toast.success('Commentaire ajouté');
                        }}
                        disabled={!newComment.trim()}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Publier le commentaire
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Retour
          </Button>
          
          <div className="flex space-x-2">
            <Button
              variant="destructive"
              onClick={handleRequestChanges}
            >
              <Edit className="mr-2 h-4 w-4" />
              Demander des modifications
            </Button>
            <Button
              variant="default"
              onClick={handleValidateDocument}
            >
              <Check className="mr-2 h-4 w-4" />
              Valider et signer
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentReview;
