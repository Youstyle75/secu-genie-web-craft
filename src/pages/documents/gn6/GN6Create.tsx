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
import { Save, FileText, Download } from 'lucide-react';
import GN6Header from '@/components/gn6/GN6Header';
import GN6Mesures from '@/components/gn6/GN6Mesures';
import GN6Checklist from '@/components/gn6/GN6Checklist';
import GN6Signatures from '@/components/gn6/GN6Signatures';
import ExportButtons from '@/components/documents/ExportButtons';

interface FormData {
  title: string;
  establishmentId: string;
  content: any;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Le titre est obligatoire'),
  establishmentId: yup.string().required('La référence est obligatoire'),
});

const GN6Create = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, formState: { errors }, setValue, watch, register } = useForm<FormData>({
    resolver: yupResolver(validationSchema) as any,
    defaultValues: {
      title: '',
      establishmentId: '',
      content: {
        organisateur: {},
        informations: {},
        lieu: {},
        effectifs: {},
        mesures: {},
        securite: {
          securitePrivee: {},
          securitePublique: {},
          pompiers: {},
        },
        assurances: {},
        piecesJointes: {},
        signatures: [],
      },
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    const newDocument = securityDocumentService.createSecurityDocument({
      title: data.title,
      documentType: 'GN6',
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
        {/* En-tête avec cadre réglementaire */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-accentBleu/10 via-purple-50 to-accentBleu/10 border-accentBleu/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-accentBleu/10 p-4 rounded-relume-lg">
              <FileText className="text-accentBleu" size={36} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-textPrincipal">Dossier GN6</h1>
              <p className="text-textPrincipal/70 mt-1">Manifestation exceptionnelle accueillant du public</p>
            </div>
          </div>

          <div className="prose prose-sm text-textPrincipal/80 mt-6">
            <p className="mb-2">
              <strong>Cadre réglementaire :</strong> Le dossier GN6 est obligatoire pour toute manifestation 
              exceptionnelle accueillant du public dans un lieu non spécifiquement aménagé à cet effet, conformément 
              au règlement de sécurité contre les risques d'incendie et de panique dans les ERP.
            </p>
            <p>
              <strong>Références :</strong> Arrêté du 25 juin 1980 modifié - Article GN 6 relatif aux manifestations 
              dans les établissements de type PA (plein air) et CTS (chapiteaux, tentes et structures).
            </p>
          </div>
        </Card>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Informations de base */}
          <Card className="p-6 bg-formBackground border-formBorder">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="form-label">Intitulé du dossier</Label>
                <Input
                  {...register('title')}
                  className="form-input"
                  placeholder="Ex: Dossier GN6 - Festival de musique 2025"
                />
                {errors.title && <p className="form-error">{errors.title.message}</p>}
              </div>

              <div>
                <Label className="form-label">Numéro de dossier</Label>
                <Input
                  {...register('establishmentId')}
                  className="form-input"
                  placeholder="Ex: GN6-2025-001"
                />
                {errors.establishmentId && <p className="form-error">{errors.establishmentId.message}</p>}
              </div>
            </div>
          </Card>

          {/* Sections principales */}
          <GN6Header register={register} errors={errors} watch={watch} setValue={setValue} />
          <GN6Mesures register={register} watch={watch} />
          <GN6Checklist register={register} watch={watch} />
          <GN6Signatures setValue={setValue} />

          {/* Informations importantes */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-textPrincipal mb-3 flex items-center gap-2">
              <FileText className="text-accentBleu" size={20} />
              Dépôt du dossier
            </h3>
            <div className="text-sm text-textPrincipal/80 space-y-2">
              <p>
                <strong>Délai de dépôt :</strong> Le dossier doit être déposé au minimum <strong>1 mois avant</strong> la date de la manifestation.
              </p>
              <p>
                <strong>Où déposer :</strong> Mairie de la commune d'accueil de la manifestation et Commission de sécurité compétente.
              </p>
              <p>
                <strong>Contact :</strong> Renseignez-vous auprès de la mairie pour connaître les modalités exactes de dépôt.
              </p>
            </div>
          </Card>

          {/* Boutons d'action */}
          <div className="flex gap-4 justify-between items-center sticky bottom-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-elevated border border-border z-10">
            <ExportButtons
              documentData={{
                metadata: {
                  type: 'dossier-gn6',
                  title: watch('title') || 'Dossier GN6',
                  createdAt: new Date().toISOString(),
                  author: 'SecuGenie User',
                  version: '1.0'
                },
                content: watch()
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

              <Button type="submit" disabled={loading} className="btn-primary">
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

export default GN6Create;
