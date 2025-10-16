import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Query keys for cache management
export const QUERY_KEYS = {
  projects: (userId: string) => ['projects', userId] as const,
  project: (id: string) => ['project', id] as const,
  documents: (userId: string) => ['documents', userId] as const,
  document: (id: string) => ['document', id] as const,
  comments: (documentId: string) => ['comments', documentId] as const,
  notifications: (userId: string) => ['notifications', userId] as const,
};

// Projects hooks
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(50); // Pagination limit

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useProject = (id: string | undefined) => {
  return useQuery({
    queryKey: QUERY_KEYS.project(id || ''),
    queryFn: async () => {
      if (!id) throw new Error('No project ID');
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('projects')
        .insert({ ...projectData, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projet créé avec succès');
    },
    onError: (error) => {
      toast.error('Erreur lors de la création du projet');
      console.error(error);
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { data: result, error } = await supabase
        .from('projects')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.project(data.id) });
      toast.success('Projet mis à jour');
    },
  });
};

// Documents hooks
export const useDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('documents')
        .select('id, title, type, status, version, updated_at, project_id')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data;
    },
  });
};

export const useDocument = (id: string | undefined) => {
  return useQuery({
    queryKey: QUERY_KEYS.document(id || ''),
    queryFn: async () => {
      if (!id) throw new Error('No document ID');

      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { data: result, error } = await supabase
        .from('documents')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onMutate: async ({ id, data }) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.document(id) });
      
      const previousDocument = queryClient.getQueryData(QUERY_KEYS.document(id));
      
      queryClient.setQueryData(QUERY_KEYS.document(id), (old: any) => ({
        ...old,
        ...data,
      }));

      return { previousDocument };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousDocument) {
        queryClient.setQueryData(
          QUERY_KEYS.document(variables.id),
          context.previousDocument
        );
      }
      toast.error('Erreur lors de la sauvegarde');
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.document(data.id) });
    },
  });
};

// Comments hooks
export const useComments = (documentId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.comments(documentId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('document_id', documentId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!documentId,
  });
};

// Notifications hooks
export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
  });
};
