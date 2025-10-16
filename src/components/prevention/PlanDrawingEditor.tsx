import React from 'react';
import PlanEditorContainer from '@/components/editor/PlanEditorContainer';
import { Card } from '@/components/ui/card';

const PlanDrawingEditor: React.FC = () => {
  return (
    <Card className="p-6 mb-6 bg-gray-50 border-formBorder">
      <h2 className="text-2xl font-bold text-textPrincipal mb-4">Plan de Prévention - Schéma</h2>
      <p className="text-sm text-textPrincipal/70 mb-6">
        Utilisez l'éditeur ci-dessous pour créer le plan de prévention avec les zones de travail, 
        équipements de sécurité et signalétique.
      </p>
      
      <PlanEditorContainer />
    </Card>
  );
};

export default PlanDrawingEditor;
