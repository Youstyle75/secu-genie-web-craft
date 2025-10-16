import { useState } from 'react';
import { Shield, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import {
  generateTOTPSecret,
  generateBackupCodes,
  generateTOTPQRCode,
  saveTOTPSecret,
  verifyTOTPCode,
  enable2FA
} from '@/lib/security/totp';
import { logAudit } from '@/lib/security/audit';
import QRCode from 'qrcode';

interface TwoFactorSetupProps {
  userEmail: string;
  onComplete: () => void;
}

export function TwoFactorSetup({ userEmail, onComplete }: TwoFactorSetupProps) {
  const [step, setStep] = useState<'generate' | 'verify' | 'backup'>('generate');
  const [secret, setSecret] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const newSecret = generateTOTPSecret();
      const codes = generateBackupCodes();
      const otpauthUrl = generateTOTPQRCode(newSecret, userEmail);
      
      // Generate QR code image
      const qrUrl = await QRCode.toDataURL(otpauthUrl);
      
      setSecret(newSecret);
      setBackupCodes(codes);
      setQrCodeUrl(qrUrl);
      
      // Save to database
      await saveTOTPSecret(newSecret, codes);
      
      setStep('verify');
    } catch (error) {
      console.error('Error generating 2FA:', error);
      toast.error('Erreur lors de la génération du code 2FA');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const isValid = await verifyTOTPCode(verificationCode);
      
      if (isValid) {
        await enable2FA();
        await logAudit({
          action: 'user.2fa_enabled',
          resource_type: 'user'
        });
        setStep('backup');
        toast.success('2FA activé avec succès !');
      } else {
        toast.error('Code invalide. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Error verifying 2FA:', error);
      toast.error('Erreur lors de la vérification');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    setCopied(true);
    toast.success('Codes de secours copiés !');
    setTimeout(() => setCopied(false), 2000);
  };

  if (step === 'generate') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Activer l'authentification à deux facteurs
          </CardTitle>
          <CardDescription>
            Renforcez la sécurité de votre compte avec la 2FA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire
              en exigeant un code unique lors de la connexion.
            </AlertDescription>
          </Alert>
          <Button onClick={handleGenerate} disabled={loading} className="mt-4 w-full">
            Générer le code 2FA
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step === 'verify') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Scanner le QR Code</CardTitle>
          <CardDescription>
            Utilisez Google Authenticator ou une autre application TOTP
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <img src={qrCodeUrl} alt="QR Code 2FA" className="w-64 h-64" />
          </div>
          
          <div className="space-y-2">
            <Label>Ou entrez ce code manuellement :</Label>
            <div className="flex gap-2">
              <Input value={secret} readOnly className="font-mono" />
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(secret);
                  toast.success('Code copié !');
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="verification-code">
              Code de vérification (6 chiffres)
            </Label>
            <Input
              id="verification-code"
              type="text"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className="font-mono text-center text-2xl"
            />
          </div>

          <Button
            onClick={handleVerify}
            disabled={loading || verificationCode.length !== 6}
            className="w-full"
          >
            Vérifier et activer
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-600">2FA Activé !</CardTitle>
        <CardDescription>
          Sauvegardez vos codes de secours
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            <strong>Important :</strong> Sauvegardez ces codes de secours dans un endroit sûr.
            Ils vous permettront d'accéder à votre compte si vous perdez votre appareil 2FA.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            {backupCodes.map((code, i) => (
              <div key={i}>{code}</div>
            ))}
          </div>
          
          <Button
            onClick={handleCopyBackupCodes}
            variant="outline"
            className="w-full"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copié !
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copier les codes de secours
              </>
            )}
          </Button>
        </div>

        <Button onClick={onComplete} className="w-full">
          Terminer
        </Button>
      </CardContent>
    </Card>
  );
}
