import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, FileText, Sparkles } from 'lucide-react';
import AIAssistantWidget from '@/components/ai/AIAssistantWidget';

const DocumentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [document, setDocument] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    if (id) {
      loadDocument();
    } else {
      setLoading(false);
    }

    // Auto-save every 30s
    const interval = setInterval(() => {
      if (id && document) {
        handleSave(true);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [id]);

  const loadDocument = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setDocument(data);
      setTitle(data.title);
      setContent(data.content || {});
    } catch (error: any) {
      toast.error('Erreur lors du chargement du document');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (autoSave = false) => {
    if (!id) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('documents')
        .update({
          title,
          content,
          version: (document?.version || 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      if (!autoSave) {
        toast.success('Document sauvegardé');
      }
      
      await loadDocument();
    } catch (error: any) {
      toast.error('Erreur lors de la sauvegarde');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const updateContentField = (field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Éditeur de Document</h1>
              <p className="text-muted-foreground">
                {document?.type || 'Nouveau document'} - Version {document?.version || 1}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => handleSave()}
              disabled={saving}
              variant="default"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Titre du document</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Entrez le titre du document"
              />
            </div>
          </CardContent>
        </Card>

        {document?.type === 'GN6' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Contenu GN6</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nom">Nom du demandeur</Label>
                <Input
                  id="nom"
                  value={content.nom || ''}
                  onChange={(e) => updateContentField('nom', e.target.value)}
                  placeholder="Nom et prénom"
                />
              </div>
              <div>
                <Label htmlFor="adresse">Adresse</Label>
                <Input
                  id="adresse"
                  value={content.adresse || ''}
                  onChange={(e) => updateContentField('adresse', e.target.value)}
                  placeholder="Adresse complète"
                />
              </div>
              <div>
                <Label htmlFor="natureManif">Nature de la manifestation</Label>
                <Textarea
                  id="natureManif"
                  value={content.natureManif || ''}
                  onChange={(e) => updateContentField('natureManif', e.target.value)}
                  placeholder="Décrivez la manifestation"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="mesuresComplementaires">Mesures complémentaires</Label>
                <Textarea
                  id="mesuresComplementaires"
                  value={content.mesuresComplementaires || ''}
                  onChange={(e) => updateContentField('mesuresComplementaires', e.target.value)}
                  placeholder="Décrivez les mesures de sécurité"
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {document?.type === 'PlanPrevention' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Contenu Plan de Prévention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="entrepriseExterieure">Entreprise extérieure</Label>
                <Input
                  id="entrepriseExterieure"
                  value={content.entrepriseExterieure || ''}
                  onChange={(e) => updateContentField('entrepriseExterieure', e.target.value)}
                  placeholder="Nom de l'entreprise"
                />
              </div>
              <div>
                <Label htmlFor="risquesIdentifies">Risques identifiés</Label>
                <Textarea
                  id="risquesIdentifies"
                  value={content.risquesIdentifies || ''}
                  onChange={(e) => updateContentField('risquesIdentifies', e.target.value)}
                  placeholder="Liste des risques"
                  rows={6}
                />
              </div>
              <div>
                <Label htmlFor="mesuresPrevention">Mesures de prévention</Label>
                <Textarea
                  id="mesuresPrevention"
                  value={content.mesuresPrevention || ''}
                  onChange={(e) => updateContentField('mesuresPrevention', e.target.value)}
                  placeholder="Mesures à mettre en place"
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {document?.type === 'NoticeSecuriteERP' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Contenu Notice de Sécurité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="description">Description de l'établissement</Label>
                <Textarea
                  id="description"
                  value={content.description || ''}
                  onChange={(e) => updateContentField('description', e.target.value)}
                  placeholder="Description détaillée"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="moyensSecours">Moyens de secours</Label>
                <Textarea
                  id="moyensSecours"
                  value={content.moyensSecours || ''}
                  onChange={(e) => updateContentField('moyensSecours', e.target.value)}
                  placeholder="Liste des moyens de secours"
                  rows={6}
                />
              </div>
              <div>
                <Label htmlFor="evacuationPublic">Conditions d'évacuation du public</Label>
                <Textarea
                  id="evacuationPublic"
                  value={content.evacuationPublic || ''}
                  onChange={(e) => updateContentField('evacuationPublic', e.target.value)}
                  placeholder="Procédures d'évacuation"
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate(`/projects/${document?.project_id}`)}>
            Retour au projet
          </Button>
          <Button onClick={() => navigate(`/documents/${id}/sign`)}>
            Passer à la signature
          </Button>
        </div>
      </div>

      <AIAssistantWidget context="editeur-document" />
    </div>
  );
};

export default DocumentEditor;
