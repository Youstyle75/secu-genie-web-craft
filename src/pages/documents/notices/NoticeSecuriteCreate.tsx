
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { NoticeSecuriteContent } from '@/types/securityDocument';
import Layout from '@/components/layout/Layout';
import { AlertCircle } from 'lucide-react';

// Schema de validation pour le formulaire de Notice de Sécurité
const noticeSecuriteSchema = z.object({
  title: z.string().min(3, { message: 'Le titre doit contenir au moins 3 caractères' }),
  establishmentId: z.string().optional(),
  descriptionEtablissement: z.string().min(10, { message: 'La description doit contenir au moins 10 caractères' }),
  classementType: z.string().min(1, { message: 'Veuillez sélectionner un type de classement' }),
  effectifMaximum: z.coerce.number().positive({ message: 'L\'effectif doit être un nombre positif' }),
  moyensSecours: z.string().min(10, { message: 'Veuillez décrire les moyens de secours' }),
  consignesEvacuation: z.string().min(10, { message: 'Veuillez décrire les consignes d\'évacuation' }),
  preventionIncendie: z.string().min(10, { message: 'Veuillez décrire les mesures de prévention incendie' }),
  accessibiliteSecours: z.string().min(10, { message: 'Veuillez décrire l\'accessibilité pour les secours' }),
  dispositionsParticulieres: z.string().optional(),
  amenagements: z.string().optional(),
  installationsTechniques: z.string().optional(),
});

type NoticeSecuriteForm = z.infer<typeof noticeSecuriteSchema>;

const NoticeSecuriteCreate = () => {
  const [currentTab, setCurrentTab] = useState('informations');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<NoticeSecuriteForm>({
    resolver: zodResolver(noticeSecuriteSchema),
    defaultValues: {
      title: '',
      descriptionEtablissement: '',
      classementType: '',
      effectifMaximum: 0,
      moyensSecours: '',
      consignesEvacuation: '',
      preventionIncendie: '',
      accessibiliteSecours: '',
      dispositionsParticulieres: '',
      amenagements: '',
      installationsTechniques: '',
    }
  });
  
  const onSubmit = async (data: NoticeSecuriteForm) => {
    try {
      // Simulation d'un appel API
      console.log('Données soumises:', data);
      
      toast({
        title: "Notice de sécurité créée",
        description: "Votre document a été enregistré avec succès.",
        variant: "default",
      });
      
      // Redirection vers la page de détail du document
      navigate('/documents/notice-securite/123'); // ID de démo
    } catch (error) {
      console.error('Erreur lors de la création de la notice:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du document.",
        variant: "destructive",
      });
    }
  };
  
  const handleSuggestWithAI = async (field: keyof NoticeSecuriteForm) => {
    setIsGeneratingAi(true);
    
    try {
      // Récupérer les données pertinentes du formulaire
      const formData = form.getValues();
      
      // Simulation d'un appel API IA
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simuler un délai
      
      // Exemple de réponse générée
      let generatedText = '';
      
      switch (field) {
        case 'descriptionEtablissement':
          generatedText = `Établissement de type ${formData.classementType || '[type]'} avec un effectif maximum de ${formData.effectifMaximum || '[effectif]'} personnes. L'établissement comprend [description des espaces]. Il est situé [emplacement] et dispose de [nombre] accès principaux.`;
          break;
        case 'moyensSecours':
          generatedText = `L'établissement est équipé de systèmes de détection incendie conformes à la norme NF S 61-970. Des extincteurs appropriés aux risques sont disposés à chaque niveau, à proximité des sorties et dans les zones à risques spécifiques. Un système d'alarme de type 3 est installé et permet d'alerter l'ensemble des occupants.`;
          break;
        case 'consignesEvacuation':
          generatedText = `En cas d'incendie, l'évacuation s'effectuera par les issues de secours signalées. Le point de rassemblement est situé [emplacement]. Les consignes d'évacuation sont affichées à chaque niveau et des exercices d'évacuation sont réalisés deux fois par an.`;
          break;
        default:
          generatedText = "Contenu généré par l'assistant IA. Veuillez personnaliser ce texte selon vos besoins spécifiques.";
      }
      
      setAiSuggestion(generatedText);
      
      toast({
        title: "Suggestion IA disponible",
        description: "Une suggestion a été générée par l'IA.",
        variant: "default",
      });
    } catch (error) {
      console.error('Erreur lors de la génération AI:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer une suggestion IA.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAi(false);
    }
  };
  
  const applySuggestion = (field: keyof NoticeSecuriteForm) => {
    if (aiSuggestion) {
      form.setValue(field, aiSuggestion);
      setAiSuggestion('');
    }
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-8">Créer une Notice de Sécurité</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="informations">Informations générales</TabsTrigger>
                <TabsTrigger value="moyens">Moyens de secours</TabsTrigger>
                <TabsTrigger value="evacuation">Évacuation & Prévention</TabsTrigger>
                <TabsTrigger value="amenagements">Aménagements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="informations" className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre du document</FormLabel>
                      <FormControl>
                        <Input placeholder="Entrez un titre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="establishmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Établissement</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un établissement" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Restaurant Le Gourmet (ERP type N)</SelectItem>
                          <SelectItem value="2">Salle des fêtes municipale (ERP type L)</SelectItem>
                          <SelectItem value="3">Boutique La Mode (ERP type M)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Sélectionnez un établissement pour pré-remplir certaines informations
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="descriptionEtablissement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description de l'établissement</FormLabel>
                      <div className="flex items-start gap-2">
                        <FormControl className="flex-grow">
                          <Textarea 
                            placeholder="Décrivez l'établissement" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="mt-0"
                          onClick={() => handleSuggestWithAI('descriptionEtablissement')}
                          disabled={isGeneratingAi}
                        >
                          {isGeneratingAi ? 'Génération...' : 'Suggérer'}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {aiSuggestion && (
                  <Card className="bg-alertBackground border-alertText">
                    <CardContent className="pt-4 pb-2">
                      <p className="text-alertText font-medium flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4" />
                        Suggestion de l'IA
                      </p>
                      <p className="text-alertText mb-2">{aiSuggestion}</p>
                      <div className="flex justify-end">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => applySuggestion('descriptionEtablissement')}
                          className="text-alertText hover:text-accentBleu hover:border-accentBleu"
                        >
                          Appliquer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="classementType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de classement ERP</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="type_l">Type L - Salles de spectacles</SelectItem>
                            <SelectItem value="type_m">Type M - Magasins</SelectItem>
                            <SelectItem value="type_n">Type N - Restaurants</SelectItem>
                            <SelectItem value="type_o">Type O - Hôtels</SelectItem>
                            <SelectItem value="type_p">Type P - Salles de danse</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="effectifMaximum"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Effectif maximum</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Nombre maximum de personnes admissibles
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="moyens" className="space-y-6">
                <FormField
                  control={form.control}
                  name="moyensSecours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Moyens de secours</FormLabel>
                      <div className="flex items-start gap-2">
                        <FormControl className="flex-grow">
                          <Textarea 
                            placeholder="Décrivez les moyens de secours disponibles" 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => handleSuggestWithAI('moyensSecours')}
                          disabled={isGeneratingAi}
                        >
                          {isGeneratingAi ? 'Génération...' : 'Suggérer'}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="accessibiliteSecours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Accessibilité pour les secours</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez l'accessibilité pour les services de secours" 
                          className="min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="evacuation" className="space-y-6">
                <FormField
                  control={form.control}
                  name="consignesEvacuation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consignes d'évacuation</FormLabel>
                      <div className="flex items-start gap-2">
                        <FormControl className="flex-grow">
                          <Textarea 
                            placeholder="Décrivez les consignes d'évacuation" 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => handleSuggestWithAI('consignesEvacuation')}
                          disabled={isGeneratingAi}
                        >
                          {isGeneratingAi ? 'Génération...' : 'Suggérer'}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="preventionIncendie"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prévention incendie</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez les mesures de prévention incendie" 
                          className="min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dispositionsParticulieres"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dispositions particulières</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Précisez les dispositions particulières (facultatif)" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="amenagements" className="space-y-6">
                <FormField
                  control={form.control}
                  name="amenagements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aménagements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez les aménagements (facultatif)" 
                          className="min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="installationsTechniques"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Installations techniques</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez les installations techniques (facultatif)" 
                          className="min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-between mt-8">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Annuler
              </Button>
              <div className="flex gap-4">
                <Button type="button" variant="secondary">
                  Enregistrer comme brouillon
                </Button>
                <Button type="submit">
                  Créer la notice
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default NoticeSecuriteCreate;
