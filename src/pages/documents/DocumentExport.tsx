
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Download, FileText, Share, Check, FileBadge, AlertTriangle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Layout from '@/components/layout/Layout';
import { SecurityDocument } from '@/types/securityDocument';
import { SignatureData } from '@/types/signature';
import apiConfig from '@/config/apiEndpoints';

const DocumentExport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [document, setDocument] = useState<SecurityDocument | null>(null);
  const [signature, setSignature] = useState<SignatureData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  
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
            status: 'signe',
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
            signatures: [
              {
                id: 'signature-1',
                documentId: id || 'mock-id',
                signerInfo: 'Jean Dupont',
                signerRole: 'Responsable sécurité',
                signerEmail: 'jean.dupont@example.com',
                signatureImageBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
                timestamp: new Date(),
                verificationStatus: 'verified'
              }
            ]
          };
          
          setDocument(mockDocument);
          setSignature(mockDocument.signatures ? mockDocument.signatures[0] : null);
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
  
  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      
      // Dans un environnement réel, on ferait un appel API ici
      console.log(`Exporting document ${id} to PDF`);
      
      // Simuler le délai de génération du PDF
      setTimeout(() => {
        toast.success('PDF généré avec succès');
        
        // Simuler le téléchargement du fichier
        const link = document.createElement('a');
        link.href = '#'; // Dans un environnement réel, ce serait l'URL du PDF
        link.download = `${document?.title.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setIsExporting(false);
      }, 2000);
      
    } catch (error) {
      console.error('Erreur lors de l\'export du document:', error);
      toast.error('Une erreur est survenue lors de l\'export du document');
      setIsExporting(false);
    }
  };
  
  const handleShareByEmail = async () => {
    try {
      setIsSending(true);
      
      // Valider l'email
      if (!shareEmail.trim() || !shareEmail.includes('@')) {
        toast.error('Veuillez saisir une adresse email valide');
        setIsSending(false);
        return;
      }
      
      // Dans un environnement réel, on ferait un appel API ici
      console.log(`Sharing document ${id} with ${shareEmail}`);
      
      // Simuler l'envoi par email
      setTimeout(() => {
        toast.success(`Document partagé par email à ${shareEmail}`);
        setShareEmail('');
        setIsSending(false);
      }, 2000);
      
    } catch (error) {
      console.error('Erreur lors du partage du document:', error);
      toast.error('Une erreur est survenue lors du partage du document');
      setIsSending(false);
    }
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
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
                Signé
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
              variant="default"
              onClick={handleExportPDF}
              disabled={isExporting}
            >
              {isExporting ? (
                <span className="flex items-center">
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Export en cours...
                </span>
              ) : (
                <span className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger le PDF
                </span>
              )}
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Document finalisé</CardTitle>
                <CardDescription>
                  Ce document a été validé et signé
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-10 w-10 text-accentBleu mr-4" />
                    <div>
                      <h3 className="font-medium">{document.title}</h3>
                      <p className="text-sm text-gray-500">
                        {document.documentType === 'NoticeSecurite' 
                          ? 'Notice de Sécurité' 
                          : document.documentType === 'PlanPrevention'
                            ? 'Plan de Prévention'
                            : 'Document GN6'
                        }
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleExportPDF} disabled={isExporting}>
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
                
                {/* Informations de signature */}
                {signature && (
                  <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-medium text-green-800">Document signé</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Signataire:</span>
                        <span className="font-medium">{signature.signerInfo}</span>
                      </div>
                      {signature.signerRole && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fonction:</span>
                          <span>{signature.signerRole}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span>{signature.timestamp.toLocaleDateString()} à {signature.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Statut:</span>
                        <span className="flex items-center">
                          <Check className="h-4 w-4 text-green-600 mr-1" />
                          Vérifié
                        </span>
                      </div>
                    </div>
                    
                    {signature.signatureImageBase64 && (
                      <div className="mt-4 pt-4 border-t border-green-200">
                        <p className="text-sm text-gray-600 mb-2">Signature:</p>
                        <div className="bg-white border border-gray-200 rounded p-2 inline-block">
                          <img 
                            src={signature.signatureImageBase64} 
                            alt="Signature" 
                            className="max-h-16"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Actions supplémentaires</h3>
                  <div className="flex flex-wrap gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Share className="mr-2 h-4 w-4" />
                          Partager
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Partager le document</DialogTitle>
                          <DialogDescription>
                            Envoyez ce document par email à vos collaborateurs.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="email">
                              Adresse email
                            </label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="exemple@domaine.com"
                              value={shareEmail}
                              onChange={(e) => setShareEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button 
                            onClick={handleShareByEmail}
                            disabled={isSending || !shareEmail.trim()}
                          >
                            {isSending ? 'Envoi en cours...' : 'Envoyer'}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline">
                      <FileBadge className="mr-2 h-4 w-4" />
                      Archiver
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Informations</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="details">Détails</TabsTrigger>
                    <TabsTrigger value="history">Historique</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Type:</span>
                        <span className="text-sm font-medium">{
                          document.documentType === 'NoticeSecurite' 
                            ? 'Notice de Sécurité' 
                            : document.documentType === 'PlanPrevention'
                              ? 'Plan de Prévention'
                              : 'Document GN6'
                        }</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Version:</span>
                        <span className="text-sm font-medium">{document.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Créé le:</span>
                        <span className="text-sm font-medium">{document.createdAt.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Mis à jour le:</span>
                        <span className="text-sm font-medium">{document.updatedAt.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Signé le:</span>
                        <span className="text-sm font-medium">{signature?.timestamp.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Status:</span>
                        <span className="text-sm font-medium text-blue-600">Signé</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium mb-2">Télécharger</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start" onClick={handleExportPDF}>
                          <FileText className="mr-2 h-4 w-4" />
                          Version PDF
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history">
                    <div className="space-y-4">
                      <div className="border-l-2 border-green-500 pl-4 pb-6 relative">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                        <p className="text-sm font-medium">Document signé</p>
                        <p className="text-xs text-gray-500">{signature?.timestamp.toLocaleString()}</p>
                      </div>
                      <div className="border-l-2 border-blue-500 pl-4 pb-6 relative">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                        <p className="text-sm font-medium">Document validé</p>
                        <p className="text-xs text-gray-500">{new Date(Date.now() - 7200000).toLocaleString()}</p>
                      </div>
                      <div className="border-l-2 border-amber-500 pl-4 pb-6 relative">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-500"></div>
                        <p className="text-sm font-medium">Relecture terminée</p>
                        <p className="text-xs text-gray-500">{new Date(Date.now() - 86400000).toLocaleString()}</p>
                      </div>
                      <div className="border-l-2 border-gray-300 pl-4 relative">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300"></div>
                        <p className="text-sm font-medium">Document créé</p>
                        <p className="text-xs text-gray-500">{document.createdAt.toLocaleString()}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate('/documents')}
                >
                  Retour aux documents
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentExport;
