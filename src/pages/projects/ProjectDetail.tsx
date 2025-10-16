import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Edit, Trash2, FileText, Calendar, MapPin, Users } from 'lucide-react';
import { toast } from 'sonner';

interface Project {
  id: string;
  name: string;
  type: string;
  status: string;
  erp_type: string | null;
  capacity: number | null;
  location: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && id) {
      fetchProject();
    }
  }, [user, id]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id!)
        .eq('user_id', user!.id)
        .single();

      if (error) throw error;
      setProject(data);
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Erreur lors du chargement du projet');
      navigate('/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id!);

      if (error) throw error;

      toast.success('Projet supprimé avec succès');
      navigate('/projects');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Erreur lors de la suppression du projet');
    }
  };

  const getStatusBadgeClass = (status: string) => {
    const statusMap: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-blue-100 text-blue-800',
      review: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      archived: 'bg-red-100 text-red-800',
    };
    return statusMap[status] || statusMap.draft;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      draft: 'Brouillon',
      in_progress: 'En cours',
      review: 'En révision',
      completed: 'Terminé',
      archived: 'Archivé',
    };
    return labels[status] || status;
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accentBleu"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <Layout>
      <div className="py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/projects')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux projets
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{project.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span className={`text-sm px-3 py-1 rounded-full ${getStatusBadgeClass(project.status)}`}>
                        {getStatusLabel(project.status)}
                      </span>
                      <span className="text-sm">•</span>
                      <span>{project.type}</span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => navigate(`/projects/${id}/edit`)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleDelete}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {project.description && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-textPrincipal mb-2">Description</h3>
                    <p className="text-textPrincipal/80">{project.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  {project.erp_type && (
                    <div>
                      <h4 className="text-sm font-medium text-textPrincipal/60 mb-1">Type d'ERP</h4>
                      <p className="text-textPrincipal">{project.erp_type}</p>
                    </div>
                  )}

                  {project.capacity && (
                    <div>
                      <h4 className="text-sm font-medium text-textPrincipal/60 mb-1 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Capacité d'accueil
                      </h4>
                      <p className="text-textPrincipal">{project.capacity} personnes</p>
                    </div>
                  )}

                  {project.location && (
                    <div className="col-span-2">
                      <h4 className="text-sm font-medium text-textPrincipal/60 mb-1 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Localisation
                      </h4>
                      <p className="text-textPrincipal">{project.location}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-medium text-textPrincipal/60 mb-1 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date de création
                    </h4>
                    <p className="text-textPrincipal">
                      {new Date(project.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-textPrincipal/60 mb-1 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Dernière modification
                    </h4>
                    <p className="text-textPrincipal">
                      {new Date(project.updated_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Documents associés à ce projet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-textPrincipal/60">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun document pour le moment</p>
                  <Button className="mt-4" variant="outline">
                    Ajouter un document
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Créer un document
                </Button>
                <Button className="w-full" variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier le projet
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
