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

// Define FormData type explicitly to match what the form is using
type FormData = {
  title: string;
  establishmentId: string;
  content: PlanPreventionContent;
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
}).required();

const PlanPreventionCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [newRisque, setNewRisque] = useState('');
  const [newMesure, setNewMesure] = useState('');
  
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
        risquesIdentifies: [],
        mesuresPrevention: [],
        preventionIncendie: '',
      },
    },
  });
  
  // Observer les valeurs actuelles des listes
  const risquesIdentifies = watch('content.risquesIdentifies');
  const mesuresPrevention = watch('content.mesuresPrevention');
  
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
      setValue('content.risquesIdentifies', aiContent.risquesIdentifies);
      setValue('content.mesuresPrevention', aiContent.mesuresPrevention);
    } catch (error) {
      console.error('Erreur lors de la génération IA:', error);
    } finally {
      setGeneratingAI(false);
    }
  };
  
  const addRisque = () => {
    if (!newRisque.trim()) return;
    
    const updatedRisques = risquesIdentifies ? [...risquesIdentifies, newRisque] : [newRisque];
    setValue('content.risquesIdentifies', updatedRisques);
    setNewRisque('');
  };
  
  const removeRisque = (index: number) => {
    if (!risquesIdentifies) return;
    
    const updatedRisques = [...risquesIdentifies];
    updatedRisques.splice(index, 1);
    setValue('content.risquesIdentifies', updatedRisques);
  };
  
  const addMesure = () => {
    if (!newMesure.trim()) return;
    
    const updatedMesures = mesuresPrevention ? [...mesuresPrevention, newMesure] : [newMesure];
    setValue('content.mesuresPrevention', updatedMesures);
    setNewMesure('');
  };
  
  const removeMesure = (index: number) => {
    if (!mesuresPrevention) return;
    
    const updatedMesures = [...mesuresPrevention];
    updatedMesures.splice(index, 1);
    setValue('content.mesuresPrevention', updatedMesures);
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
                        placeholder="Titre du plan de prévention"
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
                >
                  {generatingAI ? 'Génération...' : 'Générer avec IA'}
                </RelumeButton>
              </div>
              
              <div className="space-y-6">
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
                          placeholder="Nom de l'entreprise utilisatrice"
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
                          placeholder="Nom de l'entreprise extérieure"
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
                        rows={3}
                        className={`w-full border rounded-md p-2.5 bg-formBackground text-textPrincipal ${
                          errors.content?.natureTravaux ? 'border-accentRouge' : 'border-formBorder'
                        }`}
                        placeholder="Description détaillée des travaux à effectuer..."
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
                  <div className="mb-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-grow border border-formBorder rounded-md p-2.5 bg-formBackground text-textPrincipal"
                        placeholder="Nouveau risque identifié"
                        value={newRisque}
                        onChange={(e) => setNewRisque(e.target.value)}
                      />
                      <RelumeButton
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={addRisque}
                      >
                        Ajouter
                      </RelumeButton>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-3">
                    {risquesIdentifies && risquesIdentifies.length > 0 ? (
                      risquesIdentifies.map((risque, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-formBackground p-2 rounded-md border border-formBorder"
                        >
                          <span>{risque}</span>
                          <button
                            type="button"
                            className="text-accentRouge hover:text-accentRouge/80 p-1"
                            onClick={() => removeRisque(index)}
                          >
                            &times;
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-textPrincipal/60 italic">Aucun risque identifié</p>
                    )}
                  </div>
                  
                  {errors.content?.risquesIdentifies && (
                    <p className="mt-1 text-sm text-accentRouge">{errors.content.risquesIdentifies.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-textPrincipal">
                    Mesures de prévention*
                  </label>
                  <div className="mb-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-grow border border-formBorder rounded-md p-2.5 bg-formBackground text-textPrincipal"
                        placeholder="Nouvelle mesure de prévention"
                        value={newMesure}
                        onChange={(e) => setNewMesure(e.target.value)}
                      />
                      <RelumeButton
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={addMesure}
                      >
                        Ajouter
                      </RelumeButton>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-3">
                    {mesuresPrevention && mesuresPrevention.length > 0 ? (
                      mesuresPrevention.map((mesure, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-formBackground p-2 rounded-md border border-formBorder"
                        >
                          <span>{mesure}</span>
                          <button
                            type="button"
                            className="text-accentRouge hover:text-accentRouge/80 p-1"
                            onClick={() => removeMesure(index)}
                          >
                            &times;
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-textPrincipal/60 italic">Aucune mesure de prévention définie</p>
                    )}
                  </div>
                  
                  {errors.content?.mesuresPrevention && (
                    <p className="mt-1 text-sm text-accentRouge">{errors.content.mesuresPrevention.message}</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-6">
                <RelumeButton
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Annuler
                </RelumeButton>
                <RelumeButton
                  type="submit"
                  variant="default"
                  disabled={loading}
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
