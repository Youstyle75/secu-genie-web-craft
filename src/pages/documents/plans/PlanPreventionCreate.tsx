
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, PlusCircle, AlertCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';

// Schema pour les risques identifiés
const risqueSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(3, { message: 'La description est requise' }),
  niveau: z.enum(['faible', 'moyen', 'eleve', 'critique'], {
    required_error: 'Veuillez sélectionner un niveau de risque',
  }),
  zone: z.string().min(1, { message: 'La zone est requise' }),
});

// Schema pour les mesures de prévention
const mesureSchema = z.object({
  id: z.string().optional(),
  risqueId: z.string().optional(),
  description: z.string().min(3, { message: 'La description est requise' }),
  responsable: z.enum(['entrepriseUtilisatrice', 'entrepriseExterieure', 'les deux'], {
    required_error: 'Veuillez sélectionner un responsable',
  }),
  dateRealisation: z.date().optional(),
  statut: z.enum(['planifiee', 'en cours', 'realisee'], {
    required_error: 'Veuillez sélectionner un statut',
  }),
});

// Schema pour le personnel autorisé
const personnelSchema = z.object({
  id: z.string().optional(),
  nom: z.string().min(1, { message: 'Le nom est requis' }),
  prenom: z.string().min(1, { message: 'Le prénom est requis' }),
  fonction: z.string().min(1, { message: 'La fonction est requise' }),
  entreprise: z.enum(['utilisatrice', 'exterieure'], {
    required_error: 'Veuillez sélectionner une entreprise',
  }),
  autorisation: z.array(z.string()).min(1, { message: 'Au moins une autorisation est requise' }),
});

// Schema de validation pour le formulaire de Plan de Prévention
const planPreventionSchema = z.object({
  title: z.string().min(3, { message: 'Le titre doit contenir au moins 3 caractères' }),
  entrepriseUtilisatrice: z.string().min(3, { message: 'Le nom de l\'entreprise utilisatrice est requis' }),
  entrepriseExterieure: z.string().min(3, { message: 'Le nom de l\'entreprise extérieure est requis' }),
  natureTravaux: z.string().min(10, { message: 'Veuillez décrire la nature des travaux' }),
  dateDebutTravaux: z.date({ required_error: 'La date de début est requise' }),
  dateFinTravaux: z.date({ required_error: 'La date de fin est requise' }),
  lieuIntervention: z.string().min(3, { message: 'Le lieu d\'intervention est requis' }),
  risquesIdentifies: z.array(risqueSchema).min(1, { message: 'Au moins un risque doit être identifié' }),
  mesuresPrevention: z.array(mesureSchema).min(1, { message: 'Au moins une mesure de prévention est requise' }),
  personnelAutorise: z.array(personnelSchema).optional().default([]),
  materielsUtilises: z.string().optional(),
  consignesParticulieres: z.string().optional(),
});

type PlanPreventionForm = z.infer<typeof planPreventionSchema>;

const PlanPreventionCreate = () => {
  const [currentTab, setCurrentTab] = useState('informations');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Options pour les autorisations du personnel
  const autorisationOptions = [
    { id: 'electricite', label: 'Habilitation électrique' },
    { id: 'hauteur', label: 'Travail en hauteur' },
    { id: 'espaces_confines', label: 'Espaces confinés' },
    { id: 'levage', label: 'Conduite d\'engins de levage' },
    { id: 'produits_chimiques', label: 'Manipulation de produits chimiques' },
  ];
  
  const form = useForm<PlanPreventionForm>({
    resolver: zodResolver(planPreventionSchema),
    defaultValues: {
      title: '',
      entrepriseUtilisatrice: '',
      entrepriseExterieure: '',
      natureTravaux: '',
      lieuIntervention: '',
      risquesIdentifies: [{ description: '', niveau: 'moyen', zone: '' }],
      mesuresPrevention: [{ description: '', responsable: 'les deux', statut: 'planifiee' }],
      personnelAutorise: [],
      materielsUtilises: '',
      consignesParticulieres: '',
    }
  });
  
  const { fields: risquesFields, append: appendRisque, remove: removeRisque } = useFieldArray({
    control: form.control,
    name: 'risquesIdentifies',
  });
  
  const { fields: mesuresFields, append: appendMesure, remove: removeMesure } = useFieldArray({
    control: form.control,
    name: 'mesuresPrevention',
  });
  
  const { fields: personnelFields, append: appendPersonnel, remove: removePersonnel } = useFieldArray({
    control: form.control,
    name: 'personnelAutorise',
  });
  
  const onSubmit = async (data: PlanPreventionForm) => {
    try {
      // Simulation d'un appel API
      console.log('Données soumises:', data);
      
      toast({
        title: "Plan de prévention créé",
        description: "Votre document a été enregistré avec succès.",
        variant: "default",
      });
      
      // Redirection vers la page de détail du document
      navigate('/documents/plan-prevention/123'); // ID de démo
    } catch (error) {
      console.error('Erreur lors de la création du plan:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du document.",
        variant: "destructive",
      });
    }
  };
  
  const handleSuggestWithAI = async (field: keyof PlanPreventionForm | string) => {
    setIsGeneratingAi(true);
    
    try {
      // Récupérer les données pertinentes du formulaire
      const formData = form.getValues();
      
      // Simulation d'un appel API IA
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simuler un délai
      
      // Exemple de réponse générée
      let generatedText = '';
      
      switch (field) {
        case 'natureTravaux':
          generatedText = `Intervention de maintenance sur les équipements de ventilation et climatisation situés dans les locaux techniques de l'entreprise. Ces travaux comprennent le remplacement de filtres, la vérification des circuits électriques et le nettoyage des gaines de ventilation.`;
          break;
        case 'risque-0':
          generatedText = `Risque de chute de hauteur lors de l'accès aux équipements de ventilation situés en hauteur.`;
          break;
        case 'mesure-0':
          generatedText = `Mise en place d'un échafaudage conforme avec garde-corps et plinthes. Obligation du port du harnais de sécurité pour tout travail à plus de 3 mètres de hauteur. Balisage de la zone d'intervention.`;
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
  
  const applySuggestion = (field: string) => {
    if (!aiSuggestion) return;
    
    if (field === 'natureTravaux') {
      form.setValue('natureTravaux', aiSuggestion);
    } else if (field.startsWith('risque-')) {
      const index = parseInt(field.split('-')[1]);
      form.setValue(`risquesIdentifies.${index}.description`, aiSuggestion);
    } else if (field.startsWith('mesure-')) {
      const index = parseInt(field.split('-')[1]);
      form.setValue(`mesuresPrevention.${index}.description`, aiSuggestion);
    }
    
    setAiSuggestion('');
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-8">Créer un Plan de Prévention</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="informations">Informations générales</TabsTrigger>
                <TabsTrigger value="risques">Risques & Mesures</TabsTrigger>
                <TabsTrigger value="personnel">Personnel autorisé</TabsTrigger>
                <TabsTrigger value="consignes">Consignes & Matériels</TabsTrigger>
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="entrepriseUtilisatrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entreprise utilisatrice</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom de l'entreprise utilisatrice" {...field} />
                        </FormControl>
                        <FormDescription>
                          Entreprise qui accueille l'intervention
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="entrepriseExterieure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entreprise extérieure</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom de l'entreprise extérieure" {...field} />
                        </FormControl>
                        <FormDescription>
                          Entreprise qui réalise l'intervention
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="natureTravaux"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nature des travaux</FormLabel>
                      <div className="flex items-start gap-2">
                        <FormControl className="flex-grow">
                          <Textarea 
                            placeholder="Décrivez la nature des travaux" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="mt-0"
                          onClick={() => handleSuggestWithAI('natureTravaux')}
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
                          onClick={() => applySuggestion('natureTravaux')}
                          className="text-alertText hover:text-accentBleu hover:border-accentBleu"
                        >
                          Appliquer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <FormField
                  control={form.control}
                  name="lieuIntervention"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lieu d'intervention</FormLabel>
                      <FormControl>
                        <Input placeholder="Précisez le lieu d'intervention" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dateDebutTravaux"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date de début des travaux</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'P', { locale: fr })
                                ) : (
                                  <span>Sélectionner une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                              className="rounded-md border p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dateFinTravaux"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date de fin des travaux</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'P', { locale: fr })
                                ) : (
                                  <span>Sélectionner une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                const dateDebut = form.getValues('dateDebutTravaux');
                                if (!dateDebut) return date < new Date(new Date().setHours(0, 0, 0, 0));
                                return date < dateDebut;
                              }}
                              initialFocus
                              className="rounded-md border p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="risques" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Risques identifiés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {risquesFields.map((field, index) => (
                      <div key={field.id} className="mb-6 p-4 border border-formBorder rounded-md">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-medium">Risque #{index + 1}</h4>
                          {index > 0 && (
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeRisque(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        
                        <FormField
                          control={form.control}
                          name={`risquesIdentifies.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description du risque</FormLabel>
                              <div className="flex items-start gap-2">
                                <FormControl className="flex-grow">
                                  <Textarea 
                                    placeholder="Décrivez le risque" 
                                    className="min-h-[80px]" 
                                    {...field} 
                                  />
                                </FormControl>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  className="mt-0"
                                  onClick={() => handleSuggestWithAI(`risque-${index}`)}
                                  disabled={isGeneratingAi}
                                >
                                  {isGeneratingAi ? '...' : 'Suggérer'}
                                </Button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <FormField
                            control={form.control}
                            name={`risquesIdentifies.${index}.niveau`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Niveau de risque</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionnez un niveau" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="faible">Faible</SelectItem>
                                    <SelectItem value="moyen">Moyen</SelectItem>
                                    <SelectItem value="eleve">Élevé</SelectItem>
                                    <SelectItem value="critique">Critique</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`risquesIdentifies.${index}.zone`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Zone concernée</FormLabel>
                                <FormControl>
                                  <Input placeholder="Zone ou lieu du risque" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2"
                      onClick={() => appendRisque({ description: '', niveau: 'moyen', zone: '' })}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Ajouter un risque
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Mesures de prévention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {mesuresFields.map((field, index) => (
                      <div key={field.id} className="mb-6 p-4 border border-formBorder rounded-md">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-medium">Mesure #{index + 1}</h4>
                          {index > 0 && (
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeMesure(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        
                        <FormField
                          control={form.control}
                          name={`mesuresPrevention.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description de la mesure</FormLabel>
                              <div className="flex items-start gap-2">
                                <FormControl className="flex-grow">
                                  <Textarea 
                                    placeholder="Décrivez la mesure de prévention" 
                                    className="min-h-[80px]" 
                                    {...field} 
                                  />
                                </FormControl>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  className="mt-0"
                                  onClick={() => handleSuggestWithAI(`mesure-${index}`)}
                                  disabled={isGeneratingAi}
                                >
                                  {isGeneratingAi ? '...' : 'Suggérer'}
                                </Button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <FormField
                            control={form.control}
                            name={`mesuresPrevention.${index}.responsable`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Responsable</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionnez un responsable" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="entrepriseUtilisatrice">Entreprise utilisatrice</SelectItem>
                                    <SelectItem value="entrepriseExterieure">Entreprise extérieure</SelectItem>
                                    <SelectItem value="les deux">Les deux entreprises</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`mesuresPrevention.${index}.statut`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Statut</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionnez un statut" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="planifiee">Planifiée</SelectItem>
                                    <SelectItem value="en cours">En cours</SelectItem>
                                    <SelectItem value="realisee">Réalisée</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name={`mesuresPrevention.${index}.dateRealisation`}
                          render={({ field }) => (
                            <FormItem className="flex flex-col mt-4">
                              <FormLabel>Date de réalisation (optionnelle)</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full md:w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, 'P', { locale: fr })
                                      ) : (
                                        <span>Sélectionner une date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                    className="rounded-md border p-3 pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2"
                      onClick={() => appendMesure({ description: '', responsable: 'les deux', statut: 'planifiee' })}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Ajouter une mesure
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="personnel" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Personnel autorisé</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {personnelFields.map((field, index) => (
                      <div key={field.id} className="mb-6 p-4 border border-formBorder rounded-md">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-medium">Personne #{index + 1}</h4>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removePersonnel(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <FormField
                            control={form.control}
                            name={`personnelAutorise.${index}.nom`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nom" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`personnelAutorise.${index}.prenom`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Prénom</FormLabel>
                                <FormControl>
                                  <Input placeholder="Prénom" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <FormField
                            control={form.control}
                            name={`personnelAutorise.${index}.fonction`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Fonction</FormLabel>
                                <FormControl>
                                  <Input placeholder="Fonction ou poste" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`personnelAutorise.${index}.entreprise`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Entreprise</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionnez l'entreprise" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="utilisatrice">Entreprise utilisatrice</SelectItem>
                                    <SelectItem value="exterieure">Entreprise extérieure</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        {/* Les autorisations seraient normalement gérées avec Checkbox, mais pour simplifier, on utilise select multiple */}
                        <FormField
                          control={form.control}
                          name={`personnelAutorise.${index}.autorisation`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Autorisations</FormLabel>
                              <FormControl>
                                <Select 
                                  onValueChange={(value) => field.onChange([...field.value || [], value])}
                                  value={field.value ? field.value[field.value.length - 1] : undefined}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Ajouter une autorisation" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {autorisationOptions.map(option => (
                                      <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormDescription>
                                Autorisations sélectionnées: {field.value?.map(id => {
                                  const option = autorisationOptions.find(o => o.id === id);
                                  return option ? option.label : id;
                                }).join(', ')}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => appendPersonnel({ 
                        nom: '', 
                        prenom: '', 
                        fonction: '', 
                        entreprise: 'exterieure', 
                        autorisation: [] 
                      })}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Ajouter une personne
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="consignes" className="space-y-6">
                <FormField
                  control={form.control}
                  name="materielsUtilises"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matériels utilisés</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez les matériels utilisés pour l'intervention" 
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
                  name="consignesParticulieres"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consignes particulières</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Précisez les consignes particulières à respecter" 
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
                  Créer le plan
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default PlanPreventionCreate;
