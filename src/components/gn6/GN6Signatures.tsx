import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SignaturePad from '@/components/documents/SignaturePad';
import { FileSignature, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

interface SignatureGN6Data {
  id: string;
  type: 'organisateur' | 'exploitant';
  nom: string;
  qualite: string;
  date: string;
  signatureData: string;
}

interface GN6SignaturesProps {
  setValue: any;
}

const GN6Signatures: React.FC<GN6SignaturesProps> = ({ setValue }) => {
  const [signatures, setSignatures] = useState<SignatureGN6Data[]>([]);
  const [currentSignature, setCurrentSignature] = useState({
    type: 'organisateur' as 'organisateur' | 'exploitant',
    nom: '',
    qualite: '',
  });
  const [showSignaturePad, setShowSignaturePad] = useState(false);

  const handleSignatureCapture = (signatureData: string) => {
    const newSignature: SignatureGN6Data = {
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
      type: 'organisateur',
      nom: '',
      qualite: '',
    });

    toast.success('Signature ajoutée avec succès');
  };

  const removeSignature = (id: string) => {
    const updatedSignatures = signatures.filter(sig => sig.id !== id);
    setSignatures(updatedSignatures);
    setValue('content.signatures', updatedSignatures);
    toast.info('Signature supprimée');
  };

  const hasOrganisateurSignature = signatures.some(s => s.type === 'organisateur');
  const hasExploitantSignature = signatures.some(s => s.type === 'exploitant');

  return (
    <Card className="p-6 mb-6 bg-formBackground border-formBorder">
      <div className="flex items-center gap-3 mb-6">
        <FileSignature className="text-accentBleu" size={28} />
        <h2 className="text-2xl font-bold text-textPrincipal">Signatures et Engagements</h2>
      </div>

      {/* Engagements */}
      <div className="mb-8 bg-white border border-formBorder rounded-relume-md p-6">
        <h3 className="text-lg font-semibold text-textPrincipal mb-4">Engagement du demandeur</h3>
        <div className="prose prose-sm text-textPrincipal/80">
          <p>
            Je soussigné(e), organisateur de la manifestation décrite ci-dessus, m'engage à :
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>Respecter l'ensemble des prescriptions réglementaires en matière de sécurité incendie et d'accessibilité</li>
            <li>Mettre en œuvre toutes les mesures de sécurité décrites dans le présent dossier</li>
            <li>Informer immédiatement les services de secours en cas d'incident</li>
            <li>Tenir à disposition des services de contrôle l'ensemble des documents et attestations</li>
            <li>Respecter la capacité d'accueil maximale autorisée</li>
          </ul>
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
                    {sig.type === 'organisateur' ? 'Organisateur' : 'Exploitant du lieu'} - Signé le {sig.date}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeSignature(sig.id)}
                className="text-accentRouge hover:bg-red-50"
              >
                Supprimer
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Formulaire d'ajout de signature */}
      {!showSignaturePad ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="form-label">Type de signataire *</Label>
              <select
                value={currentSignature.type}
                onChange={(e) => setCurrentSignature({ ...currentSignature, type: e.target.value as 'organisateur' | 'exploitant' })}
                className="form-input"
              >
                <option value="organisateur">Organisateur</option>
                <option value="exploitant">Exploitant du lieu</option>
              </select>
            </div>

            <div>
              <Label className="form-label">Nom et prénom *</Label>
              <Input
                value={currentSignature.nom}
                onChange={(e) => setCurrentSignature({ ...currentSignature, nom: e.target.value })}
                placeholder="Nom complet"
                className="form-input"
              />
            </div>

            <div>
              <Label className="form-label">Qualité *</Label>
              <Input
                value={currentSignature.qualite}
                onChange={(e) => setCurrentSignature({ ...currentSignature, qualite: e.target.value })}
                placeholder="Ex: Président, Directeur..."
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
            <FileSignature size={18} className="mr-2" />
            Signer électroniquement
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-textPrincipal/70">
            Signature de <strong>{currentSignature.nom}</strong> ({currentSignature.qualite})
            en tant que <strong>{currentSignature.type === 'organisateur' ? 'Organisateur' : 'Exploitant du lieu'}</strong>
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

      {/* Alertes */}
      <div className="mt-6 space-y-3">
        {!hasOrganisateurSignature && (
          <div className="p-4 bg-alertBackground border border-alertText rounded-relume-md">
            <p className="text-sm text-alertText">
              ⚠️ La signature de l'organisateur est obligatoire
            </p>
          </div>
        )}

        {hasOrganisateurSignature && hasExploitantSignature && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-relume-md">
            <p className="text-sm text-green-700 font-medium">
              ✓ Toutes les signatures requises ont été apposées
            </p>
          </div>
        )}
      </div>

      {/* Zone pour cachet */}
      <div className="mt-8 p-6 border-2 border-dashed border-formBorder rounded-relume-md bg-white text-center">
        <p className="text-sm text-textPrincipal/60">Zone réservée au cachet de l'organisation</p>
      </div>
    </Card>
  );
};

export default GN6Signatures;
