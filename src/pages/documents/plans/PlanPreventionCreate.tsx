import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import apiConfig from '@/config/apiEndpoints';
import { RelumeCard, RelumeCardContent, RelumeCardDescription, RelumeCardFooter, RelumeCardHeader, RelumeCardTitle } from '@/components/ui/relume-card';
import { RelumeButton } from '@/components/ui/relume-button';

// Validation schema using Yup
const planPreventionSchema = yup.object({
  entrepriseUtilisatrice: yup.string().required("Le nom de l'entreprise utilisatrice est obligatoire"),
  entrepriseExterieure: yup.string().required("Le nom de l'entreprise extérieure est obligatoire"),
  natureTravaux: yup.string().required("La nature des travaux est obligatoire"),
  risquesIdentifies: yup.array().of(yup.string()).min(1, "Au moins un risque doit être identifié"),
  mesuresPrevention: yup.array().of(yup.string()).min(1, "Au moins une mesure de prévention doit être spécifiée"),
}).required();

const PlanPreventionCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [documentId, setDocumentId] = useState<string | null>(null);

  // React Hook Form setup
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(planPreventionSchema)
  });

  // Function to handle form submission
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch(apiConfig.endpoints.documents.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentType: 'PlanPrevention',
          content: data,
        }),
      });

      if (response.ok) {
        const newDocument = await response.json();
        setDocumentId(newDocument.id);
        toast.success("Plan de prévention créé avec succès !");
        navigate(`/documents/${newDocument.id}/relecture`);
      } else {
        console.error("Erreur lors de la création du plan de prévention:", response);
        toast.error("Erreur lors de la création du plan de prévention");
      }
    } catch (error: any) {
      console.error("Erreur lors de la création du plan de prévention:", error);
      toast.error("Erreur lors de la création du plan de prévention");
    } finally {
      setLoading(false);
    }
  };

  // Function to generate content with IA
  const generateContentWithIA = async () => {
    setLoading(true);
    try {
      // Simulate IA content generation (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
      toast.success("Contenu généré par l'IA avec succès !");
    } catch (error: any) {
      console.error("Erreur lors de la génération du contenu par IA:", error);
      toast.error("Erreur lors de la génération du contenu par IA");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <RelumeCard>
          <RelumeCardHeader>
            <RelumeCardTitle>Création d'un Plan de Prévention</RelumeCardTitle>
            <RelumeCardDescription>
              Remplissez les informations ci-dessous pour générer votre plan de prévention.
            </RelumeCardDescription>
          </RelumeCardHeader>
          <RelumeCardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="entrepriseUtilisatrice">Entreprise Utilisatrice</Label>
                <Controller
                  name="entrepriseUtilisatrice"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input {...field} type="text" id="entrepriseUtilisatrice" placeholder="Nom de l'entreprise utilisatrice" />
                  )}
                />
                {errors.entrepriseUtilisatrice && <p className="text-red-500">{errors.entrepriseUtilisatrice.message}</p>}
              </div>
              <div>
                <Label htmlFor="entrepriseExterieure">Entreprise Extérieure</Label>
                <Controller
                  name="entrepriseExterieure"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input {...field} type="text" id="entrepriseExterieure" placeholder="Nom de l'entreprise extérieure" />
                  )}
                />
                {errors.entrepriseExterieure && <p className="text-red-500">{errors.entrepriseExterieure.message}</p>}
              </div>
              <div>
                <Label htmlFor="natureTravaux">Nature des Travaux</Label>
                <Controller
                  name="natureTravaux"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Textarea {...field} id="natureTravaux" placeholder="Description de la nature des travaux" />
                  )}
                />
                {errors.natureTravaux && <p className="text-red-500">{errors.natureTravaux.message}</p>}
              </div>
              <div>
                <Label htmlFor="risquesIdentifies">Risques Identifiés</Label>
                <Controller
                  name="risquesIdentifies"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionnez les risques" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Chute de hauteur">Chute de hauteur</SelectItem>
                        <SelectItem value="Risque électrique">Risque électrique</SelectItem>
                        <SelectItem value="Incendie">Incendie</SelectItem>
                        {/* Add more risks as needed */}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.risquesIdentifies && <p className="text-red-500">{errors.risquesIdentifies.message}</p>}
              </div>
              <div>
                <Label htmlFor="mesuresPrevention">Mesures de Prévention</Label>
                <Controller
                  name="mesuresPrevention"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionnez les mesures de prévention" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Port des EPI">Port des EPI</SelectItem>
                        <SelectItem value="Consignes de sécurité">Consignes de sécurité</SelectItem>
                        {/* Add more measures as needed */}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.mesuresPrevention && <p className="text-red-500">{errors.mesuresPrevention.message}</p>}
              </div>
              <RelumeCardFooter className="flex justify-between">
                <RelumeButton variant="secondary" onClick={generateContentWithIA} disabled={loading}>
                  {loading ? "Génération en cours..." : "Générer avec l'IA"}
                </RelumeButton>
                <RelumeButton type="submit" disabled={loading}>
                  {loading ? "Création en cours..." : "Créer le Plan de Prévention"}
                </RelumeButton>
              </RelumeCardFooter>
            </form>
          </RelumeCardContent>
        </RelumeCard>
      </div>
    </Layout>
  );
};

export default PlanPreventionCreate;
