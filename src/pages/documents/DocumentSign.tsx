
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { File, Download, AlertTriangle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import Layout from '@/components/layout/Layout';
import SignaturePad from '@/components/documents/SignaturePad';
import { SecurityDocument } from '@/types/securityDocument';
import { SignatureData } from '@/types/signature';
import apiConfig from '@/config/apiEndpoints';

const DocumentSign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [document, setDocument] = useState<SecurityDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [signerName, setSignerName] = useState('');
  const [signerRole, setSignerRole] = useState('');
  const [signerEmail, setSignerEmail] = useState('');
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [signatureError, setSignatureError] = useState<string | null>(null);
  
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
            status: 'valide',
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
            }
          };
          
          setDocument(mockDocument);
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
  
  const handleSignatureCapture = (signatureBase64: string) => {
    setSignatureData(signatureBase64);
    setSignatureError(null);
  };
  
  const handleSignDocument = async () => {
    // Validation des champs
    if (!signerName.trim()) {
      setSignatureError('Veuillez indiquer votre nom');
      return;
    }
    
    if (!signatureData) {
      setSignatureError('Veuillez signer le document');
      return;
    }
    
    try {
      setIsSigning(true);
      
      // Création de l'objet signature
      const signature: Partial<SignatureData> = {
        documentId: id || '',
        signerInfo: signerName,
        signerRole: signerRole || undefined,
        signerEmail: signerEmail || undefined,
        signatureImageBase64: signatureData,
        timestamp: new Date(),
      };
      
      console.log('Données de signature:', signature);
      
      // Simuler l'appel API pour signer le document
      setTimeout(() => {
        toast.success('Document signé avec succès');
        
        // Redirection vers la page d'export du document
        setTimeout(() => {
          navigate(`/documents/${id}/exporter`);
        }, 1500);
      }, 2000);
      
    } catch (error) {
      console.error('Erreur lors de la signature du document:', error);
      toast.error('Une erreur est survenue lors de la signature du document');
      setIsSigning(false);
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
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm font-medium">
                Prêt à signer
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
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Aperçu du document</CardTitle>
                <CardDescription>
                  Vérifiez les informations avant de signer
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex flex-col items-center justify-center border-t">
                <div className="w-full h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <div className="text-center p-6">
                    <File className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">{document.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Document {document.documentType} validé
                    </p>
                    <div className="mt-6">
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Prévisualiser
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Signature du document</CardTitle>
                <CardDescription>
                  Veuillez signer ci-dessous pour finaliser le document
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6 border-t">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom et prénom</label>
                    <Input
                      value={signerName}
                      onChange={(e) => setSignerName(e.target.value)}
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fonction / Titre</label>
                    <Input
                      value={signerRole}
                      onChange={(e) => setSignerRole(e.target.value)}
                      placeholder="Votre fonction (optionnel)"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      value={signerEmail}
                      onChange={(e) => setSignerEmail(e.target.value)}
                      placeholder="Votre email (optionnel)"
                      type="email"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-3">Votre signature</h3>
                  <SignaturePad 
                    onSignatureCapture={handleSignatureCapture} 
                    width={450}
                    height={200}
                  />
                </div>
                
                {signatureError && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>
                      {signatureError}
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="pt-4">
                  <Button
                    className="w-full"
                    onClick={handleSignDocument}
                    disabled={isSigning || !signatureData || !signerName}
                  >
                    {isSigning ? (
                      <span className="flex items-center">
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        Signature en cours...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Check className="mr-2 h-4 w-4" />
                        Signer le document
                      </span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentSign;
