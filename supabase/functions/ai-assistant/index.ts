import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build system prompt based on type
    let systemPrompt = "";
    let userPrompt = "";

    switch (type) {
      case "generate_gn6":
        systemPrompt = `Tu es un expert en sécurité incendie et réglementation ERP. 
        Tu aides à pré-remplir des dossiers de sécurité GN6 pour des manifestations temporaires.
        Tu dois générer du contenu structuré, précis et conforme à la réglementation française.
        Fournis des réponses en français, claires et professionnelles.`;
        
        userPrompt = `Génère le contenu d'un dossier GN6 pour une manifestation avec les caractéristiques suivantes:
        - Type d'ERP: ${context.erpType || 'Non spécifié'}
        - Capacité d'accueil: ${context.capacity || 'Non spécifiée'}
        - Lieu: ${context.location || 'Non spécifié'}
        - Nature de la manifestation: ${context.nature || 'Non spécifiée'}
        
        Génère les sections suivantes en JSON:
        {
          "natureManif": "Description détaillée de la manifestation",
          "mesuresComplementaires": "Liste des mesures de sécurité adaptées",
          "serviceSecurite": "Recommandations pour le service de sécurité",
          "serviceOrdre": "Recommandations pour le service d'ordre"
        }`;
        break;

      case "generate_risks":
        systemPrompt = `Tu es un expert en analyse des risques pour les établissements recevant du public.
        Tu identifies les risques spécifiques selon le type d'activité et proposes des mesures de prévention adaptées.`;
        
        userPrompt = `Analyse les risques pour un établissement avec:
        - Type: ${context.type || 'ERP'}
        - Activité: ${context.activity || 'Non spécifiée'}
        - Capacité: ${context.capacity || 'Non spécifiée'}
        
        Génère en JSON:
        {
          "risquesIdentifies": "Liste détaillée des risques",
          "mesuresPrevention": "Mesures de prévention recommandées"
        }`;
        break;

      case "check_compliance":
        systemPrompt = `Tu es un expert en conformité réglementaire pour les documents de sécurité.
        Tu vérifies la complétude et la conformité des documents selon la réglementation en vigueur.`;
        
        userPrompt = `Vérifie la conformité du document suivant:
        Type: ${context.documentType}
        Contenu: ${JSON.stringify(context.content)}
        
        Génère en JSON:
        {
          "conforme": true/false,
          "pointsManquants": ["liste des points manquants"],
          "suggestions": ["suggestions d'amélioration"]
        }`;
        break;

      case "chat":
        systemPrompt = `Tu es SecuBot, un assistant expert en réglementation de sécurité incendie et ERP.
        Tu réponds aux questions sur:
        - La réglementation des ERP (code de la construction et de l'habitation)
        - Les normes de sécurité incendie
        - Les plans de prévention
        - Les notices de sécurité
        
        Fournis des réponses précises, citant les textes réglementaires quand c'est pertinent.
        Reste professionnel et structuré dans tes réponses.`;
        
        userPrompt = context.message || "Bonjour";
        break;

      default:
        throw new Error("Type de requête non supporté");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requêtes atteinte, veuillez réessayer plus tard." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crédits insuffisants, veuillez recharger votre compte." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Erreur lors de l'appel à l'IA");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Aucune réponse de l'IA");
    }

    // Try to parse JSON if it's a structured response
    let result;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        result = { content };
      }
    } catch {
      result = { content };
    }

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in ai-assistant function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur inconnue" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
