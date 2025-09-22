'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// Context for stepper state
interface StepperContextValue {
  currentStep: number;
  steps: StepperStep[];
  registerStep: (step: StepperStep) => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  orientation: 'horizontal' | 'vertical';
}

const StepperContext = React.createContext<StepperContextValue | null>(null);

const useStepper = () => {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error('useStepper must be used within a Stepper');
  }
  return context;
};

// Types
interface StepperStep {
  step: number;
  title: string;
  description?: string;
  completed?: boolean;
  disabled?: boolean;
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  currentStep?: number;
}

interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  step: number;
  onClick?: () => void;
  disabled?: boolean;
}

interface StepperIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  step?: number;
  completed?: boolean;
  current?: boolean;
}

interface StepperTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  step?: number;
}

interface StepperDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  step?: number;
}

interface StepperSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  step?: number;
  completed?: boolean;
}

interface StepperTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
}

// Main Stepper Component
const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      children,
      className,
      orientation = 'horizontal',
      currentStep: externalCurrentStep,
      ...props
    },
    ref
  ) => {
    const [internalCurrentStep, setInternalCurrentStep] = React.useState(1);
    const [steps, setSteps] = React.useState<StepperStep[]>([]);

    // Use external currentStep if provided, otherwise use internal state
    const currentStep = externalCurrentStep ?? internalCurrentStep;

    const registerStep = React.useCallback((step: StepperStep) => {
      setSteps(prev => {
        const existing = prev.find(s => s.step === step.step);
        if (existing) {
          return prev.map(s => (s.step === step.step ? step : s));
        }
        return [...prev, step].sort((a, b) => a.step - b.step);
      });
    }, []);

    const goToStep = React.useCallback(
      (step: number) => {
        if (externalCurrentStep === undefined) {
          setInternalCurrentStep(step);
        }
      },
      [externalCurrentStep]
    );

    const nextStep = React.useCallback(() => {
      if (externalCurrentStep === undefined) {
        setInternalCurrentStep(prev => Math.min(prev + 1, steps.length));
      }
    }, [externalCurrentStep, steps.length]);

    const prevStep = React.useCallback(() => {
      if (externalCurrentStep === undefined) {
        setInternalCurrentStep(prev => Math.max(prev - 1, 1));
      }
    }, [externalCurrentStep]);

    const value = React.useMemo(
      () => ({
        currentStep,
        steps,
        registerStep,
        goToStep,
        nextStep,
        prevStep,
        orientation,
      }),
      [
        currentStep,
        steps,
        registerStep,
        goToStep,
        nextStep,
        prevStep,
        orientation,
      ]
    );

    return (
      <StepperContext.Provider value={value}>
        <div
          ref={ref}
          className={cn(
            'flex',
            orientation === 'horizontal' ? 'flex-row' : 'flex-col',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </StepperContext.Provider>
    );
  }
);
Stepper.displayName = 'Stepper';

// Stepper Item Component
const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  ({ children, step, onClick, disabled = false, className, ...props }, ref) => {
    const { currentStep, goToStep, orientation } = useStepper();

    const isCompleted = currentStep > step;
    const isCurrent = currentStep === step;
    const canNavigate = !disabled && (isCompleted || isCurrent);

    const handleClick = () => {
      if (canNavigate) {
        if (onClick) {
          onClick();
        } else {
          goToStep(step);
        }
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          orientation === 'vertical' ? 'flex-col' : 'flex-row',
          canNavigate ? 'cursor-pointer' : 'cursor-not-allowed',
          className
        )}
        onClick={handleClick}
        data-state={
          isCompleted ? 'completed' : isCurrent ? 'active' : 'inactive'
        }
        {...props}
      >
        {children}
      </div>
    );
  }
);
StepperItem.displayName = 'StepperItem';

// Stepper Indicator Component
const StepperIndicator = React.forwardRef<
  HTMLDivElement,
  StepperIndicatorProps
>(({ step, completed, current, className, ...props }, ref) => {
  const { currentStep } = useStepper();

  // Use props if provided, otherwise calculate from context
  const isCompleted =
    completed !== undefined ? completed : step ? currentStep > step : false;
  const isCurrent =
    current !== undefined ? current : step ? currentStep === step : false;

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-center w-8 h-8 min-w-8 min-h-8 border-2 transition-colors rounded-full',
        isCompleted
          ? 'bg-foreground border-foreground text-background'
          : isCurrent
            ? 'bg-background border-foreground text-foreground'
            : 'bg-muted border-muted-foreground text-muted-foreground',
        className
      )}
      {...props}
    >
      {isCompleted ? (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <span className="text-sm font-medium">{step}</span>
      )}
    </div>
  );
});
StepperIndicator.displayName = 'StepperIndicator';

// Stepper Title Component
const StepperTitle = React.forwardRef<HTMLHeadingElement, StepperTitleProps>(
  ({ children, step, className, ...props }, ref) => {
    const { currentStep } = useStepper();

    const isCompleted = step ? currentStep > step : false;
    const isCurrent = step ? currentStep === step : false;

    return (
      <h3
        ref={ref}
        className={cn(
          'text-sm font-medium transition-colors',
          isCompleted
            ? 'text-foreground font-semibold'
            : isCurrent
              ? 'text-foreground font-semibold'
              : 'text-muted-foreground',
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  }
);
StepperTitle.displayName = 'StepperTitle';

// Stepper Description Component
const StepperDescription = React.forwardRef<
  HTMLParagraphElement,
  StepperDescriptionProps
>(({ children, step, className, ...props }, ref) => {
  const { currentStep } = useStepper();

  const isCompleted = step ? currentStep > step : false;
  const isCurrent = step ? currentStep === step : false;

  return (
    <p
      ref={ref}
      className={cn(
        'text-xs transition-colors',
        isCompleted
          ? 'text-muted-foreground'
          : isCurrent
            ? 'text-muted-foreground'
            : 'text-muted-foreground/60',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});
StepperDescription.displayName = 'StepperDescription';

// Stepper Separator Component
const StepperSeparator = React.forwardRef<
  HTMLDivElement,
  StepperSeparatorProps
>(({ step, completed = false, className, ...props }, ref) => {
  const { currentStep, orientation } = useStepper();

  const isCompleted = completed ?? (step ? currentStep > step : false);

  return (
    <div
      ref={ref}
      className={cn(
        'bg-border',
        orientation === 'horizontal' ? 'h-px flex-1 mx-4' : 'w-px h-4 my-2',
        isCompleted ? 'bg-foreground' : 'bg-border',
        className
      )}
      {...props}
    />
  );
});
StepperSeparator.displayName = 'StepperSeparator';

// Stepper Trigger Component
const StepperTrigger = React.forwardRef<HTMLButtonElement, StepperTriggerProps>(
  ({ children, className, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'flex items-center gap-3 text-left transition-colors hover:text-foreground',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
StepperTrigger.displayName = 'StepperTrigger';

export {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
  StepperTrigger,
  useStepper,
};
