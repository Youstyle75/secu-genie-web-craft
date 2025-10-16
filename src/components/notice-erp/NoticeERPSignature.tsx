import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import SignaturePad from '@/components/documents/SignaturePad';
import { FileCheck, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

interface SignatureData {
  id: string;
  type: string;
  nom: string;
  qualite: string;
  date: string;
  signatureData: string;
}

interface NoticeERPSignatureProps {
  setValue: any;
}

const NoticeERPSignature: React.FC<NoticeERPSignatureProps> = ({ setValue }) => {
  const [signatures, setSignatures] = useState<SignatureData[]>([]);
  const [currentSignature, setCurrentSignature] = useState({
    type: 'maitre-ouvrage',
    nom: '',
    qualite: '',
  });
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [attestations, setAttestations] = useState({
    conformiteReglementaire: false,
    conformitePlans: false,
    mesuresSecurite: false,
  });

  const handleSignatureCapture = (signatureData: string) => {
    const newSignature: SignatureData = {
      id: `sig-${Date.now()}`,
      ...currentSignature,
      date: new Date().toLocaleDateString('fr-FR'),
      signatureData,
    };

    const updatedSignatures = [...signatures, newSignature];
    setSignatures(updatedSignatures);
    setValue('content.signatures', updatedSignatures);

    setShowSignaturePad(false);
    setCurrentSignature({
      type: 'maitre-ouvrage',
      nom: '',
      qualite: '',
    });

    toast.success('Signature ajoutée avec succès');
  };

  const handleAttestationChange = (key: string, checked: boolean) => {
    const updated = { ...attestations, [key]: checked };
    setAttestations(updated);
    setValue('content.attestations', updated);
  };

  return (
    <Card className="p-6 mb-6 bg-formBackground border-formBorder">
      <div className="flex items-center gap-3 mb-6">
        <FileCheck className="text-accentBleu" size={28} />
        <h2 className="text-2xl font-bold text-textPrincipal">Attestations et Signatures</h2>
      </div>

      {/* Attestations */}
      <div className="mb-8 bg-white border border-formBorder rounded-relume-md p-6">
        <h3 className="text-lg font-semibold text-textPrincipal mb-4">Attestations</h3>
        <p className="text-sm text-textPrincipal/70 mb-4">
          Le soussigné, maître d'ouvrage ou son mandataire, atteste que :
        </p>

        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="attest-reglementaire"
              checked={attestations.conformiteReglementaire}
              onCheckedChange={(checked) => 
                handleAttestationChange('conformiteReglementaire', checked as boolean)
              }
            />
            <Label htmlFor="attest-reglementaire" className="cursor-pointer text-sm leading-relaxed">
              Les travaux décrits dans cette notice sont conformes aux dispositions réglementaires 
              applicables aux établissements recevant du public
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="attest-plans"
              checked={attestations.conformitePlans}
              onCheckedChange={(checked) => 
                handleAttestationChange('conformitePlans', checked as boolean)
              }
            />
            <Label htmlFor="attest-plans" className="cursor-pointer text-sm leading-relaxed">
              Les plans joints à cette notice sont conformes aux travaux réalisés ou à réaliser
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="attest-mesures"
              checked={attestations.mesuresSecurite}
              onCheckedChange={(checked) => 
                handleAttestationChange('mesuresSecurite', checked as boolean)
              }
            />
            <Label htmlFor="attest-mesures" className="cursor-pointer text-sm leading-relaxed">
              Toutes les mesures de sécurité prévues seront mises en œuvre conformément 
              aux prescriptions du règlement de sécurité
            </Label>
          </div>
        </div>
      </div>

      {/* Signatures existantes */}
      {signatures.length > 0 && (
        <div className="mb-6 space-y-3">
          {signatures.map((sig) => (
            <div
              key={sig.id}
              className="flex items-center justify-between p-4 bg-white border border-formBorder rounded-relume-md"
            >
              <div className="flex items-center gap-3">
                <UserCheck className="text-green-600" size={24} />
                <div>
                  <p className="font-semibold text-textPrincipal">{sig.nom}</p>
                  <p className="text-sm text-textPrincipal/70">{sig.qualite}</p>
                  <p className="text-xs text-textPrincipal/50">
                    {sig.type === 'maitre-ouvrage' ? 'Maître d\'ouvrage' : 
                     sig.type === 'architecte' ? 'Architecte' : 
                     'Bureau de contrôle'} - Signé le {sig.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Formulaire d'ajout de signature */}
      {!showSignaturePad ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="form-label">Type de signataire</Label>
              <select
                value={currentSignature.type}
                onChange={(e) => setCurrentSignature({ ...currentSignature, type: e.target.value })}
                className="form-input"
              >
                <option value="maitre-ouvrage">Maître d'ouvrage</option>
                <option value="architecte">Architecte</option>
                <option value="bureau-controle">Bureau de contrôle</option>
              </select>
            </div>

            <div>
              <Label className="form-label">Nom et prénom</Label>
              <Input
                value={currentSignature.nom}
                onChange={(e) => setCurrentSignature({ ...currentSignature, nom: e.target.value })}
                placeholder="Nom complet"
                className="form-input"
              />
            </div>

            <div>
              <Label className="form-label">Qualité</Label>
              <Input
                value={currentSignature.qualite}
                onChange={(e) => setCurrentSignature({ ...currentSignature, qualite: e.target.value })}
                placeholder="Ex: Directeur, Gérant..."
                className="form-input"
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={() => {
              if (!currentSignature.nom || !currentSignature.qualite) {
                toast.error('Veuillez remplir tous les champs');
                return;
              }
              setShowSignaturePad(true);
            }}
            className="btn-primary"
          >
            <UserCheck size={18} className="mr-2" />
            Signer électroniquement
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-textPrincipal/70">
            Signature de <strong>{currentSignature.nom}</strong> ({currentSignature.qualite})
          </p>
          <SignaturePad onSignatureCapture={handleSignatureCapture} />
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowSignaturePad(false)}
          >
            Annuler
          </Button>
        </div>
      )}

      {/* Zone cachet */}
      <div className="mt-8 p-6 border-2 border-dashed border-formBorder rounded-relume-md bg-white text-center">
        <p className="text-sm text-textPrincipal/60">Zone réservée au cachet de l'établissement</p>
      </div>
    </Card>
  );
};

export default NoticeERPSignature;
