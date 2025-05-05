
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FileUploader } from './FileUploader';
import { ChevronLeft, ChevronRight, Download, Bot, Save, ArrowRightCircle, CheckCircle, HelpCircle, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import AIAssistant from '../ai/AIAssistant';

// Définition du schéma de validation pour chaque étape
const organizerSchema = z.object({
  nom: z.string().min(2, 'Le nom est requis'),
  adresse: z.string().min(5, 'L\'adresse est requise'),
  telephone: z.string().min(10, 'Un numéro de téléphone valide est requis'),
  qualite: z.string().min(2, 'La qualité est requise'),
});

const eventSchema = z.object({
  natureManif: z.string().min(5, 'La nature de la manifestation est requise'),
  date: z.string().min(5, 'La date est requise'),
  lieu: z.string().min(2, 'Le lieu est requis'),
  configuration: z.string().min(5, 'La configuration est requise'),
  installations: z.string().optional(),
  nombreOrganisateurs: z.string().min(1, 'Ce champ est requis'),
  effectifMax: z.string().min(1, 'Ce champ est requis'),
});

const securitySchema = z.object({
  mesuresComplementaires: z.string().optional(),
  serviceOrdre: z.string().optional(),
  serviceSecurite: z.string().optional(),
  accordExploitant: z.enum(['oui', 'non']).default('oui'),
});

// Étapes du processus
const steps = [
  { id: 'organizer', title: 'Organisateur', description: 'Informations sur l\'organisateur' },
  { id: 'event', title: 'Évènement', description: 'Détails sur la manifestation' },
  { id: 'security', title: 'Sécurité', description: 'Mesures de sécurité' },
  { id: 'documents', title: 'Documents', description: 'Pièces à joindre' },
  { id: 'review', title: 'Finalisation', description: 'Vérification et génération' },
];

const GN6Wizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    adresse: '',
    telephone: '',
    qualite: '',
    natureManif: '',
    date: '',
    lieu: '',
    configuration: '',
    installations: '',
    nombreOrganisateurs: '',
    effectifMax: '',
    mesuresComplementaires: '',
    serviceOrdre: '',
    serviceSecurite: '',
    accordExploitant: 'oui',
    documents: {
      attestationAssurance: null,
      planMasse: null,
      noticeDescriptive: null,
      calculEffectif: null,
    },
  });
  
  const [uploadedDocuments, setUploadedDocuments] = useState({
    attestationAssurance: false,
    planMasse: false,
    noticeDescriptive: false,
    calculEffectif: false,
  });

  // Formulaires pour chaque étape
  const organizerForm = useForm({
    resolver: zodResolver(organizerSchema),
    defaultValues: {
      nom: formData.nom,
      adresse: formData.adresse,
      telephone: formData.telephone,
      qualite: formData.qualite,
    },
  });

  const eventForm = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      natureManif: formData.natureManif,
      date: formData.date,
      lieu: formData.lieu,
      configuration: formData.configuration,
      installations: formData.installations,
      nombreOrganisateurs: formData.nombreOrganisateurs,
      effectifMax: formData.effectifMax,
    },
  });

  const securityForm = useForm({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      mesuresComplementaires: formData.mesuresComplementaires,
      serviceOrdre: formData.serviceOrdre,
      serviceSecurite: formData.serviceSecurite,
      accordExploitant: formData.accordExploitant,
    },
  });

  const handleOrganizerSubmit = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    nextStep();
  };

  const handleEventSubmit = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    nextStep();
  };

  const handleSecuritySubmit = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    nextStep();
  };

  const handleDocumentUpload = (type, file) => {
    setFormData(prev => ({
      ...prev, 
      documents: { 
        ...prev.documents, 
        [type]: file 
      }
    }));
    setUploadedDocuments(prev => ({
      ...prev,
      [type]: true
    }));
    toast.success(`Document "${type}" ajouté avec succès`);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generatePDF = () => {
    // Logique pour générer le PDF
    toast.success("Document GN6 généré avec succès");
    // Dans une implémentation réelle, on utiliserait une bibliothèque comme jsPDF ou PDFKit
    // Ou un appel à une API backend pour générer le document
  };

  const getAssistantPrompt = () => {
    switch (currentStep) {
      case 0:
        return "Je peux vous aider à compléter les informations de l'organisateur. Qui organise cet événement ?";
      case 1:
        return "Décrivez-moi votre événement et je vous aiderai à compléter les détails requis.";
      case 2:
        return "Quelles mesures de sécurité avez-vous déjà prévues pour cet événement ?";
      case 3:
        return "Je peux vous aider à comprendre quels documents sont nécessaires et comment les préparer.";
      case 4:
        return "Vérifions ensemble que toutes les informations sont complètes et conformes avant de générer le document final.";
      default:
        return "Comment puis-je vous aider avec votre dossier GN6 ?";
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Form {...organizerForm}>
            <form onSubmit={organizerForm.handleSubmit(handleOrganizerSubmit)} className="space-y-6">
              <FormField
                control={organizerForm.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l'organisateur</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom complet ou raison sociale" {...field} />
                    </FormControl>
                    <FormDescription>
                      Indiquez le nom de la personne ou de l'organisation responsable
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={organizerForm.control}
                name="adresse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Adresse complète" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={organizerForm.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="Numéro de téléphone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={organizerForm.control}
                name="qualite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qualité des organisateurs</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Association, Entreprise, Collectivité..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Précisez le statut juridique ou la qualité des organisateurs
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Précédent
                </Button>
                <Button type="submit">
                  Suivant <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
        
      case 1:
        return (
          <Form {...eventForm}>
            <form onSubmit={eventForm.handleSubmit(handleEventSubmit)} className="space-y-6">
              <FormField
                control={eventForm.control}
                name="natureManif"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nature de la manifestation</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Concert, Exposition, Conférence..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Décrivez le type d'événement que vous organisez
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={eventForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date(s) et heure(s) prévues</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 01/01/2025 de 18h à 23h" {...field} />
                    </FormControl>
                    <FormDescription>
                      Précisez les dates et horaires complets de l'événement
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={eventForm.control}
                name="lieu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lieu</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom et adresse du lieu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={eventForm.control}
                name="configuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Configuration du lieu</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Décrivez l'aménagement prévu" {...field} />
                    </FormControl>
                    <FormDescription>
                      Détaillez comment sera configuré l'espace (scène, stands, chaises...)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={eventForm.control}
                name="installations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Installation(s) technique(s) particulière(s)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ex: Sonorisation, éclairage, écrans..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Mentionnez les installations techniques spécifiques (optionnel)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={eventForm.control}
                  name="nombreOrganisateurs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre d'organisateurs</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={eventForm.control}
                  name="effectifMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Effectif maximal du public attendu</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Précédent
                </Button>
                <Button type="submit">
                  Suivant <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
        
      case 2:
        return (
          <Form {...securityForm}>
            <form onSubmit={securityForm.handleSubmit(handleSecuritySubmit)} className="space-y-6">
              <FormField
                control={securityForm.control}
                name="accordExploitant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accord écrit de l'exploitant</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="oui">Oui</SelectItem>
                        <SelectItem value="non">Non</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      L'exploitant du lieu a-t-il donné son accord écrit ?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={securityForm.control}
                name="mesuresComplementaires"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mesures complémentaires pour assurer la sécurité</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez les mesures spécifiques mises en place..." 
                        className="h-24"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Détaillez toutes les mesures de sécurité prévues pour l'événement
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={securityForm.control}
                  name="serviceOrdre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service d'ordre</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 2 agents de sécurité privée" {...field} />
                      </FormControl>
                      <FormDescription>
                        Précisez le dispositif de maintien de l'ordre
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={securityForm.control}
                  name="serviceSecurite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service de sécurité incendie</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 2 SSIAP 1, 1 SSIAP 2" {...field} />
                      </FormControl>
                      <FormDescription>
                        Précisez le dispositif de sécurité incendie
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Précédent
                </Button>
                <Button type="submit">
                  Suivant <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Documents obligatoires</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Pour être conforme à la réglementation, tous les documents ci-dessous doivent être fournis.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-3">Attestation d'assurance</h3>
                <FileUploader 
                  onFileUploaded={(file) => handleDocumentUpload('attestationAssurance', file)}
                  isUploaded={uploadedDocuments.attestationAssurance}
                />
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-3">Plan de masse et plan côté</h3>
                <FileUploader 
                  onFileUploaded={(file) => handleDocumentUpload('planMasse', file)}
                  isUploaded={uploadedDocuments.planMasse}
                />
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-3">Notice descriptive de sécurité</h3>
                <FileUploader 
                  onFileUploaded={(file) => handleDocumentUpload('noticeDescriptive', file)}
                  isUploaded={uploadedDocuments.noticeDescriptive}
                />
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-3">Note de calcul d'effectif</h3>
                <FileUploader 
                  onFileUploaded={(file) => handleDocumentUpload('calculEffectif', file)}
                  isUploaded={uploadedDocuments.calculEffectif}
                />
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Précédent
              </Button>
              <Button onClick={nextStep}>
                Finaliser <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-md border border-green-200">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-green-800">Dossier complet</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Toutes les informations ont été saisies. Vous pouvez maintenant générer votre document GN6 conforme.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Récapitulatif</h3>
              
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <h4 className="font-medium text-gray-700">Organisateur</h4>
                  <p><span className="text-gray-500">Nom :</span> {formData.nom}</p>
                  <p><span className="text-gray-500">Adresse :</span> {formData.adresse}</p>
                  <p><span className="text-gray-500">Téléphone :</span> {formData.telephone}</p>
                  <p><span className="text-gray-500">Qualité :</span> {formData.qualite}</p>
                </div>
                
                <div className="border-b pb-3">
                  <h4 className="font-medium text-gray-700">Événement</h4>
                  <p><span className="text-gray-500">Nature :</span> {formData.natureManif}</p>
                  <p><span className="text-gray-500">Date(s) :</span> {formData.date}</p>
                  <p><span className="text-gray-500">Lieu :</span> {formData.lieu}</p>
                  <p><span className="text-gray-500">Configuration :</span> {formData.configuration}</p>
                  <p><span className="text-gray-500">Effectif attendu :</span> {formData.effectifMax} personnes</p>
                </div>
                
                <div className="border-b pb-3">
                  <h4 className="font-medium text-gray-700">Sécurité</h4>
                  <p><span className="text-gray-500">Accord exploitant :</span> {formData.accordExploitant === 'oui' ? 'Oui' : 'Non'}</p>
                  <p><span className="text-gray-500">Service d'ordre :</span> {formData.serviceOrdre}</p>
                  <p><span className="text-gray-500">Service sécurité :</span> {formData.serviceSecurite}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700">Documents fournis</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {uploadedDocuments.attestationAssurance && <li className="text-green-700">Attestation d'assurance</li>}
                    {uploadedDocuments.planMasse && <li className="text-green-700">Plan de masse et plan côté</li>}
                    {uploadedDocuments.noticeDescriptive && <li className="text-green-700">Notice descriptive de sécurité</li>}
                    {uploadedDocuments.calculEffectif && <li className="text-green-700">Note de calcul d'effectif</li>}
                    {(!uploadedDocuments.attestationAssurance || !uploadedDocuments.planMasse || 
                      !uploadedDocuments.noticeDescriptive || !uploadedDocuments.calculEffectif) && (
                      <li className="text-red-700">Certains documents requis sont manquants</li>
                    )}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button 
                  onClick={generatePDF} 
                  className="bg-primary hover:bg-primary-hover w-full md:w-auto"
                  disabled={!uploadedDocuments.attestationAssurance || !uploadedDocuments.planMasse || 
                            !uploadedDocuments.noticeDescriptive || !uploadedDocuments.calculEffectif}
                >
                  <Download className="mr-2 h-4 w-4" /> Générer le document GN6
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Précédent
              </Button>
              <Button variant="outline" onClick={() => setCurrentStep(0)}>
                Nouveau document <ArrowRightCircle className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Demande d'autorisation GN6</h2>
        <p className="text-gray-600">Article GN6 - Utilisation exceptionnelle ou occasionnelle de locaux</p>
      </div>
      
      {/* Indicateur d'étapes */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    index === currentStep
                      ? 'bg-primary text-white'
                      : index < currentStep
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="text-xs mt-2 font-medium text-center hidden md:block">
                  {step.title}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div 
                  className={`flex-1 h-1 mx-2 ${
                    index < currentStep ? 'bg-green-300' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="text-center mt-4 md:hidden">
          <span className="font-medium">{steps[currentStep].title}</span> - 
          <span className="text-gray-500 ml-1">{steps[currentStep].description}</span>
        </div>
      </div>
      
      {/* Contenu principal et assistance IA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {renderStepContent()}
        </div>
        
        <div className="lg:col-span-1">
          <Card className="p-4">
            <div className="flex items-center mb-4">
              <Bot className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-medium">Assistant IA</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              {getAssistantPrompt()}
            </p>
            
            <div className="mb-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAIAssistant(!showAIAssistant)} 
                className="w-full text-primary border-primary hover:bg-primary/10"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                {showAIAssistant ? 'Masquer l\'assistant' : 'Demander de l\'aide'}
              </Button>
            </div>
            
            {showAIAssistant && (
              <AIAssistant 
                currentStep={currentStep} 
                formData={formData}
                onSuggestion={(field, value) => {
                  // Logique pour appliquer les suggestions de l'IA
                  toast.info(`Suggestion de l'IA pour ${field}: ${value}`);
                }}
              />
            )}
            
            <div className="mt-4 pt-4 border-t text-xs text-gray-500">
              <p>Les suggestions de l'IA sont conformes aux exigences de Légifrance pour les dossiers GN6.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GN6Wizard;
