
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar as CalendarIcon, Trash2, PlusCircle, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import Layout from '@/components/layout/Layout';
import apiConfig from '@/config/apiEndpoints';
import { EstablishmentEvent } from '@/types/establishment';

// Schéma de validation pour le formulaire Plan de Prévention
const planPreventionSchema = z.object({
  title: z.string().min(3, { message: "Le titre doit contenir au moins 3 caractères" }),
  establishmentId: z.string().min(1, { message: "Veuillez sélectionner un établissement" }),
  entrepriseUtilisatrice: z.string().min(3, { message: "Veuillez indiquer le nom de l'entreprise utilisatrice" }),
  entrepriseExterieure: z.string().min(3, { message: "Veuillez indiquer le nom de l'entreprise extérieure" }),
  natureTravaux: z.string().min(10, { message: "La nature des travaux doit être détaillée (min. 10 caractères)" }),
  dateDebutTravaux: z.date({ required_error: "La date de début est requise" }),
  dateFinTravaux: z.date({ required_error: "La date de fin est requise" }),
  lieuIntervention: z.string().min(5, { message: "Veuillez préciser le lieu d'intervention" }),
  risquesIdentifies: z.array(z.object({
    id: z.string(),
    description: z.string().min(5, { message: "La description du risque est requise" }),
    niveau: z.enum(['faible', 'moyen', 'eleve', 'critique']),
    zone: z.string()
  })).min(1, { message: "Au moins un risque doit être identifié" }),
  mesuresPrevention: z.array(z.object({
    id: z.string(),
    risqueId: z.string(),
    description: z.string().min(5, { message: "La description de la mesure est requise" }),
    responsable: z.enum(['entrepriseUtilisatrice', 'entrepriseExterieure', 'les deux']),
    statut: z.enum(['planifiee', 'en cours', 'realisee'])
  })),
  personnelAutorise: z.array(z.object({
    id: z.string(),
    nom: z.string().min(2, { message: "Le nom est requis" }),
    prenom: z.string().min(2, { message: "Le prénom est requis" }),
    fonction: z.string().min(2, { message: "La fonction est requise" }),
    entreprise: z.enum(['utilisatrice', 'exterieure']),
    autorisation: z.array(z.string())
  })),
  materielsUtilises: z.string(),
  consignesParticulieres: z.string()
});

type PlanPreventionFormValues = z.infer<typeof planPreventionSchema>;

// Générer un ID unique
const generateId = () => `id_${Math.random().toString(36).substring(2, 11)}`;

const PlanPreventionCreate = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("informations");
  const [establishments, setEstablishments] = useState<EstablishmentEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [currentField, setCurrentField] = useState<string | null>(null);
  
  // Initialiser le formulaire
  const form = useForm<PlanPreventionFormValues>({
    resolver: zodResolver(planPreventionSchema),
    defaultValues: {
      title: "",
      establishmentId: "",
      entrepriseUtilisatrice: "",
      entrepriseExterieure: "",
      natureTravaux: "",
      dateDebutTravaux: undefined,
      dateFinTravaux: undefined,
      lieuIntervention: "",
      risquesIdentifies: [
        {
          id: generateId(),
          description: "",
          niveau: "moyen",
          zone: ""
        }
      ],
      mesuresPrevention: [],
      personnelAutorise: [
        {
          id: generateId(),
          nom: "",
          prenom: "",
          fonction: "",
          entreprise: "exterieure",
          autorisation: []
        }
      ],
      materielsUtilises: "",
      consignesParticulieres: ""
    }
  });
  
  // Gestion des tableaux de champs avec useFieldArray
  const risquesArray = useFieldArray({
    control: form.control,
    name: "risquesIdentifies"
  });
  
  const mesuresArray = useFieldArray({
    control: form.control,
    name: "mesuresPrevention"
  });
  
  const personnelArray = useFieldArray({
    control: form.control,
    name: "personnelAutorise"
  });
  
  // Simuler la récupération des établissements (à remplacer par un appel API réel)
  useState(() => {
    // Simulation d'un appel API
    setEstablishments([
      {
        id: "1",
        nom: "Usine Alpha",
        type: "Site industriel",
        adresse: {
          rue: "10 Rue de l'Industrie",
          codePostal: "69000",
          ville: "Lyon",
          pays: "France"
        },
        jauge: 200,
        specificDetails: {
          surface: 5000,
          activitePrincipale: "Production industrielle",
        },
        userId: "user123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "2",
        nom: "Entrepôt Beta",
        type: "Entrepôt logistique",
        adresse: {
          rue: "5 Avenue Logistique",
          codePostal: "33000",
          ville: "Bordeaux",
          pays: "France"
        },
        jauge: 100,
        specificDetails: {
          surface: 8000,
          activitePrincipale: "Stockage et logistique",
        },
        userId: "user123",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  }, []);
  
  // Fonction pour soumettre le formulaire
  const onSubmit = async (data: PlanPreventionFormValues) => {
    try {
      setIsLoading(true);
      
      // Simuler un appel API
      console.log("Données à envoyer:", data);
      
      toast.success("Plan de prévention créé avec succès");
      // Rediriger vers la page de relecture (simulée)
      setTimeout(() => {
        navigate("/documents/new-plan-id/relecture");
      }, 1500);
      
    } catch (error) {
      console.error("Erreur lors de la création du plan de prévention:", error);
      toast.error("Une erreur est survenue lors de la création du plan de prévention");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fonction pour récupérer une suggestion IA pour un champ
  const getSuggestion = async (field: string) => {
    try {
      setIsSuggesting(true);
      setCurrentField(field);
      
      // Collecter les données pertinentes du formulaire
      const formData = form.getValues();
      
      // Construire le prompt en fonction du champ
      const promptData = {
        field,
        establishmentData: establishments.find(e => e.id === formData.establishmentId),
        currentValues: formData
      };
      
      console.log("Données pour l'IA:", promptData);
      
      // Simuler un appel API à l'IA (à remplacer par un appel réel)
      const simulateAIResponse = () => {
        const responses: Record<string, string> = {
          natureTravaux: "Installation et maintenance des systèmes de ventilation dans les espaces de production. Les travaux comprennent le démontage des anciens conduits, l'installation de nouveaux équipements et le raccordement électrique des systèmes.",
          consignesParticulieres: "Porter les EPI adaptés en permanence sur le site (casque, chaussures de sécurité, gilet haute visibilité). Respecter le plan de circulation. Signaler toute situation dangereuse au responsable de site. Une autorisation d'accès journalière est requise pour accéder aux zones restreintes.",
          materielsUtilises: "- Échafaudages mobiles certifiés\n- Outillages électroportatifs aux normes CE\n- Appareils de mesure électrique\n- Équipements de levage (charge max 500kg)\n- Caisse à outils complète\n- Matériel de soudure"
        };
        
        return responses[field] || "Suggestion IA non disponible pour ce champ.";
      };
      
      setTimeout(() => {
        const response = simulateAIResponse();
        setSuggestion(response);
        setIsSuggesting(false);
      }, 1500);
      
    } catch (error) {
      console.error("Erreur lors de la génération de suggestions:", error);
      toast.error("Une erreur est survenue lors de la génération de suggestions");
      setIsSuggesting(false);
    }
  };
  
  // Appliquer la suggestion au champ actuel
  const applySuggestion = () => {
    if (currentField && suggestion) {
      form.setValue(currentField as any, suggestion, { shouldValidate: true });
      setSuggestion("");
      setCurrentField(null);
      toast.success("Suggestion appliquée");
    }
  };
  
  // Ajouter une mesure de prévention pour un risque
  const addMesurePrevention = (risqueId: string) => {
    mesuresArray.append({
      id: generateId(),
      risqueId: risqueId,
      description: "",
      responsable: "les deux",
      statut: "planifiee"
    });
    
    // Passer à l'onglet des mesures
    setCurrentTab("mesures");
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Créer un Plan de Prévention</h1>
          <p className="text-gray-600">
            Ce document permet de coordonner les mesures de prévention lors de l'intervention d'entreprises extérieures.
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
                <CardDescription>
                  Détails de base pour votre Plan de Prévention.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre du document</FormLabel>
                      <FormControl>
                        <Input placeholder="Plan de Prévention - [Nature des travaux]" {...field} />
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
                      <FormLabel>Site d'intervention</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un site" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {establishments.map((establishment) => (
                            <SelectItem key={establishment.id} value={establishment.id}>
                              {establishment.nom} ({establishment.adresse.ville})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="informations">Entreprises</TabsTrigger>
                <TabsTrigger value="risques">Risques</TabsTrigger>
                <TabsTrigger value="mesures">Mesures</TabsTrigger>
                <TabsTrigger value="personnel">Personnel</TabsTrigger>
              </TabsList>
              
              <TabsContent value="informations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations des entreprises</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
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
                              Entreprise qui accueille les travaux sur son site.
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
                              Entreprise qui intervient sur le site.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="lieuIntervention"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lieu précis d'intervention</FormLabel>
                          <FormControl>
                            <Input placeholder="Bâtiment, étage, zone..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid md:grid-cols-2 gap-6">
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
                                      format(field.value, "P", { locale: fr })
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
                                  className="pointer-events-auto"
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
                                      format(field.value, "P", { locale: fr })
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
                                  className="pointer-events-auto"
                                  disabled={(date) => {
                                    const debut = form.getValues("dateDebutTravaux");
                                    return debut ? date < debut : false;
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
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
                          <div className="flex justify-between items-center">
                            <FormLabel>Nature des travaux</FormLabel>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              onClick={() => getSuggestion("natureTravaux")}
                              disabled={isSuggesting}
                            >
                              <Wand2 className="mr-2 h-4 w-4" />
                              Suggérer
                            </Button>
                          </div>
                          <FormControl>
                            <Textarea 
                              placeholder="Description détaillée des travaux à réaliser..." 
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="risques" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Risques identifiés</CardTitle>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          risquesArray.append({
                            id: generateId(),
                            description: "",
                            niveau: "moyen",
                            zone: ""
                          });
                        }}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Ajouter un risque
                      </Button>
                    </div>
                    <CardDescription>
                      Identifiez les risques liés à l'intervention.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {risquesArray.fields.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>Aucun risque identifié. Cliquez sur "Ajouter un risque".</p>
                      </div>
                    ) : (
                      risquesArray.fields.map((risque, index) => (
                        <Card key={risque.id} className="border-l-4 border-l-amber-500">
                          <CardContent className="pt-6">
                            <div className="grid md:grid-cols-2 gap-6 mb-4">
                              <FormField
                                control={form.control}
                                name={`risquesIdentifies.${index}.description`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Description du risque</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Description du risque" {...field} />
                                    </FormControl>
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
                            
                            <div className="flex items-end justify-between gap-4">
                              <FormField
                                control={form.control}
                                name={`risquesIdentifies.${index}.niveau`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormLabel>Niveau de risque</FormLabel>
                                    <Select 
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Niveau" />
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
                              
                              <div className="flex gap-2">
                                <Button 
                                  type="button" 
                                  variant="outline"
                                  onClick={() => addMesurePrevention(risque.id)}
                                >
                                  Ajouter une mesure
                                </Button>
                                
                                {index > 0 && (
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => risquesArray.remove(index)}
                                    size="icon"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="mesures" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Mesures de prévention</CardTitle>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          const risques = form.getValues("risquesIdentifies");
                          if (risques.length > 0) {
                            mesuresArray.append({
                              id: generateId(),
                              risqueId: risques[0].id,
                              description: "",
                              responsable: "les deux",
                              statut: "planifiee"
                            });
                          } else {
                            toast.error("Veuillez d'abord ajouter un risque");
                            setCurrentTab("risques");
                          }
                        }}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Ajouter une mesure
                      </Button>
                    </div>
                    <CardDescription>
                      Définissez les mesures pour prévenir chaque risque identifié.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {mesuresArray.fields.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>Aucune mesure de prévention définie. Cliquez sur "Ajouter une mesure".</p>
                      </div>
                    ) : (
                      mesuresArray.fields.map((mesure, index) => (
                        <Card key={mesure.id} className="border-l-4 border-l-green-500">
                          <CardContent className="pt-6">
                            <div className="mb-4">
                              <FormField
                                control={form.control}
                                name={`mesuresPrevention.${index}.risqueId`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Risque concerné</FormLabel>
                                    <Select 
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Sélectionner un risque" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {form.getValues("risquesIdentifies").map((risque) => (
                                          <SelectItem key={risque.id} value={risque.id}>
                                            {risque.description || "Risque sans description"}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="mb-4">
                              <FormField
                                control={form.control}
                                name={`mesuresPrevention.${index}.description`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Description de la mesure</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="Détaillez la mesure de prévention..." 
                                        className="min-h-[100px]" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name={`mesuresPrevention.${index}.responsable`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Responsable</FormLabel>
                                    <Select 
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Sélectionner un responsable" />
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
                                    <Select 
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Sélectionner un statut" />
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
                            
                            <div className="flex justify-end mt-4">
                              <Button
                                type="button"
                                variant="destructive"
                                onClick={() => mesuresArray.remove(index)}
                                size="icon"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="personnel" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Personnel autorisé</CardTitle>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          personnelArray.append({
                            id: generateId(),
                            nom: "",
                            prenom: "",
                            fonction: "",
                            entreprise: "exterieure",
                            autorisation: []
                          });
                        }}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Ajouter une personne
                      </Button>
                    </div>
                    <CardDescription>
                      Identifiez le personnel autorisé à intervenir.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {personnelArray.fields.map((personne, index) => (
                      <Card key={personne.id}>
                        <CardContent className="pt-6">
                          <div className="grid md:grid-cols-3 gap-4 mb-4">
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
                            
                            <FormField
                              control={form.control}
                              name={`personnelAutorise.${index}.fonction`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Fonction</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Fonction" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="mb-4">
                            <FormField
                              control={form.control}
                              name={`personnelAutorise.${index}.entreprise`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Entreprise</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner une entreprise" />
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
                          
                          <div className="flex justify-end">
                            {index > 0 && (
                              <Button
                                type="button"
                                variant="destructive"
                                onClick={() => personnelArray.remove(index)}
                                size="icon"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {/* Matériels et consignes */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Matériels et consignes</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <FormField
                          control={form.control}
                          name="materielsUtilises"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>Matériels utilisés</FormLabel>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => getSuggestion("materielsUtilises")}
                                  disabled={isSuggesting}
                                >
                                  <Wand2 className="mr-2 h-4 w-4" />
                                  Suggérer
                                </Button>
                              </div>
                              <FormControl>
                                <Textarea 
                                  placeholder="Liste des matériels et équipements utilisés..." 
                                  className="min-h-[100px]" 
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
                              <div className="flex justify-between items-center">
                                <FormLabel>Consignes particulières</FormLabel>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => getSuggestion("consignesParticulieres")}
                                  disabled={isSuggesting}
                                >
                                  <Wand2 className="mr-2 h-4 w-4" />
                                  Suggérer
                                </Button>
                              </div>
                              <FormControl>
                                <Textarea 
                                  placeholder="Consignes particulières à respecter..." 
                                  className="min-h-[100px]" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* Panneau de suggestion IA */}
            {suggestion && (
              <Card className="border-accentBleu">
                <CardHeader className="bg-accentBleu/10">
                  <CardTitle className="text-accentBleu text-lg">Suggestion IA</CardTitle>
                  <CardDescription>
                    Voici une suggestion pour le champ sélectionné. Vous pouvez l'utiliser ou la modifier.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="bg-formBackground p-4 rounded-md border border-formBorder">
                    {suggestion}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSuggestion("");
                      setCurrentField(null);
                    }}
                  >
                    Ignorer
                  </Button>
                  <Button 
                    type="button"
                    onClick={applySuggestion}
                  >
                    Appliquer la suggestion
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Annuler
              </Button>
              
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    form.handleSubmit((data) => {
                      // Enregistrer en brouillon
                      console.log("Enregistrer en brouillon:", data);
                      toast.success("Document enregistré en brouillon");
                    })();
                  }}
                >
                  Enregistrer en brouillon
                </Button>
                
                <Button 
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading ? "Création en cours..." : "Créer le Plan de Prévention"}
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
