import React from 'react';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Step {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  className
}) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={cn(
        'w-full',
        isHorizontal ? 'flex items-center justify-between' : 'flex flex-col space-y-4',
        className
      )}
      role="list"
      aria-label="Progress steps"
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;

        return (
          <div
            key={step.id}
            className={cn(
              'flex items-center',
              isHorizontal ? 'flex-1' : 'w-full',
              index < steps.length - 1 && isHorizontal && 'relative'
            )}
            role="listitem"
          >
            <div className={cn('flex', isHorizontal ? 'flex-col items-center' : 'items-start gap-4')}>
              {/* Step Circle */}
              <div
                className={cn(
                  'relative flex items-center justify-center transition-all duration-300',
                  'w-12 h-12 rounded-full border-2 font-semibold',
                  isCompleted && 'bg-success border-success text-white',
                  isCurrent && 'bg-primary border-primary text-white shadow-lg scale-110',
                  isUpcoming && 'bg-background border-border text-muted-foreground'
                )}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isCompleted ? (
                  <Check className="h-6 w-6" aria-hidden="true" />
                ) : isCurrent && step.icon ? (
                  <span className="flex items-center justify-center">{step.icon}</span>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Step Content */}
              <div className={cn('text-center', !isHorizontal && 'text-left flex-1')}>
                <p
                  className={cn(
                    'font-semibold text-sm mb-1 transition-colors',
                    isCompleted && 'text-success',
                    isCurrent && 'text-primary',
                    isUpcoming && 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground max-w-[150px]">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'transition-all duration-300',
                  isHorizontal
                    ? 'flex-1 h-0.5 mx-4 relative top-[-24px]'
                    : 'w-0.5 h-12 ml-6',
                  isCompleted ? 'bg-success' : 'bg-border'
                )}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
