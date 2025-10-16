import { useState } from 'react';
import { Check, Clock, Info, X, FileText, Calendar, Users, AlertTriangle, Download, Plus, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

const demoProjects = [
  {
    id: 'proj-1',
    name: 'Festival Musiques du Monde 2025',
    type: 'ERP - Type PA (Plein Air)',
    status: 'completed',
    compliance: 98,
    documents: 8,
    lastUpdate: '2025-04-20',
    publicCapacity: 15000,
    staffCount: 250,
    startDate: '2025-06-15',
    endDate: '2025-06-18'
  },
  {
    id: 'proj-2',
    name: 'Concert Open Air - Place Centrale',
    type: 'Manifestation temporaire',
    status: 'in-progress',
    compliance: 75,
    documents: 5,
    lastUpdate: '2025-04-22',
    publicCapacity: 8000,
    staffCount: 120,
    startDate: '2025-05-10',
    endDate: '2025-05-10'
  },
  {
    id: 'proj-3',
    name: 'Salon Professionnel Tech Expo',
    type: 'ERP - Type T (Exposition)',
    status: 'needs-attention',
    compliance: 60,
    documents: 3,
    lastUpdate: '2025-04-15',
    publicCapacity: 5000,
    staffCount: 80,
    startDate: '2025-07-01',
    endDate: '2025-07-03'
  },
];

const demoGN6Documents = [
  {
    id: 'gn6-1',
    name: 'GN6 - Festival Musiques du Monde',
    project: 'Festival Musiques du Monde 2025',
    type: 'GN6',
    status: 'valid',
    expiresAt: '2025-06-18',
    progress: 100,
    publicCapacity: 15000,
    safetyMeasures: 12,
    approvalDate: '2025-04-15'
  },
  {
    id: 'gn6-2',
    name: 'GN6 - Concert Open Air',
    project: 'Concert Open Air - Place Centrale',
    type: 'GN6',
    status: 'draft',
    expiresAt: null,
    progress: 75,
    publicCapacity: 8000,
    safetyMeasures: 8,
    approvalDate: null
  },
  {
    id: 'gn6-3',
    name: 'GN6 - Tech Expo',
    project: 'Salon Professionnel Tech Expo',
    type: 'GN6',
    status: 'pending',
    expiresAt: null,
    progress: 45,
    publicCapacity: 5000,
    safetyMeasures: 5,
    approvalDate: null
  },
];

const upcomingTasks = [
  { id: 1, task: 'Finaliser plan d\'évacuation Tech Expo', priority: 'high', dueDate: '2025-04-25' },
  { id: 2, task: 'Valider mesures de sécurité Concert Open Air', priority: 'medium', dueDate: '2025-04-28' },
  { id: 3, task: 'Mise à jour registre de sécurité Festival', priority: 'low', dueDate: '2025-05-05' },
];

const DemoDashboard = () => {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState<'overview' | 'documents'>('overview');

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container-large">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Dashboard <span className="text-primary">GN6</span>
              </h1>
              <p className="text-muted-foreground">
                Gérez tous vos événements et manifestations en conformité
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={() => navigate('/documents/gn6/creer')}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Nouveau GN6
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  +12% ce mois
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Événements actifs</p>
                <p className="text-3xl font-bold">3</p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-success/10 rounded-lg">
                  <FileText className="h-6 w-6 text-success" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  75% validés
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">GN6 en cours</p>
                <p className="text-3xl font-bold">3</p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  Capacité totale
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Public accueilli</p>
                <p className="text-3xl font-bold">28K</p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  Excellent
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Taux de conformité</p>
                <p className="text-3xl font-bold">78%</p>
              </div>
            </Card>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 border-b">
            <button
              onClick={() => setSelectedView('overview')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                selectedView === 'overview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setSelectedView('documents')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                selectedView === 'documents'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Documents GN6
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {selectedView === 'overview' ? (
              <>
                {/* Projects List */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Événements en cours</h3>
                  <div className="space-y-4">
                    {demoProjects.map((project) => (
                      <Card key={project.id} className="p-5 hover:shadow-md transition-all border-l-4 border-l-primary/20">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-lg mb-1">{project.name}</h4>
                                <p className="text-sm text-muted-foreground">{project.type}</p>
                              </div>
                              <Badge variant={
                                project.status === 'completed' ? 'default' :
                                project.status === 'in-progress' ? 'secondary' : 'outline'
                              } className="ml-2">
                                {project.status === 'completed' && <Check className="h-3 w-3 mr-1" />}
                                {project.status === 'in-progress' && <Clock className="h-3 w-3 mr-1" />}
                                {project.status === 'needs-attention' && <AlertTriangle className="h-3 w-3 mr-1" />}
                                {project.status === 'completed' ? 'Validé' : 
                                 project.status === 'in-progress' ? 'En cours' : 'À compléter'}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">
                              <div>
                                <p className="text-muted-foreground text-xs">Dates</p>
                                <p className="font-medium">{project.startDate}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">Capacité</p>
                                <p className="font-medium">{project.publicCapacity.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">Personnel</p>
                                <p className="font-medium">{project.staffCount}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">Documents</p>
                                <p className="font-medium">{project.documents}</p>
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-muted-foreground">Conformité</span>
                                <span className="text-xs font-medium">{project.compliance}%</span>
                              </div>
                              <Progress value={project.compliance} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Actions rapides</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button variant="outline" className="justify-start h-auto py-4">
                      <FileText className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Créer un GN6</div>
                        <div className="text-xs text-muted-foreground">Nouveau document</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-4">
                      <Calendar className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Planifier événement</div>
                        <div className="text-xs text-muted-foreground">Nouvel événement</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-4">
                      <Download className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Exporter rapports</div>
                        <div className="text-xs text-muted-foreground">PDF, JSON</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-4">
                      <Users className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Gérer équipes</div>
                        <div className="text-xs text-muted-foreground">Personnel sécurité</div>
                      </div>
                    </Button>
                  </div>
                </Card>
              </>
            ) : (
              /* Documents GN6 View */
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Documents GN6</h3>
                <div className="space-y-4">
                  {demoGN6Documents.map((doc) => (
                    <Card key={doc.id} className="p-5 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{doc.name}</h4>
                          <p className="text-sm text-muted-foreground">{doc.project}</p>
                        </div>
                        <Badge variant={
                          doc.status === 'valid' ? 'default' :
                          doc.status === 'draft' ? 'secondary' : 'outline'
                        }>
                          {doc.status === 'valid' && <Check className="h-3 w-3 mr-1" />}
                          {doc.status === 'valid' ? 'Validé' : 
                           doc.status === 'draft' ? 'Brouillon' : 'En attente'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">Capacité</p>
                          <p className="font-medium">{doc.publicCapacity.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Mesures</p>
                          <p className="font-medium">{doc.safetyMeasures}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Approbation</p>
                          <p className="font-medium text-xs">{doc.approvalDate || 'En cours'}</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Progression</span>
                          <span className="text-xs font-medium">{doc.progress}%</span>
                        </div>
                        <Progress value={doc.progress} className="h-2" />
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          Modifier
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Tâches à venir</h3>
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="p-3 bg-surface rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium flex-1">{task.task}</p>
                      <Badge 
                        variant={
                          task.priority === 'high' ? 'destructive' :
                          task.priority === 'medium' ? 'default' : 'secondary'
                        }
                        className="text-xs ml-2"
                      >
                        {task.priority === 'high' ? 'Urgent' : 
                         task.priority === 'medium' ? 'Moyen' : 'Faible'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Échéance: {task.dueDate}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Alerts */}
            <Card className="p-6 bg-amber-50 border-amber-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">
                    Action requise
                  </h4>
                  <p className="text-sm text-amber-800 mb-3">
                    Le GN6 pour "Tech Expo" nécessite une validation avant le 25 avril.
                  </p>
                  <Button size="sm" variant="outline" className="border-amber-600 text-amber-900 hover:bg-amber-100">
                    Voir le document
                  </Button>
                </div>
              </div>
            </Card>

            {/* Help Card */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h4 className="font-semibold mb-2">Besoin d'aide ?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Notre équipe est là pour vous accompagner dans la création de vos documents GN6.
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Contacter le support
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoDashboard;
