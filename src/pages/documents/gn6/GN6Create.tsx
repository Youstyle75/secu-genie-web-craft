import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from '@/components/layout/Layout';
import securityDocumentService from '@/services/securityDocumentService';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Save, MapPin, Users, ShieldAlert, FileCheck, CheckCircle } from 'lucide-react';
import GN6Header from '@/components/gn6/GN6Header';
import GN6Mesures from '@/components/gn6/GN6Mesures';
import GN6Checklist from '@/components/gn6/GN6Checklist';
import GN6Signatures from '@/components/gn6/GN6Signatures';
import ExportButtons from '@/components/documents/ExportButtons';

interface FormData {
  title: string;
  establishmentId: string;
  content: any;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Le titre est obligatoire'),
  establishmentId: yup.string().required('La référence est obligatoire'),
});

const steps = [
  { id: 1, title: "Identité & Lieu", icon: MapPin, description: "Organisateur et manifestation" },
  { id: 2, title: "Effectifs", icon: Users, description: "Public et personnel" },
  { id: 3, title: "Sécurité Incendie", icon: ShieldAlert, description: "Mesures et moyens" },
  { id: 4, title: "Documents", icon: FileCheck, description: "Pièces à joindre" },
  { id: 5, title: "Validation", icon: CheckCircle, description: "Signatures et export" },
];

const GN6Create = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const { handleSubmit, formState: { errors }, setValue, watch, register } = useForm<FormData>({
    resolver: yupResolver(validationSchema) as any,
    defaultValues: {
      title: '',
      establishmentId: '',
      content: {
        organisateur: {},
        informations: {},
        lieu: {},
        effectifs: {},
        mesures: {},
        securite: {
          securitePrivee: {},
          securitePublique: {},
          pompiers: {},
        },
        assurances: {},
        piecesJointes: {},
        signatures: [],
      },
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    const newDocument = securityDocumentService.createSecurityDocument({
      title: data.title,
      documentType: 'GN6',
      establishmentId: data.establishmentId,
      content: data.content,
      status: 'brouillon',
    });
    setTimeout(() => {
      setLoading(false);
      navigate(`/documents/${newDocument.id}/relecture`);
    }, 1000);
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <Layout>
      <div className="container-large py-8">
        {/* En-tête */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-primary/10 via-background to-primary/10 border-primary/30">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dossier GN6</h1>
          <p className="text-muted-foreground">Manifestation exceptionnelle accueillant du public</p>
          
          <div className="prose prose-sm text-muted-foreground mt-4">
            <p className="mb-2">
              <strong>Cadre réglementaire :</strong> Le dossier GN6 est obligatoire pour toute manifestation 
              exceptionnelle accueillant du public dans un lieu non spécifiquement aménagé à cet effet.
            </p>
          </div>
        </Card>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Informations de base */}
          <Card className="p-6 bg-card border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Intitulé du dossier *
                </label>
                <input
                  {...register('title')}
                  className="w-full px-4 py-2 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ex: Dossier GN6 - Festival de musique 2025"
                />
                {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Numéro de dossier *
                </label>
                <input
                  {...register('establishmentId')}
                  className="w-full px-4 py-2 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ex: GN6-2025-001"
                />
                {errors.establishmentId && <p className="text-sm text-destructive mt-1">{errors.establishmentId.message}</p>}
              </div>
            </div>
          </Card>

          {/* Barre de progression */}
          <div className="relative">
            <div className="flex justify-between mb-12">
              <div className="absolute top-5 left-0 w-full h-1 bg-muted -z-10" />
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                
                return (
                  <div key={step.id} className="flex flex-col items-center bg-background px-2">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isActive 
                          ? "border-primary bg-primary/10 text-primary shadow-lg" 
                          : isCompleted 
                            ? "border-secondary bg-secondary/10 text-secondary" 
                            : "border-muted-foreground/30 text-muted-foreground"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <div className="text-center mt-2">
                      <span className={`text-xs font-medium block ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {step.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground/70">
                        {step.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contenu des étapes */}
          <Card className="border-border shadow-lg min-h-[500px]">
            <div className="p-6">
              {currentStep === 1 && (
                <GN6Header register={register} errors={errors} watch={watch} setValue={setValue} />
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="text-primary" size={28} />
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Effectifs prévisionnels</h2>
                      <p className="text-sm text-muted-foreground">Détaillez les effectifs attendus</p>
                    </div>
                  </div>

                  <Card className="p-6 bg-primary/5 border-primary/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Public accueilli *
                        </label>
                        <input
                          type="number"
                          {...register('content.effectifs.public')}
                          className="w-full px-4 py-2 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="0"
                          min="0"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Personnel organisateur
                        </label>
                        <input
                          type="number"
                          {...register('content.effectifs.personnel')}
                          className="w-full px-4 py-2 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="0"
                          min="0"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Intervenants / Artistes
                        </label>
                        <input
                          type="number"
                          {...register('content.effectifs.intervenants')}
                          className="w-full px-4 py-2 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="0"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-background rounded-lg border border-border">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-foreground">Effectif total prévisionnel :</span>
                        <span className="text-3xl font-bold text-primary">
                          {(parseInt(watch('content.effectifs.public') || '0') +
                            parseInt(watch('content.effectifs.personnel') || '0') +
                            parseInt(watch('content.effectifs.intervenants') || '0'))}
                        </span>
                      </div>
                    </div>

                    {parseInt(watch('content.effectifs.public') || '0') > 1500 && (
                      <div className="mt-4 p-4 bg-destructive/10 border border-destructive rounded-lg">
                        <p className="text-sm text-destructive font-medium">
                          ⚠️ ALERTE: Service d'ordre OBLIGATOIRE pour plus de 1500 personnes
                        </p>
                      </div>
                    )}
                  </Card>
                </div>
              )}

              {currentStep === 3 && (
                <GN6Mesures register={register} watch={watch} setValue={setValue} />
              )}

              {currentStep === 4 && (
                <GN6Checklist register={register} watch={watch} />
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <GN6Signatures setValue={setValue} />
                  
                  <Card className="p-6 bg-primary/5 border-primary">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Informations de dépôt</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        <strong className="text-foreground">Délai de dépôt :</strong> Le dossier doit être déposé au minimum <strong>1 mois avant</strong> la date de la manifestation.
                      </p>
                      <p>
                        <strong className="text-foreground">Où déposer :</strong> Mairie de la commune d'accueil de la manifestation et Commission de sécurité compétente.
                      </p>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center sticky bottom-4 bg-background/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border z-10">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Précédent
              </Button>

              {currentStep < steps.length && (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-primary hover:bg-primary/90"
                >
                  Suivant
                </Button>
              )}
            </div>

            <div className="flex gap-3">
              {currentStep === steps.length && (
                <ExportButtons
                  documentData={{
                    metadata: {
                      type: 'dossier-gn6',
                      title: watch('title') || 'Dossier GN6',
                      createdAt: new Date().toISOString(),
                      author: 'SecuGenie User',
                      version: '1.0'
                    },
                    content: watch()
                  }}
                />
              )}

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/documents')}
              >
                Annuler
              </Button>

              {currentStep === steps.length && (
                <Button type="submit" disabled={loading} className="bg-secondary hover:bg-secondary/90">
                  {loading ? (
                    <>Enregistrement...</>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Enregistrer
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default GN6Create;
