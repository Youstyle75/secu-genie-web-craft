import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Upload, Save, ArrowLeft } from 'lucide-react';
import PlanEditorContainer from '@/components/editor/PlanEditorContainer';

const PlanEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [project, setProject] = useState<any>(null);
  const [planUrl, setPlanUrl] = useState<string>('');

  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProject(data);

      // Load plan if exists
      const metadata = data.metadata as any;
      if (metadata?.planPath) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: urlData } = supabase.storage
            .from('plans')
            .getPublicUrl(`${user.id}/${metadata.planPath}`);
          
          if (urlData) {
            setPlanUrl(urlData.publicUrl);
          }
        }
      }
    } catch (error: any) {
      toast.error('Erreur lors du chargement du projet');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast.error('Format non supporté. Utilisez JPG, PNG ou PDF.');
      return;
    }

    // Validate file size (50MB)
    if (file.size > 52428800) {
      toast.error('Fichier trop volumineux (max 50MB)');
      return;
    }

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Non authentifié');

      const fileName = `plan_${Date.now()}_${file.name}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('plans')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Update project metadata
      const { error: updateError } = await supabase
        .from('projects')
        .update({
          metadata: {
            ...project?.metadata,
            planPath: fileName,
          },
        })
        .eq('id', id);

      if (updateError) throw updateError;

      toast.success('Plan importé avec succès');
      await loadProject();

      // Trigger import event for canvas
      document.dispatchEvent(new CustomEvent('importImage', {
        detail: { filePath }
      }));
    } catch (error: any) {
      toast.error('Erreur lors de l\'import du plan');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSavePlan = async () => {
    if (!id) return;

    setSaving(true);
    try {
      // Get canvas data from global window object
      const canvasData = (window as any).fabricCanvas?.toJSON();

      if (!canvasData) {
        toast.error('Aucune donnée à sauvegarder');
        return;
      }

      const { error } = await supabase
        .from('projects')
        .update({
          plan_data: canvasData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      toast.success('Plan sauvegardé avec succès');
    } catch (error: any) {
      toast.error('Erreur lors de la sauvegarde');
      console.error(error);
    } finally {
      setSaving(false);
    }
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
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(`/projects/${id}`)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Éditeur de Plan</h1>
              <p className="text-muted-foreground">{project?.name}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => document.getElementById('plan-upload')?.click()}
              disabled={uploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? 'Import...' : 'Importer un plan'}
            </Button>
            <input
              id="plan-upload"
              type="file"
              accept="image/jpeg,image/png,image/jpg,application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <Button onClick={handleSavePlan} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </div>

        {(() => {
          const metadata = project?.metadata as any;
          return metadata?.planPath && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-sm">Plan actuel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {metadata.planPath}
                </p>
              </CardContent>
            </Card>
          );
        })()}
      </div>

      <PlanEditorContainer />
    </div>
  );
};

export default PlanEditor;
