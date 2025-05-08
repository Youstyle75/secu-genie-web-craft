
import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { ReglementaryText } from '@/types/legifrance';

// Interface for AI guidance metadata
export interface AIGuidanceMetadata {
  section: string;
  type: string;
  min?: number;
  max?: number;
  reference?: string;
}

export const useLegifrance = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ReglementaryText[] | null>(null);
  const [aiGuidance, setAiGuidance] = useState<AIGuidanceMetadata[]>([]);
  
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

  // Function to parse AI guidance metadata from text
  // Format: <!-- IA:Section=X;Type=Y;Min=N;Max=M;Référence=Z -->
  const parseAIGuidance = (text: string): AIGuidanceMetadata[] => {
    const guidanceRegex = /<!-- IA:([^>]+) -->/g;
    const results: AIGuidanceMetadata[] = [];
    
    let match;
    while ((match = guidanceRegex.exec(text)) !== null) {
      const content = match[1];
      const parts = content.split(';');
      
      const metadata: Partial<AIGuidanceMetadata> = {};
      
      parts.forEach(part => {
        const [key, value] = part.split('=');
        if (key && value) {
          const keyTrimmed = key.trim();
          if (keyTrimmed === 'Section') {
            metadata.section = value.trim();
          } else if (keyTrimmed === 'Type') {
            metadata.type = value.trim();
          } else if (keyTrimmed === 'Min') {
            metadata.min = parseInt(value.trim(), 10);
          } else if (keyTrimmed === 'Max') {
            metadata.max = parseInt(value.trim(), 10);
          } else if (keyTrimmed === 'Référence') {
            metadata.reference = value.trim();
          }
        }
      });
      
      if (metadata.section && metadata.type) {
        results.push(metadata as AIGuidanceMetadata);
      }
    }
    
    return results;
  };

  // Function to process AI guidance from the current document
  const processAIGuidance = (documentText: string) => {
    const guidanceMetadata = parseAIGuidance(documentText);
    setAiGuidance(guidanceMetadata);
    return guidanceMetadata;
  };

  return {
    syncLegifrance,
    getReglementaryTexts,
    parseAIGuidance,
    processAIGuidance,
    aiGuidance,
    isLoading,
    error,
    data,
  };
};
