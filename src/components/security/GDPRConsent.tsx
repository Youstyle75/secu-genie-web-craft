import { useState, useEffect } from 'react';
import { Cookie, Shield, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function GDPRConsent() {
  const [consents, setConsents] = useState({
    cookie_consent: false,
    data_processing_consent: false,
    marketing_consent: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConsents();
  }, []);

  const loadConsents = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('user_consents')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setConsents({
          cookie_consent: data.cookie_consent,
          data_processing_consent: data.data_processing_consent,
          marketing_consent: data.marketing_consent
        });
      }
    } catch (error) {
      console.error('Error loading consents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Non authentifié');
        return;
      }

      const { error } = await supabase
        .from('user_consents')
        .upsert({
          user_id: user.id,
          ...consents
        });

      if (error) throw error;

      toast.success('Préférences sauvegardées');
    } catch (error) {
      console.error('Error saving consents:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Confidentialité et consentements
        </CardTitle>
        <CardDescription>
          Gérez vos préférences de confidentialité conformément au RGPD
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="cookies" className="flex items-center gap-2">
                <Cookie className="h-4 w-4" />
                Cookies
              </Label>
              <p className="text-sm text-muted-foreground">
                Autoriser les cookies pour améliorer votre expérience
              </p>
            </div>
            <Switch
              id="cookies"
              checked={consents.cookie_consent}
              onCheckedChange={(checked) =>
                setConsents({ ...consents, cookie_consent: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="data" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Traitement des données
              </Label>
              <p className="text-sm text-muted-foreground">
                Consentement pour le traitement de vos données personnelles
              </p>
            </div>
            <Switch
              id="data"
              checked={consents.data_processing_consent}
              onCheckedChange={(checked) =>
                setConsents({ ...consents, data_processing_consent: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Communications marketing
              </Label>
              <p className="text-sm text-muted-foreground">
                Recevoir des informations sur nos produits et services
              </p>
            </div>
            <Switch
              id="marketing"
              checked={consents.marketing_consent}
              onCheckedChange={(checked) =>
                setConsents({ ...consents, marketing_consent: checked })
              }
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Sauvegarder les préférences
        </Button>
      </CardContent>
    </Card>
  );
}
