import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from '@/components/layout/Layout';
import securityDocumentService from '@/services/securityDocumentService';

// Définition explicite du type FormData
interface FormData {
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
}

// Schéma de validation correctement typé
const validationSchema = yup.object({
  title: yup.string().required('Le titre est obligatoire'),
  establishmentId: yup.string().required('L\'établissement est obligatoire'),
  content: yup.object({
    entrepriseUtilisatrice: yup.string().required('L\'entreprise utilisatrice est obligatoire'),
    entrepriseExterieure: yup.string().required('L\'entreprise extérieure est obligatoire'),
    natureTravaux: yup.string().required('La nature des travaux est obligatoire'),
    risquesIdentifies: yup.array().required('Les risques identifiés sont obligatoires'),
    mesuresPrevention: yup.array().required('Les mesures de prévention sont obligatoires'),
    preventionIncendie: yup.string()
  }).required()
});

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
    register,
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(validationSchema),
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
  
  // Liste d'établissements fictifs pour le prototype
  const establishments = [
    { id: 'estab-1', name: 'Centre Commercial Les Arcades' },
    { id: 'estab-2', name: 'Théâtre Municipal' },
    { id: 'estab-3', name: 'Restaurant La Bonne Table' },
  ];
  
  const onSubmit: SubmitHandler<FormData> = (data) => {
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
      navigate(`/documents/${newDocument.id}/relecture`);
    }, 1000);
  };
  
  const handleFieldChange = (field: string, value: string) => {
    // Nous utilisons la notation avec template literal pour les champs imbriqués
    setValue(`content.${field}` as any, value);
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
      setValue('content.risquesIdentifies', aiContent.risquesIdentifies || []);
      setValue('content.mesuresPrevention', aiContent.mesuresPrevention || []);
    } catch (error) {
      console.error('Erreur lors de la génération IA:', error);
    } finally {
      setGeneratingAI(false);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Créer un Plan de Prévention</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Titre du Plan de Prévention */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              {...register('title')}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          
          {/* ID de l'établissement */}
          <div>
            <label htmlFor="establishmentId" className="block text-sm font-medium text-gray-700">Établissement</label>
            <input
              type="text"
              id="establishmentId"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              {...register('establishmentId')}
            />
            {errors.establishmentId && <p className="text-red-500 text-sm">{errors.establishmentId.message}</p>}
          </div>
          
          {/* Entreprise Utilisatrice */}
          <div>
            <label htmlFor="entrepriseUtilisatrice" className="block text-sm font-medium text-gray-700">Entreprise Utilisatrice</label>
            <input
              type="text"
              id="entrepriseUtilisatrice"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              {...register('content.entrepriseUtilisatrice')}
            />
            {errors.content?.entrepriseUtilisatrice && <p className="text-red-500 text-sm">{errors.content.entrepriseUtilisatrice.message}</p>}
          </div>
          
          {/* Entreprise Extérieure */}
          <div>
            <label htmlFor="entrepriseExterieure" className="block text-sm font-medium text-gray-700">Entreprise Extérieure</label>
            <input
              type="text"
              id="entrepriseExterieure"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              {...register('content.entrepriseExterieure')}
            />
            {errors.content?.entrepriseExterieure && <p className="text-red-500 text-sm">{errors.content.entrepriseExterieure.message}</p>}
          </div>
          
          {/* Nature des Travaux */}
          <div>
            <label htmlFor="natureTravaux" className="block text-sm font-medium text-gray-700">Nature des Travaux</label>
            <textarea
              id="natureTravaux"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              {...register('content.natureTravaux')}
            />
            {errors.content?.natureTravaux && <p className="text-red-500 text-sm">{errors.content.natureTravaux.message}</p>}
          </div>
          
          {/* Risques Identifiés */}
          <div>
            <label htmlFor="risquesIdentifies" className="block text-sm font-medium text-gray-700">Risques Identifiés</label>
            <input
              type="text"
              id="risquesIdentifies"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              {...register('content.risquesIdentifies')}
            />
            {errors.content?.risquesIdentifies && <p className="text-red-500 text-sm">{errors.content.risquesIdentifies.message}</p>}
          </div>
          
          {/* Mesures de Prévention */}
          <div>
            <label htmlFor="mesuresPrevention" className="block text-sm font-medium text-gray-700">Mesures de Prévention</label>
            <input
              type="text"
              id="mesuresPrevention"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              {...register('content.mesuresPrevention')}
            />
            {errors.content?.mesuresPrevention && <p className="text-red-500 text-sm">{errors.content.mesuresPrevention.message}</p>}
          </div>
          
          {/* Prévention Incendie */}
          <div>
            <label htmlFor="preventionIncendie" className="block text-sm font-medium text-gray-700">Prévention Incendie</label>
            <textarea
              id="preventionIncendie"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              {...register('content.preventionIncendie')}
            />
            {errors.content?.preventionIncendie && <p className="text-red-500 text-sm">{errors.content.preventionIncendie.message}</p>}
          </div>
          
          {/* Bouton de soumission */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
          
          {/* Bouton de génération de contenu IA */}
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
            onClick={handleGenerateAI}
            disabled={generatingAI}
          >
            {generatingAI ? 'Génération IA...' : 'Générer avec IA'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default PlanPreventionCreate;
