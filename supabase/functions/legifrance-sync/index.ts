
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Auth context of the function
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the Legifrance API key from environment variables
    const legifranceKey = Deno.env.get('LEGIFRANCE_KEY')
    if (!legifranceKey) {
      throw new Error('LEGIFRANCE_KEY is not set in environment variables')
    }

    // Fetch updates from the Legifrance API
    const response = await fetch('https://api.legifrance.gouv.fr/changes', {
      headers: { 'Authorization': `Bearer ${legifranceKey}` }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch from Legifrance API: ${response.statusText}`)
    }

    const updates = await response.json()

    // Extract AI guidance metadata from content if present
    const extractAIGuidance = (content) => {
      const guidanceMetadata = [];
      const regex = /<!-- IA:([^>]+) -->/g;
      
      let match;
      while ((match = regex.exec(content)) !== null) {
        guidanceMetadata.push(match[0]);
      }
      
      return guidanceMetadata;
    };

    // Map the data to match the ReglementaryText type structure
    const formattedUpdates = updates.map((item: any) => {
      const content = item.content || '';
      const aiGuidance = extractAIGuidance(content);
      
      return {
        id: item.id || crypto.randomUUID(),
        title: item.title || 'Untitled regulation',
        content: content,
        category: item.category || 'ERP',
        references: item.references || [],
        aiGuidance: aiGuidance,
        datePublication: item.datePublication || new Date().toISOString(),
        dateLastUpdate: new Date().toISOString()
      };
    });

    // Insert or update the regulations in the Supabase database
    const { data, error } = await supabaseClient
      .from('regulations')
      .upsert(formattedUpdates)

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully synchronized ${formattedUpdates.length} regulations` 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
