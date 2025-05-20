import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { createSecurityDocument } from '@/services/securityDocumentService';
import { SecurityDocument, NoticeSecuriteContent } from '@/types/securityDocument';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Validation schema using Yup
const formSchema = yup.object().shape({
  title: yup.string().required("Le titre du document est obligatoire"),
  descriptionEtablissement: yup.string().required("La description de l'établissement est obligatoire"),
  moyensSecours: yup.string().required("Les moyens de secours sont obligatoires"),
  consignesEvacuation: yup.string().required("Les consignes d'évacuation sont obligatoires"),
});

const NoticeSecuriteCreate = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  // React Hook Form setup
  const { control, handleSubmit, formState: { errors } } = useForm<NoticeSecuriteContent>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      descriptionEtablissement: "",
      moyensSecours: "",
      consignesEvacuation: "",
    },
  });

  // Mutation for creating a security document
  const mutation = useMutation({
    mutationFn: createSecurityDocument,
    onSuccess: (data: SecurityDocument) => {
      toast.success("Document de sécurité créé avec succès !");
      navigate(`/documents/${data.id}/relecture`);
    },
    onError: (error: any) => {
      toast.error("Erreur lors de la création du document");
    },
  });

  // Function to handle form submission
  const onSubmit = async (data: NoticeSecuriteContent) => {
    setIsGenerating(true);
    try {
      await mutation.mutateAsync({
        title: "Notice de Sécurité - [Nom de l'établissement]",
        documentType: "NoticeSecurite",
        establishmentId: "652f743549c9730ef9558ade", // Remplacez par l'ID réel de l'établissement
        content: data,
      });
    } catch (error) {
      toast.error("Erreur lors de la création du document");
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to generate content with IA
  const generateContentWithIA = useCallback(async () => {
    setIsGenerating(true);
    try {
      // Simulate IA content generation
      const iaGeneratedContent = {
        descriptionEtablissement: "Description générée par l'IA...",
        moyensSecours: "Moyens de secours générés par l'IA...",
        consignesEvacuation: "Consignes d'évacuation générées par l'IA...",
      };

      // Update form fields with IA generated content
      Object.keys(iaGeneratedContent).forEach((key) => {
        control._fields[key]?.onChange(iaGeneratedContent[key]);
      });

      toast.success("Contenu généré avec succès par l'IA !");
    } catch (error) {
      toast.error("Erreur lors de la génération du contenu par IA");
    } finally {
      setIsGenerating(false);
    }
  }, [control]);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Création d'une Notice de Sécurité</h1>
        <Form {...{ control, handleSubmit, errors }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Description de l'établissement */}
            <FormField
              control={control}
              name="descriptionEtablissement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description de l'établissement</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Décrivez l'établissement, son activité, etc." {...field} />
                  </FormControl>
                  <FormDescription>
                    Donnez une description détaillée de l'établissement pour le contexte de la notice de sécurité.
                  </FormDescription>
                  <FormMessage>{errors.descriptionEtablissement?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Moyens de secours */}
            <FormField
              control={control}
              name="moyensSecours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Moyens de secours</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Décrivez les moyens de secours disponibles (extincteurs, alarmes, etc.)" {...field} />
                  </FormControl>
                  <FormDescription>
                    Listez tous les moyens de secours disponibles dans l'établissement.
                  </FormDescription>
                  <FormMessage>{errors.moyensSecours?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Consignes d'évacuation */}
            <FormField
              control={control}
              name="consignesEvacuation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consignes d'évacuation</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Décrivez les consignes d'évacuation en cas d'urgence" {...field} />
                  </FormControl>
                  <FormDescription>
                    Expliquez clairement les procédures à suivre en cas d'évacuation.
                  </FormDescription>
                  <FormMessage>{errors.consignesEvacuation?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Generate Content Button */}
            <Button type="button" variant="secondary" onClick={generateContentWithIA} disabled={isGenerating}>
              {isGenerating ? "Génération en cours..." : "Générer le contenu avec l'IA"}
            </Button>

            {/* Submit Button */}
            <Button type="submit" disabled={isGenerating}>
              {isGenerating ? "Création en cours..." : "Créer la Notice de Sécurité"}
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default NoticeSecuriteCreate;
