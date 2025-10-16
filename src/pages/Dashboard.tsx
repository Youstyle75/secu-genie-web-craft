import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { 
  FolderKanban, 
  FileText, 
  PenTool, 
  Bell, 
  Plus, 
  ArrowUpRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface Stats {
  totalProjects: number;
  totalDocuments: number;
  totalSignatures: number;
  unreadNotifications: number;
}

interface RecentProject {
  id: string;
  name: string;
  type: string;
  status: string;
  updated_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalDocuments: 0,
    totalSignatures: 0,
    unreadNotifications: 0,
  });
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [projectsRes, documentsRes, signaturesRes, notificationsRes] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact' }).eq('user_id', user!.id),
        supabase.from('documents').select('*', { count: 'exact' }).eq('user_id', user!.id),
        supabase.from('signatures').select('*', { count: 'exact' }).eq('user_id', user!.id),
        supabase.from('notifications').select('*', { count: 'exact' }).eq('user_id', user!.id).eq('read', false),
      ]);

      setStats({
        totalProjects: projectsRes.count || 0,
        totalDocuments: documentsRes.count || 0,
        totalSignatures: signaturesRes.count || 0,
        unreadNotifications: notificationsRes.count || 0,
      });

      // Fetch recent projects
      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user!.id)
        .order('updated_at', { ascending: false })
        .limit(5);

      setRecentProjects(projects || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Erreur lors du chargement du tableau de bord');
    } finally {
      setLoading(false);
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

  return (
    <Layout>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-textPrincipal mb-2">
            Tableau de bord
          </h1>
          <p className="text-textPrincipal/60">
            Bienvenue sur votre espace Secugenie
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-textPrincipal/60">
                Projets
              </CardTitle>
              <FolderKanban className="h-4 w-4 text-accentBleu" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-textPrincipal">{stats.totalProjects}</div>
              <p className="text-xs text-textPrincipal/60 mt-1">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                Total des projets
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-textPrincipal/60">
                Documents
              </CardTitle>
              <FileText className="h-4 w-4 text-accentBleu" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-textPrincipal">{stats.totalDocuments}</div>
              <p className="text-xs text-textPrincipal/60 mt-1">
                Documents créés
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-textPrincipal/60">
                Signatures
              </CardTitle>
              <PenTool className="h-4 w-4 text-accentBleu" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-textPrincipal">{stats.totalSignatures}</div>
              <p className="text-xs text-textPrincipal/60 mt-1">
                Documents signés
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-textPrincipal/60">
                Notifications
              </CardTitle>
              <Bell className="h-4 w-4 text-accentBleu" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-textPrincipal">{stats.unreadNotifications}</div>
              <p className="text-xs text-textPrincipal/60 mt-1">
                Non lues
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Projets récents</CardTitle>
                  <CardDescription>Vos derniers projets mis à jour</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/projects')}
                >
                  Voir tout
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {recentProjects.length === 0 ? (
                <div className="text-center py-8 text-textPrincipal/60">
                  <FolderKanban className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun projet pour le moment</p>
                  <Button 
                    className="mt-4"
                    onClick={() => navigate('/projects/create')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Créer un projet
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 cursor-pointer transition-colors"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-textPrincipal">{project.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-textPrincipal/60">{project.type}</span>
                          <span className="text-xs text-textPrincipal/40">•</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadgeClass(project.status)}`}>
                            {getStatusLabel(project.status)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center text-textPrincipal/60 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(project.updated_at).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Commencez un nouveau projet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate('/projects/create')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Nouveau projet
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate('/documents/notice-securite/creer')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Notice de sécurité
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate('/documents/plan-prevention/creer')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Plan de prévention
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
