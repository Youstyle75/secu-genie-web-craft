import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from '@/components/layout/Layout';
import securityDocumentService from '@/services/securityDocumentService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Save, FileText } from 'lucide-react';
import NoticeERPHeader from '@/components/notice-erp/NoticeERPHeader';
import NoticeERPPresentation from '@/components/notice-erp/NoticeERPPresentation';
import NoticeERPImplantation from '@/components/notice-erp/NoticeERPImplantation';
import NoticeERPSectionsAccordion from '@/components/notice-erp/NoticeERPSectionsAccordion';
import NoticeERPSignature from '@/components/notice-erp/NoticeERPSignature';
import NoticeERPAnnexe from '@/components/notice-erp/NoticeERPAnnexe';

interface FormData {
  title: string;
  establishmentId: string;
  content: any;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Le titre est obligatoire'),
  establishmentId: yup.string().required('L\'identifiant est obligatoire'),
});

const NoticeSecuriteCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, formState: { errors }, setValue, watch, register, control } = useForm<FormData>({
    resolver: yupResolver(validationSchema) as any,
    defaultValues: {
      title: '',
      establishmentId: '',
      content: {},
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    const newDocument = securityDocumentService.createSecurityDocument({
      title: data.title,
      documentType: 'NoticeSecurite',
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
        <Card className="p-8 mb-8 bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 border-accentBleu/30">
          <h1 className="text-4xl font-bold text-textPrincipal mb-2">Notice de Sécurité ERP</h1>
          <p className="text-textPrincipal/70">Document obligatoire selon l'article R.123-24 du CCH</p>
        </Card>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6 bg-formBackground border-formBorder">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="form-label">Titre de la notice</Label>
                <Input {...register('title')} className="form-input" placeholder="Ex: Notice ERP - Commerce" />
                {errors.title && <p className="form-error">{errors.title.message}</p>}
              </div>
              <div>
                <Label className="form-label">Référence dossier</Label>
                <Input {...register('establishmentId')} className="form-input" placeholder="Ex: AT-2025-001" />
              </div>
            </div>
          </Card>

          <NoticeERPHeader register={register} errors={errors} />
          <NoticeERPPresentation register={register} control={control} watch={watch} />
          <NoticeERPImplantation register={register} />
          <NoticeERPSectionsAccordion register={register} />
          <NoticeERPSignature setValue={setValue} />
          <NoticeERPAnnexe register={register} watch={watch} />

          <div className="flex gap-4 justify-end sticky bottom-4 bg-white p-4 rounded-relume-md shadow-relume-strong border border-formBorder z-10">
            <Button type="button" variant="outline" onClick={() => navigate('/documents')}>Annuler</Button>
            <Button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Enregistrement...' : <><Save size={18} className="mr-2" />Enregistrer</>}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NoticeSecuriteCreate;
