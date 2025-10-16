import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const projectSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères').max(100, 'Le nom est trop long'),
  type: z.enum(['GN6', 'DPS', 'Notice', 'Plan Prevention'], {
    required_error: 'Veuillez sélectionner un type de projet',
  }),
  status: z.enum(['draft', 'in_progress', 'review', 'completed', 'archived']).default('draft'),
  erp_type: z.string().optional(),
  capacity: z.coerce.number().int().positive().optional(),
  location: z.string().max(200, 'La localisation est trop longue').optional(),
  description: z.string().max(500, 'La description est trop longue').optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const ProjectCreate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      type: undefined,
      status: 'draft',
      erp_type: '',
      capacity: undefined,
      location: '',
      description: '',
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('projects').insert([
        {
          name: data.name,
          type: data.type as string,
          status: data.status as string,
          erp_type: data.erp_type || null,
          capacity: data.capacity || null,
          location: data.location || null,
          description: data.description || null,
          user_id: user!.id,
        },
      ]);

      if (error) throw error;

      toast.success('Projet créé avec succès');
      navigate('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Erreur lors de la création du projet');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="py-8 max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/projects')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux projets
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Créer un nouveau projet</CardTitle>
            <CardDescription>
              Remplissez les informations pour créer votre projet de sécurité incendie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du projet *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Mise en conformité ERP" {...field} />
                      </FormControl>
                      <FormDescription>
                        Le nom de votre projet de sécurité incendie
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de projet *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="GN6">GN6 - Dossier de Sécurité</SelectItem>
                          <SelectItem value="DPS">DPS - Dossier Pré-Saisine</SelectItem>
                          <SelectItem value="Notice">Notice de Sécurité</SelectItem>
                          <SelectItem value="Plan Prevention">Plan de Prévention</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Le type de document principal du projet
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="erp_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type d'ERP</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Type M, Type N" {...field} />
                        </FormControl>
                        <FormDescription>
                          Classification de l'établissement
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacité d'accueil</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Ex: 200" 
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                          />
                        </FormControl>
                        <FormDescription>
                          Nombre de personnes
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localisation</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 15 rue de la Paix, 75001 Paris" {...field} />
                      </FormControl>
                      <FormDescription>
                        Adresse ou localisation de l'établissement
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez brièvement votre projet..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Informations complémentaires sur le projet (optionnel)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut initial</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Brouillon</SelectItem>
                          <SelectItem value="in_progress">En cours</SelectItem>
                          <SelectItem value="review">En révision</SelectItem>
                          <SelectItem value="completed">Terminé</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/projects')}
                    disabled={isSubmitting}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Création en cours...
                      </>
                    ) : (
                      'Créer le projet'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProjectCreate;
