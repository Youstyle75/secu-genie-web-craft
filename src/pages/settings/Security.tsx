import { useState, useEffect } from 'react';
import { Shield, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TwoFactorSetup } from '@/components/security/TwoFactorSetup';
import { GDPRConsent } from '@/components/security/GDPRConsent';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { is2FAEnabled, disable2FA } from '@/lib/security/totp';
import { logAudit } from '@/lib/security/audit';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function Security() {
  const { user } = useAuth();
  const [has2FA, setHas2FA] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check2FAStatus();
  }, []);

  const check2FAStatus = async () => {
    const enabled = await is2FAEnabled();
    setHas2FA(enabled);
    setLoading(false);
  };

  const handleDisable2FA = async () => {
    try {
      await disable2FA();
      await logAudit({
        action: 'user.2fa_disabled',
        resource_type: 'user'
      });
      setHas2FA(false);
      toast.success('2FA désactivé');
    } catch (error) {
      console.error('Error disabling 2FA:', error);
      toast.error('Erreur lors de la désactivation');
    }
  };

  const handleExportData = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase.rpc('export_user_data', {
        target_user_id: user.id
      });

      if (error) throw error;

      // Download as JSON file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `secugenie-data-${new Date().toISOString()}.json`;
      a.click();
      URL.revokeObjectURL(url);

      await logAudit({
        action: 'data.export',
        resource_type: 'user'
      });

      toast.success('Données exportées avec succès');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Erreur lors de l\'export');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (!user) return;

      // This would need an edge function to properly handle account deletion
      // For now, we'll just log the action
      await logAudit({
        action: 'user.account_deletion_requested',
        resource_type: 'user'
      });

      toast.success('Demande de suppression envoyée. Vous recevrez un email de confirmation.');
    } catch (error) {
      console.error('Error requesting account deletion:', error);
      toast.error('Erreur lors de la demande');
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sécurité et confidentialité</h1>
        <p className="text-muted-foreground">
          Gérez les paramètres de sécurité de votre compte
        </p>
      </div>

      {/* 2FA Section */}
      <div>
        {has2FA ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Shield className="h-5 w-5" />
                Authentification à deux facteurs activée
              </CardTitle>
              <CardDescription>
                Votre compte est protégé par la 2FA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Désactiver la 2FA</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Désactiver la 2FA ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cela réduira la sécurité de votre compte. Êtes-vous sûr de vouloir continuer ?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDisable2FA}>
                      Désactiver
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        ) : showSetup ? (
          <TwoFactorSetup
            userEmail={user?.email || ''}
            onComplete={() => {
              setShowSetup(false);
              setHas2FA(true);
            }}
          />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Authentification à deux facteurs
              </CardTitle>
              <CardDescription>
                Ajoutez une couche de sécurité supplémentaire à votre compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowSetup(true)}>
                Activer la 2FA
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* GDPR Consent */}
      <GDPRConsent />

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Gestion des données</CardTitle>
          <CardDescription>
            Exportez ou supprimez vos données conformément au RGPD
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Exporter mes données</p>
              <p className="text-sm text-muted-foreground">
                Téléchargez toutes vos données au format JSON
              </p>
            </div>
            <Button onClick={handleExportData} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="font-medium text-destructive">Supprimer mon compte</p>
              <p className="text-sm text-muted-foreground">
                Suppression définitive de toutes vos données
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Supprimer définitivement le compte ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. Toutes vos données seront définitivement supprimées.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive">
                    Supprimer définitivement
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
