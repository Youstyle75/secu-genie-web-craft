
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { data, error } = await supabaseClient
      .from('secrets')
      .select('value')
      .eq('key', 'LEGIFRANCE_CLIENT_ID')
      .single()

    if (error) throw error

    const clientId = data.value
    const clientSecret = Deno.env.get('LEGIFRANCE_CLIENT_SECRET')
    
    // Configuration OAuth2
    const tokenUrl = 'https://oauth.aife.economie.gouv.fr/api/oauth/token'
    
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'openid',
      }),
    })

    const data = await response.json()

    return new Response(JSON.stringify({ 
      access_token: data.access_token,
      expires_in: data.expires_in 
    }), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
