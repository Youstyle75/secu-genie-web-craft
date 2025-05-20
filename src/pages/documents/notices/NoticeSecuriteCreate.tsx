
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import apiConfig from '@/config/apiEndpoints';
import { EstablishmentEvent } from '@/types/establishment';

// Schéma de validation pour le formulaire Notice de Sécurité
const noticeSecuriteSchema = z.object({
  title: z.string().min(3, { message: "Le titre doit contenir au moins 3 caractères" }),
  establishmentId: z.string().min(1, { message: "Veuillez sélectionner un établissement" }),
  descriptionEtablissement: z.string().min(10, { message: "La description doit contenir au moins 10 caractères" }),
  moyensSecours: z.string().min(10, { message: "Ce champ doit contenir au moins 10 caractères" }),
  consignesEvacuation: z.string().min(10, { message: "Ce champ doit contenir au moins 10 caractères" }),
  preventionIncendie: z.string().min(10, { message: "Ce champ doit contenir au moins 10 caractères" }),
  accessibiliteSecours: z.string().min(10, { message: "Ce champ doit contenir au moins 10 caractères" }),
  classementType: z.string().min(1, { message: "Veuillez indiquer le classement de l'établissement" }),
  effectifMaximum: z.coerce.number().min(1, { message: "L'effectif doit être d'au moins 1 personne" }),
  dispositionsParticulieres: z.string(),
  amenagements: z.string(),
  installationsTechniques: z.string()
});

type NoticeSecuriteFormValues = z.infer<typeof noticeSecuriteSchema>;

const NoticeSecuriteCreate = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("informations");
  const [establishments, setEstablishments] = useState<EstablishmentEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [currentField, setCurrentField] = useState<keyof NoticeSecuriteFormValues | null>(null);
  
  // Initialiser le formulaire
  const form = useForm<NoticeSecuriteFormValues>({
    resolver: zodResolver(noticeSecuriteSchema),
    defaultValues: {
      title: "",
      establishmentId: "",
      descriptionEtablissement: "",
      moyensSecours: "",
      consignesEvacuation: "",
      preventionIncendie: "",
      accessibiliteSecours: "",
      classementType: "",
      effectifMaximum: 0,
      dispositionsParticulieres: "",
      amenagements: "",
      installationsTechniques: ""
    }
  });
  
  // Simuler la récupération des établissements (à remplacer par un appel API réel)
  useState(() => {
    // Simulation d'un appel API
    setEstablishments([
      {
        id: "1",
        nom: "Salle des fêtes de Paris",
        type: "ERP Type L",
        adresse: {
          rue: "1 Rue de Paris",
          codePostal: "75001",
          ville: "Paris",
          pays: "France"
        },
        jauge: 500,
        specificDetails: {
          typeERP: "L",
          categorieERP: "3",
        },
        userId: "user123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "2",
        nom: "Théâtre Municipal",
        type: "ERP Type L",
        adresse: {
          rue: "5 Avenue des Arts",
          codePostal: "69000",
          ville: "Lyon",
          pays: "France"
        },
        jauge: 300,
        specificDetails: {
          typeERP: "L",
          categorieERP: "3",
        },
        userId: "user123",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  }, []);
  
  // Fonction pour soumettre le formulaire
  const onSubmit = async (data: NoticeSecuriteFormValues) => {
    try {
      setIsLoading(true);
      
      // Simuler un appel API
      console.log("Données à envoyer:", data);
      
      toast.success("Document créé avec succès");
      // Rediriger vers la page de relecture (simulée)
      setTimeout(() => {
        navigate("/documents/new-id/relecture");
      }, 1500);
      
    } catch (error) {
      console.error("Erreur lors de la création du document:", error);
      toast.error("Une erreur est survenue lors de la création du document");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fonction pour récupérer une suggestion IA pour un champ
  const getSuggestion = async (field: keyof NoticeSecuriteFormValues) => {
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
          descriptionEtablissement: "Établissement recevant du public de type L (salle de spectacle) de 3ème catégorie permettant l'accueil jusqu'à 500 personnes. Bâtiment principal sur deux niveaux avec accès direct sur la voie publique par 3 issues de secours principales.",
          moyensSecours: "Conformément à la réglementation pour les ERP de type L de 3ème catégorie, l'établissement est équipé d'un système d'alarme de type 3, d'extincteurs appropriés aux risques à tous les niveaux, d'un éclairage de sécurité, et d'un système de désenfumage mécanique.",
          consignesEvacuation: "En cas d'incendie ou d'alarme, l'évacuation se fait par les issues de secours signalées. Le personnel est formé pour guider les visiteurs vers les sorties et les points de rassemblement situés à l'extérieur du bâtiment. Des plans d'évacuation sont affichés à chaque étage.",
          preventionIncendie: "Vérification annuelle des installations électriques. Formation du personnel aux consignes de sécurité et à la manipulation des extincteurs. Exercices d'évacuation semestriels. Maintien des issues de secours dégagées en permanence.",
          accessibiliteSecours: "L'établissement est accessible aux véhicules de secours par l'entrée principale et l'accès de service à l'arrière du bâtiment. Une voie pompiers est maintenue libre en permanence autour du bâtiment. Des poteaux incendie sont situés à moins de 100m."
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
      form.setValue(currentField, suggestion, { shouldValidate: true });
      setSuggestion("");
      setCurrentField(null);
      toast.success("Suggestion appliquée");
    }
  };
  
  // Gestion du changement d'établissement
  const handleEstablishmentChange = (value: string) => {
    const selectedEstablishment = establishments.find(e => e.id === value);
    if (selectedEstablishment) {
      // Pré-remplir certains champs avec les informations de l'établissement
      form.setValue("classementType", `Type ${selectedEstablishment.specificDetails.typeERP || ''} - Catégorie ${selectedEstablishment.specificDetails.categorieERP || ''}`);
      form.setValue("effectifMaximum", selectedEstablishment.jauge);
    }
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Créer une Notice de Sécurité</h1>
          <p className="text-gray-600">
            Remplissez les informations requises pour générer votre Notice de Sécurité ERP.
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
                <CardDescription>
                  Détails de base pour votre Notice de Sécurité.
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
                        <Input placeholder="Notice de Sécurité - [Nom de l'établissement]" {...field} />
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
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleEstablishmentChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un établissement" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {establishments.map((establishment) => (
                            <SelectItem key={establishment.id} value={establishment.id}>
                              {establishment.nom} ({establishment.type})
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
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="informations">Informations</TabsTrigger>
                <TabsTrigger value="securite">Sécurité</TabsTrigger>
                <TabsTrigger value="installations">Installations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="informations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de l'établissement</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="descriptionEtablissement"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Description de l'établissement</FormLabel>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              onClick={() => getSuggestion("descriptionEtablissement")}
                              disabled={isSuggesting || !form.getValues("establishmentId")}
                            >
                              <Wand2 className="mr-2 h-4 w-4" />
                              Suggérer
                            </Button>
                          </div>
                          <FormControl>
                            <Textarea 
                              placeholder="Description détaillée de l'établissement..." 
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="classementType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Classement (Type et catégorie)</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Type L - Catégorie 3" {...field} />
                          </FormControl>
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
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="securite" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sécurité et évacuation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="moyensSecours"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Moyens de secours</FormLabel>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              onClick={() => getSuggestion("moyensSecours")}
                              disabled={isSuggesting || !form.getValues("establishmentId")}
                            >
                              <Wand2 className="mr-2 h-4 w-4" />
                              Suggérer
                            </Button>
                          </div>
                          <FormControl>
                            <Textarea 
                              placeholder="Décrivez les moyens de secours disponibles..." 
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="consignesEvacuation"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Consignes d'évacuation</FormLabel>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              onClick={() => getSuggestion("consignesEvacuation")}
                              disabled={isSuggesting || !form.getValues("establishmentId")}
                            >
                              <Wand2 className="mr-2 h-4 w-4" />
                              Suggérer
                            </Button>
                          </div>
                          <FormControl>
                            <Textarea 
                              placeholder="Détaillez les consignes d'évacuation..." 
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="preventionIncendie"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Prévention incendie</FormLabel>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              onClick={() => getSuggestion("preventionIncendie")}
                              disabled={isSuggesting || !form.getValues("establishmentId")}
                            >
                              <Wand2 className="mr-2 h-4 w-4" />
                              Suggérer
                            </Button>
                          </div>
                          <FormControl>
                            <Textarea 
                              placeholder="Mesures de prévention contre les incendies..." 
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="accessibiliteSecours"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Accessibilité pour les secours</FormLabel>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              onClick={() => getSuggestion("accessibiliteSecours")}
                              disabled={isSuggesting || !form.getValues("establishmentId")}
                            >
                              <Wand2 className="mr-2 h-4 w-4" />
                              Suggérer
                            </Button>
                          </div>
                          <FormControl>
                            <Textarea 
                              placeholder="Décrivez l'accessibilité pour les véhicules de secours..." 
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
              
              <TabsContent value="installations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Installations et aménagements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="dispositionsParticulieres"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dispositions particulières</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Dispositions particulières applicables..." 
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="amenagements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aménagements</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Aménagements intérieurs et extérieurs..." 
                              className="min-h-[120px]" 
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
                              placeholder="Installations techniques et équipements..." 
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
            </Tabs>
            
            {/* Panneau de suggestion IA */}
            {suggestion && (
              <Card className="border-accentBleu">
                <CardHeader className="bg-accentBleu/10">
                  <CardTitle className="text-accentBleu text-lg">Suggestion IA</CardTitle>
                  <CardDescription>
                    Voici une suggestion pour le champ "{currentField}". Vous pouvez l'utiliser ou la modifier.
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
                  {isLoading ? "Création en cours..." : "Créer la Notice de Sécurité"}
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
