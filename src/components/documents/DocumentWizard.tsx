import React, { useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface WizardStep {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  isValid?: boolean;
}

interface DocumentWizardProps {
  steps: WizardStep[];
  onComplete: () => void;
  onCancel?: () => void;
}

export const DocumentWizard: React.FC<DocumentWizardProps> = ({
  steps,
  onComplete,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleStepClick = (index: number) => {
    if (index < currentStep || steps[currentStep].isValid !== false) {
      setCurrentStep(index);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-textPrincipal">
            Étape {currentStep + 1} sur {steps.length}
          </h2>
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round(progress)}% complété
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Navigation */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isAccessible = index <= currentStep || steps[currentStep].isValid !== false;

            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                disabled={!isAccessible}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all min-w-fit",
                  "border-2",
                  isCurrent && "bg-primary/10 border-primary",
                  isCompleted && "bg-secondary/10 border-secondary",
                  !isCurrent && !isCompleted && "bg-surface border-border hover:border-primary/50",
                  !isAccessible && "opacity-50 cursor-not-allowed"
                )}
                aria-current={isCurrent ? 'step' : undefined}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all",
                  isCurrent && "bg-primary text-white",
                  isCompleted && "bg-secondary text-white",
                  !isCurrent && !isCompleted && "bg-gray-200 text-gray-600"
                )}>
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="text-left">
                  <div className={cn(
                    "font-medium text-sm",
                    isCurrent && "text-primary",
                    isCompleted && "text-secondary",
                    !isCurrent && !isCompleted && "text-muted-foreground"
                  )}>
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground hidden md:block">
                    {step.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-8 mb-6 min-h-[400px] bg-white shadow-sm">
        {steps[currentStep].component}
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4">
        <div>
          {onCancel && (
            <Button
              variant="ghost"
              onClick={onCancel}
              type="button"
            >
              Annuler
            </Button>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={isFirstStep}
            className="gap-2"
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={steps[currentStep].isValid === false}
            className="gap-2"
            type="button"
          >
            {isLastStep ? (
              <>
                <Check className="h-4 w-4" />
                Terminer
              </>
            ) : (
              <>
                Suivant
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
