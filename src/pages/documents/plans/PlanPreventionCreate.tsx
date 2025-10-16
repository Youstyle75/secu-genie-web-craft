import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from '@/components/layout/Layout';
import securityDocumentService from '@/services/securityDocumentService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Sparkles, Save } from 'lucide-react';
import PlanPreventionHeader from '@/components/prevention/PlanPreventionHeader';
import TravauxSection from '@/components/prevention/TravauxSection';
import ChecklistSection from '@/components/prevention/ChecklistSection';
import RisquesSection from '@/components/prevention/RisquesSection';
import DispositionsGenerales from '@/components/prevention/DispositionsGenerales';
import SignatureBlock from '@/components/prevention/SignatureBlock';
import PlanDrawingEditor from '@/components/prevention/PlanDrawingEditor';
import ExportButtons from '@/components/documents/ExportButtons';

// Définition complète du type FormData
interface FormData {
  title: string;
  establishmentId: string;
  content: {
    entrepriseUtilisatrice: {
      raisonSociale: string;
      adresse: string;
      correspondantNom: string;
      correspondantFonction: string;
      correspondantTel: string;
      correspondantEmail: string;
    };
    entrepriseExterieure: {
      raisonSociale: string;
      adresse: string;
      correspondantNom: string;
      correspondantFonction: string;
      correspondantTel: string;
      correspondantEmail: string;
    };
    natureTravaux: string;
    dateDebut: string;
    dateFin: string;
    horaires: string;
    lieuIntervention: string;
    effectifPrevu: number;
    sousTraitants: string;
    visitePrealable: string;
    moyens: Record<string, boolean>;
    documents: Record<string, boolean>;
    risques: any;
    dispositions: Record<string, string>;
    signatures: any[];
  };
}

// Schéma de validation
const validationSchema = yup.object().shape({
  title: yup.string().required('Le titre est obligatoire'),
  establishmentId: yup.string().required('L\'établissement est obligatoire'),
  content: yup.object().shape({
    entrepriseUtilisatrice: yup.object().shape({
      raisonSociale: yup.string().required('Raison sociale requise'),
    }),
    entrepriseExterieure: yup.object().shape({
      raisonSociale: yup.string().required('Raison sociale requise'),
    }),
    natureTravaux: yup.string().required('La nature des travaux est obligatoire'),
  }).required()
});

const PlanPreventionCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    register,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema) as any,
    defaultValues: {
      title: '',
      establishmentId: '',
      content: {
        entrepriseUtilisatrice: {
          raisonSociale: '',
          adresse: '',
          correspondantNom: '',
          correspondantFonction: '',
          correspondantTel: '',
          correspondantEmail: '',
        },
        entrepriseExterieure: {
          raisonSociale: '',
          adresse: '',
          correspondantNom: '',
          correspondantFonction: '',
          correspondantTel: '',
          correspondantEmail: '',
        },
        natureTravaux: '',
        dateDebut: '',
        dateFin: '',
        horaires: '',
        lieuIntervention: '',
        effectifPrevu: 0,
        sousTraitants: '',
        visitePrealable: '',
        moyens: {},
        documents: {},
        risques: {},
        dispositions: {},
        signatures: [],
      },
    },
  });
  
  // Liste d'établissements fictifs pour le prototype
  const establishments = [
    { id: 'estab-1', name: 'Centre Commercial Les Arcades' },
    { id: 'estab-2', name: 'Théâtre Municipal' },
    { id: 'estab-3', name: 'Restaurant La Bonne Table' },
  ];
  
  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    
    const newDocument = securityDocumentService.createSecurityDocument({
      title: data.title,
      documentType: 'PlanPrevention',
      establishmentId: data.establishmentId,
      content: data.content,
      status: 'brouillon',
    });
    
    setTimeout(() => {
      setLoading(false);
      navigate(`/documents/${newDocument.id}/relecture`);
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="container-large py-8">
        {/* En-tête avec introduction */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-accentBleu/5 to-accentBleu/10 border-accentBleu/20">
          <h1 className="text-4xl font-bold text-textPrincipal mb-4">Plan de Prévention</h1>
          <div className="prose prose-sm text-textPrincipal/80">
            <p className="mb-2">
              <strong>Définition :</strong> Le plan de prévention est un document obligatoire établi lors de l'intervention 
              d'entreprises extérieures dans le cadre de l'article R.4511-1 du Code du Travail.
            </p>
            <p>
              <strong>Cadre réglementaire :</strong> Décret n°92-158 du 20 février 1992 fixant les prescriptions particulières 
              d'hygiène et de sécurité applicables aux travaux effectués dans un établissement par une entreprise extérieure.
            </p>
          </div>
        </Card>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Informations de base */}
          <Card className="p-6 bg-formBackground border-formBorder">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="form-label">Titre du Plan de Prévention</Label>
                <Input {...register('title')} className="form-input" placeholder="Ex: Plan de Prévention - Travaux électriques" />
                {errors.title && <p className="form-error">{errors.title.message}</p>}
              </div>
              
              <div>
                <Label className="form-label">Référence établissement</Label>
                <Input {...register('establishmentId')} className="form-input" placeholder="Ex: ERP-001" />
                {errors.establishmentId && <p className="form-error">{errors.establishmentId.message}</p>}
              </div>
            </div>
          </Card>

          {/* Sections principales */}
          <PlanPreventionHeader register={register} errors={errors} />
          <TravauxSection register={register} errors={errors} />
          <ChecklistSection register={register} watch={watch} setValue={setValue} />
          <RisquesSection register={register} watch={watch} />
          <DispositionsGenerales register={register} />
          
          {/* Éditeur de plan */}
          <PlanDrawingEditor />
          
          {/* Signatures */}
          <SignatureBlock setValue={setValue} />

          {/* Boutons d'action */}
          <div className="flex gap-4 justify-between items-center sticky bottom-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-elevated border border-border">
            <ExportButtons
              documentData={{
                metadata: {
                  type: 'plan-prevention',
                  title: watch('title') || 'Plan de Prévention',
                  createdAt: new Date().toISOString(),
                  author: 'SecuGenie User',
                  version: '1.0'
                },
                content: watch()
              }}
              showImageExport={true}
              onExportImage={() => {
                // Trigger the canvas export
                const canvas = (window as any).editorCanvas;
                if (canvas) {
                  const dataURL = canvas.toDataURL({ 
                    format: 'png',
                    quality: 1,
                    multiplier: 2
                  });
                  const link = document.createElement('a');
                  link.download = `plan-prevention-${new Date().toISOString().split('T')[0]}.png`;
                  link.href = dataURL;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }}
            />
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/documents')}
              >
                Annuler
              </Button>
              
              <Button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? (
                  <>Enregistrement...</>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    Enregistrer
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default PlanPreventionCreate;
