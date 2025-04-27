
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useLegifranceAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = useSupabaseClient();

  useEffect(() => {
    const getToken = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('legifrance-auth');
        
        if (error) throw error;
        
        setToken(data.access_token);
        // Renouveler le token avant expiration
        setTimeout(getToken, (data.expires_in - 300) * 1000);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    getToken();
  }, [supabase]);

  return { token, isLoading, error };
};
