
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from '@/components/layout/Layout';
import { RelumeButton } from '@/components/ui/relume-button';
import { RelumeCard, RelumeCardHeader, RelumeCardTitle, RelumeCardContent } from '@/components/ui/relume-card';
import { PlanPreventionContent } from '@/types/securityDocument';
import securityDocumentService from '@/services/securityDocumentService';

// Define FormData type explicitly to match required fields
type FormData = {
  title: string;
  establishmentId: string;
  content: {
    entrepriseUtilisatrice: string;
    entrepriseExterieure: string;
    natureTravaux: string;
    risquesIdentifies: any[];
    mesuresPrevention: any[];
    preventionIncendie?: string;
  };
};

// Schéma de validation correctement typé
const validationSchema = yup.object({
  title: yup.string().required('Le titre est obligatoire'),
  establishmentId: yup.string().required('L\'établissement est obligatoire'),
  content: yup.object({
    entrepriseUtilisatrice: yup.string().required('L\'entreprise utilisatrice est obligatoire'),
    entrepriseExterieure: yup.string().required('L\'entreprise extérieure est obligatoire'),
    natureTravaux: yup.string().required('La nature des travaux est obligatoire'),
    risquesIdentifies: yup.array().min(1, 'Au moins un risque doit être identifié').required(),
    mesuresPrevention: yup.array().min(1, 'Au moins une mesure de prévention doit être définie').required(),
    preventionIncendie: yup.string().optional()
  }).required(),
}) as yup.ObjectSchema<FormData>;

const PlanPreventionCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  
  // Initialiser le formulaire avec react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '',
      establishmentId: '',
      content: {
        entrepriseUtilisatrice: '',
        entrepriseExterieure: '',
        natureTravaux: '',
        risquesIdentifies: [''],
        mesuresPrevention: [''],
        preventionIncendie: '',
      },
    },
  });
  
  // Liste d'établissements fictifs pour le prototype
  const establishments = [
    { id: 'estab-1', name: 'Centre Commercial Les Arcades' },
    { id: 'estab-2', name: 'Théâtre Municipal' },
    { id: 'estab-3', name: 'Restaurant La Bonne Table' },
  ];
  
  const onSubmit = (data: FormData) => {
    setLoading(true);
    
    // Créer un nouveau document via le service
    const newDocument = securityDocumentService.createSecurityDocument({
      title: data.title,
      documentType: 'PlanPrevention',
      establishmentId: data.establishmentId,
      content: data.content,
      status: 'brouillon',
    });
    
    // Rediriger vers la page de relecture du document
    setTimeout(() => {
      setLoading(false);
      navigate(`/documents/${newDocument.id}`);
    }, 1000);
  };
  
  const handleGenerateAI = async () => {
    const currentValues = getValues();
    if (!currentValues.title || !currentValues.establishmentId) return;
    
    setGeneratingAI(true);
    
    try {
      // Appeler le service pour générer du contenu avec l'IA
      const aiContent = await securityDocumentService.generateAIContent('PlanPrevention', {
        title: currentValues.title,
        establishmentId: currentValues.establishmentId
      });
      
      // Mettre à jour les champs du formulaire avec les suggestions de l'IA
      setValue('content.entrepriseUtilisatrice', aiContent.entrepriseUtilisatrice);
      setValue('content.entrepriseExterieure', aiContent.entrepriseExterieure);
      setValue('content.natureTravaux', aiContent.natureTravaux);
    } catch (error) {
      console.error('Erreur lors de la génération IA:', error);
    } finally {
      setGeneratingAI(false);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-textPrincipal">Créer un Plan de Prévention</h1>
          <RelumeButton variant="outline" onClick={() => navigate(-1)}>
            Annuler
          </RelumeButton>
        </div>
        
        <RelumeCard variant="default" className="mb-8">
          <RelumeCardHeader>
            <RelumeCardTitle>Informations générales</RelumeCardTitle>
          </RelumeCardHeader>
          <RelumeCardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1 text-textPrincipal">
                    Titre du document*
                  </label>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="title"
                        className={`w-full border rounded-md p-2.5 bg-formBackground text-textPrincipal ${
                          errors.title ? 'border-accentRouge' : 'border-formBorder'
                        }`}
                        placeholder="Titre du plan"
                        {...field}
                      />
                    )}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-accentRouge">{errors.title.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="establishmentId" className="block text-sm font-medium mb-1 text-textPrincipal">
                    Établissement concerné*
                  </label>
                  <Controller
                    name="establishmentId"
                    control={control}
                    render={({ field }) => (
                      <select
                        id="establishmentId"
                        className={`w-full border rounded-md p-2.5 bg-formBackground text-textPrincipal ${
                          errors.establishmentId ? 'border-accentRouge' : 'border-formBorder'
                        }`}
                        {...field}
                      >
                        <option value="">Sélectionnez un établissement</option>
                        {establishments.map(estab => (
                          <option key={estab.id} value={estab.id}>
                            {estab.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.establishmentId && (
                    <p className="mt-1 text-sm text-accentRouge">{errors.establishmentId.message}</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center my-6">
                <RelumeButton
                  type="button"
                  variant="secondary"
                  onClick={handleGenerateAI}
                  disabled={generatingAI}
                  textStyle="multiline"
                >
                  {generatingAI ? 'Génération...' : 'Générer avec IA'}
                </RelumeButton>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="entrepriseUtilisatrice" className="block text-sm font-medium mb-1 text-textPrincipal">
                    Entreprise utilisatrice*
                  </label>
                  <Controller
                    name="content.entrepriseUtilisatrice"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="entrepriseUtilisatrice"
                        className={`w-full border rounded-md p-2.5 bg-formBackground text-textPrincipal ${
                          errors.content?.entrepriseUtilisatrice ? 'border-accentRouge' : 'border-formBorder'
                        }`}
                        placeholder="Nom de l'entreprise"
                        {...field}
                      />
                    )}
                  />
                  {errors.content?.entrepriseUtilisatrice && (
                    <p className="mt-1 text-sm text-accentRouge">{errors.content.entrepriseUtilisatrice.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="entrepriseExterieure" className="block text-sm font-medium mb-1 text-textPrincipal">
                    Entreprise extérieure*
                  </label>
                  <Controller
                    name="content.entrepriseExterieure"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="entrepriseExterieure"
                        className={`w-full border rounded-md p-2.5 bg-formBackground text-textPrincipal ${
                          errors.content?.entrepriseExterieure ? 'border-accentRouge' : 'border-formBorder'
                        }`}
                        placeholder="Nom de l'entreprise"
                        {...field}
                      />
                    )}
                  />
                  {errors.content?.entrepriseExterieure && (
                    <p className="mt-1 text-sm text-accentRouge">{errors.content.entrepriseExterieure.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="natureTravaux" className="block text-sm font-medium mb-1 text-textPrincipal">
                  Nature des travaux*
                </label>
                <Controller
                  name="content.natureTravaux"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      id="natureTravaux"
                      rows={4}
                      className={`w-full border rounded-md p-2.5 bg-formBackground text-textPrincipal ${
                        errors.content?.natureTravaux ? 'border-accentRouge' : 'border-formBorder'
                      }`}
                      placeholder="Description détaillée des travaux"
                      {...field}
                    ></textarea>
                  )}
                />
                {errors.content?.natureTravaux && (
                  <p className="mt-1 text-sm text-accentRouge">{errors.content.natureTravaux.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-textPrincipal">
                  Risques identifiés*
                </label>
                {/* Simplified input for array */}
                <Controller
                  name="content.risquesIdentifies"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`w-full border rounded-md p-2.5 bg-formBackground text-textPrincipal ${
                        errors.content?.risquesIdentifies ? 'border-accentRouge' : 'border-formBorder'
                      }`}
                      placeholder="Risques (ex: chute de hauteur, risque électrique)"
                      value={field.value.join(', ')}
                      onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
                    />
                  )}
                />
                {errors.content?.risquesIdentifies && (
                  <p className="mt-1 text-sm text-accentRouge">
                    {typeof errors.content.risquesIdentifies === 'string' 
                      ? errors.content.risquesIdentifies 
                      : 'Au moins un risque doit être identifié'}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-textPrincipal">
                  Mesures de prévention*
                </label>
                {/* Simplified input for array */}
                <Controller
                  name="content.mesuresPrevention"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`w-full border rounded-md p-2.5 bg-formBackground text-textPrincipal ${
                        errors.content?.mesuresPrevention ? 'border-accentRouge' : 'border-formBorder'
                      }`}
                      placeholder="Mesures (ex: port du casque, consignation électrique)"
                      value={field.value.join(', ')}
                      onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
                    />
                  )}
                />
                {errors.content?.mesuresPrevention && (
                  <p className="mt-1 text-sm text-accentRouge">
                    {typeof errors.content.mesuresPrevention === 'string' 
                      ? errors.content.mesuresPrevention 
                      : 'Au moins une mesure de prévention doit être définie'}
                  </p>
                )}
              </div>
              
              <div className="flex justify-end gap-3 pt-6">
                <RelumeButton
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  textStyle="multiline"
                >
                  Annuler
                </RelumeButton>
                <RelumeButton
                  type="submit"
                  variant="default"
                  disabled={loading}
                  textStyle="multiline"
                >
                  {loading ? 'Création...' : 'Créer le plan'}
                </RelumeButton>
              </div>
            </form>
          </RelumeCardContent>
        </RelumeCard>
      </div>
    </Layout>
  );
};

export default PlanPreventionCreate;
