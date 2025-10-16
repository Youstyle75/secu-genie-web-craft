import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SignaturePad from '@/components/documents/SignaturePad';
import { FileSignature, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Signature {
  id: string;
  role: string;
  nom: string;
  fonction: string;
  date: string;
  signatureData: string;
}

interface SignatureBlockProps {
  setValue: any;
}

const SignatureBlock: React.FC<SignatureBlockProps> = ({ setValue }) => {
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [currentSignature, setCurrentSignature] = useState({
    role: 'entreprise-utilisatrice',
    nom: '',
    fonction: '',
  });
  const [showSignaturePad, setShowSignaturePad] = useState(false);

  const handleSignatureCapture = (signatureData: string) => {
    const newSignature: Signature = {
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
      role: 'entreprise-utilisatrice',
      nom: '',
      fonction: '',
    });
    
    toast.success('Signature ajoutée avec succès');
  };

  const removeSignature = (id: string) => {
    const updatedSignatures = signatures.filter(sig => sig.id !== id);
    setSignatures(updatedSignatures);
    setValue('content.signatures', updatedSignatures);
    toast.info('Signature supprimée');
  };

  return (
    <Card className="p-6 mb-6 bg-formBackground border-formBorder">
      <div className="flex items-center gap-3 mb-6">
        <FileSignature className="text-accentBleu" size={28} />
        <h2 className="text-2xl font-bold text-textPrincipal">Signatures</h2>
      </div>

      {/* Signatures existantes */}
      {signatures.length > 0 && (
        <div className="mb-6 space-y-4">
          {signatures.map((sig) => (
            <div 
              key={sig.id} 
              className="flex items-center justify-between p-4 bg-white border border-formBorder rounded-relume-md"
            >
              <div className="flex items-center gap-4">
                <CheckCircle className="text-green-600" size={24} />
                <div>
                  <p className="font-semibold text-textPrincipal">{sig.nom}</p>
                  <p className="text-sm text-textPrincipal/70">
                    {sig.fonction} - {sig.role === 'entreprise-utilisatrice' ? 'Entreprise Utilisatrice' : 'Entreprise Extérieure'}
                  </p>
                  <p className="text-xs text-textPrincipal/50">Signé le {sig.date}</p>
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
              <Label className="form-label">Rôle</Label>
              <select
                value={currentSignature.role}
                onChange={(e) => setCurrentSignature({...currentSignature, role: e.target.value})}
                className="form-input"
              >
                <option value="entreprise-utilisatrice">Entreprise Utilisatrice</option>
                <option value="entreprise-exterieure">Entreprise Extérieure</option>
              </select>
            </div>
            
            <div>
              <Label className="form-label">Nom du signataire</Label>
              <Input
                value={currentSignature.nom}
                onChange={(e) => setCurrentSignature({...currentSignature, nom: e.target.value})}
                placeholder="Nom complet"
                className="form-input"
              />
            </div>
            
            <div>
              <Label className="form-label">Fonction</Label>
              <Input
                value={currentSignature.fonction}
                onChange={(e) => setCurrentSignature({...currentSignature, fonction: e.target.value})}
                placeholder="Fonction du signataire"
                className="form-input"
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={() => {
              if (!currentSignature.nom || !currentSignature.fonction) {
                toast.error('Veuillez remplir tous les champs');
                return;
              }
              setShowSignaturePad(true);
            }}
            className="btn-primary"
          >
            <FileSignature size={18} className="mr-2" />
            Ajouter une signature
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-textPrincipal/70">
            Signature de <strong>{currentSignature.nom}</strong> ({currentSignature.fonction})
          </p>
          <SignaturePad onSignatureCapture={handleSignatureCapture} />
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowSignaturePad(false)}
            className="mt-2"
          >
            Annuler
          </Button>
        </div>
      )}

      {/* Zone pour cachet */}
      <div className="mt-6 p-4 border-2 border-dashed border-formBorder rounded-relume-md bg-white">
        <p className="text-sm text-textPrincipal/60 text-center">
          Zone réservée au cachet de l'entreprise
        </p>
      </div>
    </Card>
  );
};

export default SignatureBlock;
