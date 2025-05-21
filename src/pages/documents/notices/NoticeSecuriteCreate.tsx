import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from '@/components/layout/Layout';
import securityDocumentService from '@/services/securityDocumentService';

// Définition du type FormData explicitement pour le formulaire
interface FormData {
  title: string;
  establishmentId: string;
  content: {
    descriptionEtablissement: string;
    moyensSecours: string;
    consignesEvacuation: string;
    preventionIncendie?: string;
  };
}

// Schéma de validation Yup
const validationSchema = yup.object({
  title: yup.string().required('Le titre est obligatoire'),
  establishmentId: yup.string().required('L\'établissement est obligatoire'),
  content: yup.object({
    descriptionEtablissement: yup.string().required('La description est obligatoire'),
    moyensSecours: yup.string().required('Les moyens de secours sont obligatoires'),
    consignesEvacuation: yup.string().required('Les consignes d\'évacuation sont obligatoires'),
    preventionIncendie: yup.string()
  }).required()
});

const NoticeSecuriteCreate = () => {
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
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(validationSchema),
    defaultValues: {
      title: '',
      establishmentId: '',
      content: {
        descriptionEtablissement: '',
        moyensSecours: '',
        consignesEvacuation: '',
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
  
  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    setLoading(true);
    
    // Créer un nouveau document via le service
    const newDocument = securityDocumentService.createSecurityDocument({
      title: data.title,
      documentType: 'NoticeSecurite',
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
      const aiContent = await securityDocumentService.generateAIContent('NoticeSecurite', {
        title: currentValues.title,
        establishmentId: currentValues.establishmentId
      });
      
      // Mettre à jour les champs du formulaire avec les suggestions de l'IA
      setValue('content.descriptionEtablissement', aiContent.descriptionEtablissement);
      setValue('content.moyensSecours', aiContent.moyensSecours);
      setValue('content.consignesEvacuation', aiContent.consignesEvacuation);
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
          <h1 className="text-3xl font-bold text-textPrincipal">Créer une Notice de Sécurité</h1>
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
                        placeholder="Titre de la notice"
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
                <div>
                  <label htmlFor="descriptionEtablissement" className="block text-sm font-medium mb-1 text-textPrincipal">
                    Description de l'établissement*
                  </label>
                  <Controller
                    name="content.descriptionEtablissement"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        id="descriptionEtablissement"
                        rows={4}
                        className={`w-full border rounded-md p-2.5 bg-formBackground text-textPrincipal ${
                          errors.content?.descriptionEtablissement ? 'border-accentRouge' : 'border-formBorder'
                        }`}
                        placeholder="Description de l'établissement, classification, capacité d'accueil..."
                        {...field}
                      ></textarea>
                    )}
                  />
                  {errors.content?.descriptionEtablissement && (
                    <p className="mt-1 text-sm text-accentRouge">{errors.content.descriptionEtablissement.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="moyensSecours" className="block text-sm font-medium mb-1 text-textPrincipal">
                    Moyens de secours*
                  </label>
                  <Controller
                    name="content.moyensSecours"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        id="moyensSecours"
                        rows={4}
                        className={`w-full border rounded-md p-2.5 bg-formBackground text-textPrincipal ${
                          errors.content?.moyensSecours ? 'border-accentRouge' : 'border-formBorder'
                        }`}
                        placeholder="Extincteurs, alarmes, éclairage de sécurité..."
                        {...field}
                      ></textarea>
                    )}
                  />
                  {errors.content?.moyensSecours && (
                    <p className="mt-1 text-sm text-accentRouge">{errors.content.moyensSecours.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="consignesEvacuation" className="block text-sm font-medium mb-1 text-textPrincipal">
                    Consignes d'évacuation*
                  </label>
                  <Controller
                    name="content.consignesEvacuation"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        id="consignesEvacuation"
                        rows={4}
                        className={`w-full border rounded-md p-2.5 bg-formBackground text-textPrincipal ${
                          errors.content?.consignesEvacuation ? 'border-accentRouge' : 'border-formBorder'
                        }`}
                        placeholder="Consignes en cas d'incendie ou autre danger..."
                        {...field}
                      ></textarea>
                    )}
                  />
                  {errors.content?.consignesEvacuation && (
                    <p className="mt-1 text-sm text-accentRouge">{errors.content.consignesEvacuation.message}</p>
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
                  {loading ? 'Création...' : 'Créer la notice'}
                </RelumeButton>
              </div>
            </form>
          </RelumeCardContent>
        </RelumeCard>
      </div>
    </Layout>
  );
};

export default NoticeSecuriteCreate;
