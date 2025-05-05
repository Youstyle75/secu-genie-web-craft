
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileUploader } from '@/components/documents/FileUploader';
import { ArrowLeft, ArrowRight, Save, Download, FileCheck, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

// Define the types for our form data
interface GN6FormData {
  step1: {
    nom: string;
    adresse: string;
    telephone: string;
    qualite: string;
    accordExploitant: 'oui' | 'non';
    natureManif: string;
    date: string;
    lieu: string;
    configuration: string;
  };
  step2: {
    installations: string;
    nombreOrganisateurs: string;
    effectifMax: string;
    mesuresComplementaires: string;
    serviceOrdre: string;
    serviceSecurite: string;
  };
  step3: {
    documents: {
      formulaire: boolean;
      noteCalculEffectif: boolean;
      descriptifActivites: boolean;
      planSituation: boolean;
      planMasse: boolean;
      noticeSecurite: boolean;
      attestationAssurance: boolean;
      compositionService: boolean;
      certificatHomologation: boolean;
      attestationMontage: boolean;
      engagementOrganisme: boolean;
    };
    uploadedFiles: {
      [key: string]: File | null;
    };
  }
}

const GN6Wizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<GN6FormData>({
    step1: {
      nom: '',
      adresse: '',
      telephone: '',
      qualite: '',
      accordExploitant: 'oui',
      natureManif: '',
      date: '',
      lieu: '',
      configuration: '',
    },
    step2: {
      installations: '',
      nombreOrganisateurs: '',
      effectifMax: '',
      mesuresComplementaires: '',
      serviceOrdre: '',
      serviceSecurite: '',
    },
    step3: {
      documents: {
        formulaire: false,
        noteCalculEffectif: false,
        descriptifActivites: false,
        planSituation: false,
        planMasse: false,
        noticeSecurite: false,
        attestationAssurance: false,
        compositionService: false,
        certificatHomologation: false,
        attestationMontage: false,
        engagementOrganisme: false,
      },
      uploadedFiles: {}
    }
  });

  const handleChange = (step: number, field: string, value: string) => {
    if (step === 1) {
      setFormData({
        ...formData,
        step1: {
          ...formData.step1,
          [field]: value
        }
      });
    } else if (step === 2) {
      setFormData({
        ...formData,
        step2: {
          ...formData.step2,
          [field]: value
        }
      });
    }
  };

  const handleCheckboxChange = (documentKey: string, checked: boolean) => {
    setFormData({
      ...formData,
      step3: {
        ...formData.step3,
        documents: {
          ...formData.step3.documents,
          [documentKey]: checked
        }
      }
    });
  };

  const handleFileUpload = (documentKey: string, file: File) => {
    setFormData({
      ...formData,
      step3: {
        ...formData.step3,
        uploadedFiles: {
          ...formData.step3.uploadedFiles,
          [documentKey]: file
        }
      }
    });
    toast.success(`Fichier ${file.name} téléchargé avec succès`);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - generate document
      handleGenerateDocument();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateDocument = () => {
    // Logic to generate the final document would go here
    toast.success("Document GN6 généré avec succès!", {
      description: "Le document est prêt à être téléchargé."
    });
  };

  const documentsList = [
    { key: 'formulaire', label: 'Formulaire de demande d\'autorisation cosigné' },
    { key: 'noteCalculEffectif', label: 'Note détaillant le mode de calcul de l\'effectif théorique du public' },
    { key: 'descriptifActivites', label: 'Descriptif des activités et aménagements prévus' },
    { key: 'planSituation', label: 'Plan de situation' },
    { key: 'planMasse', label: 'Plan de masse et plan côté des locaux avec aménagements' },
    { key: 'noticeSecurite', label: 'Notice descriptive de sécurité' },
    { key: 'attestationAssurance', label: 'Attestation d\'assurance' },
    { key: 'compositionService', label: 'Composition du service de sécurité incendie' },
    { key: 'certificatHomologation', label: 'Certificat d\'homologation des structures démontables' },
    { key: 'attestationMontage', label: 'Attestation de bon montage des chapiteaux et tentes' },
    { key: 'engagementOrganisme', label: 'Engagement de l\'organisateur pour un organisme de contrôle' }
  ];

  return (
    <Tabs defaultValue="step1" className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="step1" disabled={currentStep !== 1}>
          Informations générales
        </TabsTrigger>
        <TabsTrigger value="step2" disabled={currentStep !== 2}>
          Détails techniques
        </TabsTrigger>
        <TabsTrigger value="step3" disabled={currentStep !== 3}>
          Documents obligatoires
        </TabsTrigger>
      </TabsList>

      <TabsContent value="step1" className={currentStep === 1 ? 'block' : 'hidden'}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Informations générales de l'événement</CardTitle>
            <CardDescription>
              Renseignez les informations de base concernant votre manifestation exceptionnelle
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="nom" className="text-sm font-medium">Nom</label>
                <input
                  id="nom"
                  type="text"
                  value={formData.step1.nom}
                  onChange={(e) => handleChange(1, 'nom', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Nom de l'organisateur"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="adresse" className="text-sm font-medium">Adresse</label>
                <input
                  id="adresse"
                  type="text"
                  value={formData.step1.adresse}
                  onChange={(e) => handleChange(1, 'adresse', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Adresse complète"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="telephone" className="text-sm font-medium">Téléphone</label>
                <input
                  id="telephone"
                  type="text"
                  value={formData.step1.telephone}
                  onChange={(e) => handleChange(1, 'telephone', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Numéro de téléphone"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="qualite" className="text-sm font-medium">Qualité des organisateurs</label>
                <input
                  id="qualite"
                  type="text"
                  value={formData.step1.qualite}
                  onChange={(e) => handleChange(1, 'qualite', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Ex: Association, Entreprise, etc."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Accord écrit de l'exploitant</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="accordExploitant"
                      value="oui"
                      checked={formData.step1.accordExploitant === 'oui'}
                      onChange={() => handleChange(1, 'accordExploitant', 'oui')}
                      className="form-radio"
                    />
                    <span>Oui</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="accordExploitant"
                      value="non"
                      checked={formData.step1.accordExploitant === 'non'}
                      onChange={() => handleChange(1, 'accordExploitant', 'non')}
                      className="form-radio"
                    />
                    <span>Non</span>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="natureManif" className="text-sm font-medium">Nature de la manifestation</label>
                <input
                  id="natureManif"
                  type="text"
                  value={formData.step1.natureManif}
                  onChange={(e) => handleChange(1, 'natureManif', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Ex: Concert, Exposition, etc."
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">Date(s) et heure(s) prévues</label>
                <input
                  id="date"
                  type="text"
                  value={formData.step1.date}
                  onChange={(e) => handleChange(1, 'date', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Ex: 01/01/2026 de 18h à 23h"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lieu" className="text-sm font-medium">Lieu</label>
                <input
                  id="lieu"
                  type="text"
                  value={formData.step1.lieu}
                  onChange={(e) => handleChange(1, 'lieu', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Adresse du lieu de la manifestation"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="configuration" className="text-sm font-medium">Configuration du lieu</label>
              <Textarea
                id="configuration"
                value={formData.step1.configuration}
                onChange={(e) => handleChange(1, 'configuration', e.target.value)}
                placeholder="Décrivez la configuration du lieu pour la manifestation"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center text-blue-600">
              <HelpCircle className="h-5 w-5 mr-1" />
              <span className="text-sm">Assistant IA</span>
            </div>
            <Button onClick={nextStep} className="bg-primary">
              Suivant
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="step2" className={currentStep === 2 ? 'block' : 'hidden'}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Détails techniques de l'événement</CardTitle>
            <CardDescription>
              Précisez les aspects techniques et mesures de sécurité de votre manifestation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="installations" className="text-sm font-medium">Installation(s) technique(s) particulière(s)</label>
              <Textarea
                id="installations"
                value={formData.step2.installations}
                onChange={(e) => handleChange(2, 'installations', e.target.value)}
                placeholder="Décrivez les installations techniques particulières prévues"
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="nombreOrganisateurs" className="text-sm font-medium">Nombre de personnes concourant à l'organisation</label>
                <input
                  id="nombreOrganisateurs"
                  type="text"
                  value={formData.step2.nombreOrganisateurs}
                  onChange={(e) => handleChange(2, 'nombreOrganisateurs', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Ex: 25"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="effectifMax" className="text-sm font-medium">Effectif maximal du public attendu</label>
                <input
                  id="effectifMax"
                  type="text"
                  value={formData.step2.effectifMax}
                  onChange={(e) => handleChange(2, 'effectifMax', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Ex: 500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="mesuresComplementaires" className="text-sm font-medium">Mesures complémentaires envisagées pour assurer la sécurité</label>
              <Textarea
                id="mesuresComplementaires"
                value={formData.step2.mesuresComplementaires}
                onChange={(e) => handleChange(2, 'mesuresComplementaires', e.target.value)}
                placeholder="Décrivez les mesures complémentaires de sécurité envisagées"
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="serviceOrdre" className="text-sm font-medium">Service d'ordre</label>
                <input
                  id="serviceOrdre"
                  type="text"
                  value={formData.step2.serviceOrdre}
                  onChange={(e) => handleChange(2, 'serviceOrdre', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Ex: 5 agents de sécurité"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="serviceSecurite" className="text-sm font-medium">Service de sécurité incendie</label>
                <input
                  id="serviceSecurite"
                  type="text"
                  value={formData.step2.serviceSecurite}
                  onChange={(e) => handleChange(2, 'serviceSecurite', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Ex: 2 SSIAP"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Précédent
            </Button>
            <div className="flex items-center text-blue-600">
              <HelpCircle className="h-5 w-5 mr-1" />
              <span className="text-sm">Assistant IA</span>
            </div>
            <Button onClick={nextStep} className="bg-primary">
              Suivant
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="step3" className={currentStep === 3 ? 'block' : 'hidden'}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Documents obligatoires</CardTitle>
            <CardDescription>
              Importez les documents obligatoires pour compléter votre dossier GN6
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {documentsList.map((doc) => (
                <div key={doc.key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <input 
                      type="checkbox" 
                      id={doc.key} 
                      className="mt-1"
                      checked={formData.step3.documents[doc.key as keyof typeof formData.step3.documents]}
                      onChange={(e) => handleCheckboxChange(doc.key, e.target.checked)}
                    />
                    <div className="flex-1">
                      <label htmlFor={doc.key} className="font-medium block mb-2">{doc.label}</label>
                      {formData.step3.documents[doc.key as keyof typeof formData.step3.documents] && (
                        <FileUploader 
                          onFileUploaded={(file) => handleFileUpload(doc.key, file)}
                          isUploaded={Boolean(formData.step3.uploadedFiles[doc.key])}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Précédent
            </Button>
            <div className="flex items-center text-blue-600">
              <HelpCircle className="h-5 w-5 mr-1" />
              <span className="text-sm">Assistant IA</span>
            </div>
            <Button onClick={handleGenerateDocument} className="bg-green-600 hover:bg-green-700">
              <FileCheck className="mr-2 h-4 w-4" />
              Générer le document
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <div className="mt-6 flex justify-center">
        <div className="flex space-x-1">
          {[1, 2, 3].map(step => (
            <span
              key={step}
              className={`h-2 w-8 rounded-full ${currentStep === step ? 'bg-primary' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </Tabs>
  );
};

export default GN6Wizard;
