import React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FileCheck, CheckCircle } from 'lucide-react';

interface GN6ChecklistProps {
  register: any;
  watch: any;
}

const GN6Checklist: React.FC<GN6ChecklistProps> = ({ register, watch }) => {
  const piecesJoindre = [
    {
      id: 'plan',
      label: 'Plan de situation et plan masse',
      obligatoire: true,
    },
    {
      id: 'notice',
      label: 'Notice de sécurité décrivant les dispositions prises',
      obligatoire: true,
    },
    {
      id: 'accordExploitant',
      label: 'Accord écrit de l\'exploitant du lieu',
      obligatoire: false,
    },
    {
      id: 'attestationAssurance',
      label: 'Attestation d\'assurance responsabilité civile',
      obligatoire: true,
    },
    {
      id: 'attestationSecurite',
      label: 'Attestation de la société de sécurité (si applicable)',
      obligatoire: false,
    },
    {
      id: 'contratSSSIAP',
      label: 'Contrat de prestation SSIAP / pompiers',
      obligatoire: false,
    },
    {
      id: 'planEvacuation',
      label: 'Plan d\'évacuation et consignes de sécurité',
      obligatoire: true,
    },
    {
      id: 'listePersonnel',
      label: 'Liste du personnel de sécurité avec qualifications',
      obligatoire: false,
    },
    {
      id: 'verificationsElectriques',
      label: 'Attestations de vérifications des installations électriques',
      obligatoire: false,
    },
    {
      id: 'verificationsStructures',
      label: 'Attestations de vérifications des structures temporaires',
      obligatoire: false,
    },
    {
      id: 'autorisationPrefectorale',
      label: 'Autorisation préfectorale (si requise)',
      obligatoire: false,
    },
    {
      id: 'declarationSONUM',
      label: 'Déclaration SONUM (diffusion de musique amplifiée)',
      obligatoire: false,
    },
  ];

  const piecesObligatoires = piecesJoindre.filter(p => p.obligatoire);
  const piecesFacultatives = piecesJoindre.filter(p => !p.obligatoire);

  const countChecked = () => {
    return piecesJoindre.filter(piece => 
      watch(`content.piecesJointes.${piece.id}`)
    ).length;
  };

  const countObligatoiresChecked = () => {
    return piecesObligatoires.filter(piece => 
      watch(`content.piecesJointes.${piece.id}`)
    ).length;
  };

  return (
    <Card className="p-6 mb-6 bg-formBackground border-formBorder">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileCheck className="text-accentBleu" size={28} />
          <h2 className="text-2xl font-bold text-textPrincipal">Pièces à joindre au dossier</h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-textPrincipal/60">Complétude</p>
          <p className="text-2xl font-bold text-accentBleu">
            {countChecked()}/{piecesJoindre.length}
          </p>
        </div>
      </div>

      {/* Indicateur de progression */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-textPrincipal/70">Pièces obligatoires</span>
          <span className="font-semibold text-textPrincipal">
            {countObligatoiresChecked()}/{piecesObligatoires.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-accentBleu h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(countObligatoiresChecked() / piecesObligatoires.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Pièces obligatoires */}
      <div className="mb-8 bg-white border border-formBorder rounded-relume-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-accentRouge/10 px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-accentRouge">OBLIGATOIRE</span>
          </div>
          <h3 className="text-lg font-semibold text-textPrincipal">Documents obligatoires</h3>
        </div>

        <div className="space-y-3">
          {piecesObligatoires.map((piece) => (
            <div
              key={piece.id}
              className={cn(
                "flex items-start space-x-3 p-4 rounded-md border-2 transition-all",
                watch(`content.piecesJointes.${piece.id}`)
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200 hover:border-red-300"
              )}
            >
              <Checkbox
                id={`piece-${piece.id}`}
                {...register(`content.piecesJointes.${piece.id}`)}
              />
              <div className="flex-1">
                <Label
                  htmlFor={`piece-${piece.id}`}
                  className="text-sm font-medium cursor-pointer leading-relaxed"
                >
                  {piece.label}
                </Label>
              </div>
              {watch(`content.piecesJointes.${piece.id}`) && (
                <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pièces facultatives */}
      <div className="bg-white border border-formBorder rounded-relume-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-accentBleu/10 px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-accentBleu">SELON CONTEXTE</span>
          </div>
          <h3 className="text-lg font-semibold text-textPrincipal">Documents complémentaires</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {piecesFacultatives.map((piece) => (
            <div
              key={piece.id}
              className={cn(
                "flex items-start space-x-3 p-3 rounded-md border transition-all",
                watch(`content.piecesJointes.${piece.id}`)
                  ? "bg-accentBleu/5 border-accentBleu/30"
                  : "border-formBorder hover:bg-formBackground"
              )}
            >
              <Checkbox
                id={`piece-${piece.id}`}
                {...register(`content.piecesJointes.${piece.id}`)}
              />
              <Label
                htmlFor={`piece-${piece.id}`}
                className="text-sm font-normal cursor-pointer leading-relaxed flex-1"
              >
                {piece.label}
              </Label>
              {watch(`content.piecesJointes.${piece.id}`) && (
                <CheckCircle className="text-accentBleu flex-shrink-0" size={18} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Alerte si pièces obligatoires manquantes */}
      {countObligatoiresChecked() < piecesObligatoires.length && (
        <div className="mt-6 p-4 bg-alertBackground border-2 border-alertText rounded-relume-md">
          <p className="text-sm text-alertText font-medium">
            ⚠️ Attention : {piecesObligatoires.length - countObligatoiresChecked()} pièce(s) obligatoire(s) manquante(s).
            Le dossier ne pourra être traité sans l'ensemble des documents requis.
          </p>
        </div>
      )}

      {/* Message de complétion */}
      {countObligatoiresChecked() === piecesObligatoires.length && (
        <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-relume-md">
          <p className="text-sm text-green-700 font-medium flex items-center gap-2">
            <CheckCircle className="text-green-600" size={20} />
            Toutes les pièces obligatoires sont cochées. Votre dossier peut être déposé.
          </p>
        </div>
      )}
    </Card>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default GN6Checklist;
