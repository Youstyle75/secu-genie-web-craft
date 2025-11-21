import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { eventType, capacity, duration, isOutdoor } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Tu es un expert en sécurité incendie et réglementations ERP françaises. 
Tu dois générer des mesures de sécurité conformes aux arrêtés du 25 juin 1980 modifié et aux dernières réglementations 2025 pour un dossier GN6.

IMPORTANT: Réponds UNIQUEMENT avec un objet JSON valide, sans texte avant ou après.

Structure attendue:
{
  "mesuresComplementaires": {
    "barrieresSecurite": boolean,
    "eclairageSecurite": boolean,
    "extincteurs": boolean,
    "alarmeIncendie": boolean,
    "issuesSecours": boolean,
    "planEvacuation": boolean,
    "pointRassemblement": boolean,
    "secouristes": boolean,
    "sanitaires": boolean,
    "stockageDechets": boolean,
    "precisions": "texte détaillé des mesures spécifiques"
  },
  "serviceSecurity": {
    "securitePrivee": {
      "present": boolean,
      "nombre": number,
      "societe": ""
    },
    "securitePublique": {
      "present": boolean,
      "details": ""
    },
    "pompiers": {
      "present": boolean,
      "nombre": number,
      "type": "prevention" | "surveillance" | "intervention"
    }
  },
  "assurances": {
    "responsabiliteCivile": true,
    "montantGarantie": "montant suggéré basé sur la capacité"
  }
}`;

    const userPrompt = `Génère les mesures de sécurité pour une manifestation avec ces caractéristiques:
- Type d'événement: ${eventType}
- Capacité d'accueil: ${capacity} personnes
- Durée: ${duration}
- Lieu: ${isOutdoor ? 'Plein air' : 'Lieu couvert'}

Respecte les obligations réglementaires:
- Si capacité > 1500: service d'ordre OBLIGATOIRE
- Plan d'évacuation TOUJOURS obligatoire
- Extincteurs selon surface et activité
- Éclairage de sécurité si manifestation de nuit

Fournis des mesures adaptées et conformes.`;

    console.log("Generating AI measures for:", { eventType, capacity, duration, isOutdoor });

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
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: "Limite de requêtes atteinte. Veuillez réessayer dans quelques instants." 
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: "Crédits insuffisants. Veuillez ajouter des crédits à votre workspace." 
        }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const generatedContent = aiResponse.choices[0].message.content;
    
    console.log("AI Response:", generatedContent);

    // Parse JSON from AI response
    let measures;
    try {
      // Remove markdown code blocks if present
      const cleanContent = generatedContent.replace(/```json\n?|\n?```/g, '').trim();
      measures = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error("Raw content:", generatedContent);
      throw new Error("Failed to parse AI response as JSON");
    }

    return new Response(JSON.stringify({ measures }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in ai-gn6-measures:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Une erreur est survenue lors de la génération" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
