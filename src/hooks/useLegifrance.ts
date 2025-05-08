
import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { ReglementaryText } from '@/types/legifrance';

export const useLegifrance = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ReglementaryText[] | null>(null);
  
  const supabase = useSupabaseClient();

  // Function to sync data from Legifrance
  const syncLegifrance = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('legifrance-sync');
      
      if (error) throw error;
      
      setData(data);
      return { success: true, data };
    } catch (err) {
      setError(err.message || 'An error occurred while syncing with Legifrance');
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch regulatory texts from the database
  const getReglementaryTexts = async (category?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let query = supabase.from('regulations').select('*');
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setData(data as ReglementaryText[]);
      return { data: data as ReglementaryText[], error: null };
    } catch (err) {
      setError(err.message || 'An error occurred while fetching regulatory texts');
      return { data: null, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    syncLegifrance,
    getReglementaryTexts,
    isLoading,
    error,
    data,
  };
};
