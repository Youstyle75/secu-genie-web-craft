import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Search, Bell, ExternalLink, Calendar } from 'lucide-react';

// Mock data for demo purposes
const mockUpdates = [
  {
    id: '1',
    title: 'Arrêté du 15 janvier 2025 - Sécurité incendie ERP',
    category: 'ERP',
    date: '2025-01-15',
    summary: 'Nouvelles dispositions concernant les systèmes de désenfumage dans les ERP de type L.',
    url: 'https://www.legifrance.gouv.fr',
    importance: 'high',
  },
  {
    id: '2',
    title: 'Décret n°2024-1523 - Plan de prévention',
    category: 'Plan Prévention',
    date: '2024-12-20',
    summary: 'Modification des conditions d\'élaboration du plan de prévention pour les chantiers BTP.',
    url: 'https://www.legifrance.gouv.fr',
    importance: 'medium',
  },
  {
    id: '3',
    title: 'Circulaire DGT 2024-08 - Signalétique de sécurité',
    category: 'Signalétique',
    date: '2024-11-30',
    summary: 'Précisions sur les nouvelles normes de signalétique d\'évacuation.',
    url: 'https://www.legifrance.gouv.fr',
    importance: 'low',
  },
  {
    id: '4',
    title: 'Loi 2024-1234 - Accessibilité ERP',
    category: 'ERP',
    date: '2024-10-15',
    summary: 'Renforcement des obligations d\'accessibilité pour les ERP de catégorie 1 à 4.',
    url: 'https://www.legifrance.gouv.fr',
    importance: 'high',
  },
];

const RegulatoryUpdates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredUpdates = mockUpdates.filter((update) => {
    const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      update.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || update.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getImportanceBadge = (importance: string) => {
    const variants: any = {
      high: 'destructive',
      medium: 'default',
      low: 'secondary',
    };
    const labels: any = {
      high: 'Prioritaire',
      medium: 'Important',
      low: 'Info',
    };
    return (
      <Badge variant={variants[importance]}>
        {labels[importance]}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Veille Réglementaire</h1>
            <p className="text-muted-foreground">
              Restez informé des dernières évolutions réglementaires
            </p>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une mise à jour..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Configurer alertes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="ERP">ERP</TabsTrigger>
          <TabsTrigger value="Plan Prévention">Plan Prévention</TabsTrigger>
          <TabsTrigger value="Signalétique">Signalétique</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4">
          {filteredUpdates.map((update) => (
            <Card key={update.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{update.title}</CardTitle>
                      {getImportanceBadge(update.importance)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(update.date).toLocaleDateString('fr-FR')}
                      </span>
                      <Badge variant="outline">{update.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{update.summary}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <a
                      href={update.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}

          {filteredUpdates.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Aucune mise à jour trouvée
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>À propos de la veille réglementaire</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Cette fonctionnalité utilise des données de démonstration. Dans la version complète,
            les mises à jour sont récupérées automatiquement depuis Légifrance et d'autres sources
            officielles.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Sources officielles</h4>
              <p className="text-muted-foreground">
                Légifrance, JORF, Bulletins officiels
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Alertes personnalisées</h4>
              <p className="text-muted-foreground">
                Notifications selon vos domaines d'intérêt
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Analyse intelligente</h4>
              <p className="text-muted-foreground">
                Synthèse des impacts sur vos projets
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegulatoryUpdates;
