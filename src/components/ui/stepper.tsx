'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepperContextValue {
  currentStep: number;
  orientation: 'horizontal' | 'vertical';
  totalSteps: number;
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  canGoToStep: (step: number) => boolean;
}

const StepperContext = React.createContext<StepperContextValue | undefined>(
  undefined
);

const useStepper = () => {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error('useStepper must be used within a Stepper');
  }
  return context;
};

interface StepperProps {
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  children: React.ReactNode;
  className?: string;
  onStepChange?: (step: number) => void;
  canGoToStep?: (step: number) => boolean;
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      currentStep,
      orientation = 'horizontal',
      children,
      className,
      onStepChange,
      canGoToStep = () => true,
      ...props
    },
    ref
  ) => {
    const [internalStep, setInternalStep] = React.useState(currentStep);
    const totalSteps = React.Children.count(children);

    const step = onStepChange ? currentStep : internalStep;

    const nextStep = React.useCallback(() => {
      const newStep = Math.min(step + 1, totalSteps);
      if (onStepChange) {
        onStepChange(newStep);
      } else {
        setInternalStep(newStep);
      }
    }, [step, totalSteps, onStepChange]);

    const prevStep = React.useCallback(() => {
      const newStep = Math.max(step - 1, 1);
      if (onStepChange) {
        onStepChange(newStep);
      } else {
        setInternalStep(newStep);
      }
    }, [step, onStepChange]);

    const goToStep = React.useCallback(
      (targetStep: number) => {
        if (
          canGoToStep(targetStep) &&
          targetStep >= 1 &&
          targetStep <= totalSteps
        ) {
          if (onStepChange) {
            onStepChange(targetStep);
          } else {
            setInternalStep(targetStep);
          }
        }
      },
      [canGoToStep, totalSteps, onStepChange]
    );

    const isNextDisabled = step >= totalSteps;
    const isPrevDisabled = step <= 1;

    const contextValue = React.useMemo(
      () => ({
        currentStep: step,
        orientation,
        totalSteps,
        isNextDisabled,
        isPrevDisabled,
        nextStep,
        prevStep,
        goToStep,
        canGoToStep,
      }),
      [
        step,
        orientation,
        totalSteps,
        isNextDisabled,
        isPrevDisabled,
        nextStep,
        prevStep,
        goToStep,
        canGoToStep,
      ]
    );

    return (
      <StepperContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'flex',
            orientation === 'vertical' ? 'flex-col' : 'flex-row',
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

interface StepperItemProps {
  step: number;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  ({ step, children, className, onClick, ...props }, ref) => {
    const { currentStep, orientation, goToStep, canGoToStep } = useStepper();
    const isCompleted = currentStep > step;
    const isCurrent = currentStep === step;
    const isInactive = currentStep < step;

    const state = isCompleted ? 'completed' : isCurrent ? 'active' : 'inactive';
    const canNavigate = canGoToStep(step);

    const handleClick = () => {
      if (canNavigate && onClick) {
        onClick();
      } else if (canNavigate) {
        goToStep(step);
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
        data-state={state}
        {...props}
      >
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            // Only pass stepper-specific props to stepper components
            const isStepperComponent =
              child.type === StepperTrigger ||
              child.type === StepperIndicator ||
              child.type === StepperTitle ||
              child.type === StepperDescription ||
              child.type === StepperSeparator;

            if (isStepperComponent) {
              return React.cloneElement(child, {
                state,
                isCompleted,
                isCurrent,
                isInactive,
                canNavigate,
              });
            }
          }
          return child;
        })}
      </div>
    );
  }
);
StepperItem.displayName = 'StepperItem';

interface StepperTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  asChild?: boolean;
  isCompleted?: boolean;
  isCurrent?: boolean;
  isInactive?: boolean;
  canNavigate?: boolean;
  state?: string;
}

const StepperTrigger = React.forwardRef<HTMLButtonElement, StepperTriggerProps>(
  ({ children, className, onClick, asChild = false, ...props }, ref) => {
    // Extract non-DOM props to avoid passing them to DOM elements
    const { ...domProps } = props;

    if (asChild) {
      const child = children as React.ReactElement;
      return React.cloneElement(child, {
        ...domProps,
        ref,
        className: cn(
          'flex items-center gap-3 text-left transition-colors hover:text-foreground',
          className,
          child.props?.className
        ),
        onClick: (e: React.MouseEvent) => {
          onClick?.();
          child.props?.onClick?.(e);
        },
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'flex items-center gap-3 text-left transition-colors hover:text-foreground',
          className
        )}
        onClick={onClick}
        {...domProps}
      >
        {children}
      </button>
    );
  }
);
StepperTrigger.displayName = 'StepperTrigger';

interface StepperIndicatorProps {
  children?: React.ReactNode;
  className?: string;
  state?: 'completed' | 'active' | 'inactive';
  isCompleted?: boolean;
  isCurrent?: boolean;
  isInactive?: boolean;
  canNavigate?: boolean;
}

const StepperIndicator = React.forwardRef<
  HTMLDivElement,
  StepperIndicatorProps
>(
  (
    {
      children,
      className,
      state,
      isCompleted,
      isCurrent,
      canNavigate = true,
      ...props
    },
    ref
  ) => {
    // Use props if provided, otherwise calculate from context
    const completed = isCompleted ?? state === 'completed';
    const current = isCurrent ?? state === 'active';

    return (
      <div
        ref={ref}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-all duration-200 aspect-square',
          completed
            ? 'border-primary bg-primary text-primary-foreground shadow-lg'
            : current
              ? 'border-primary bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20'
              : 'border-muted bg-background text-muted-foreground hover:border-muted-foreground',
          !canNavigate && 'opacity-50',
          className
        )}
        {...props}
      >
        {completed ? <Check className="h-4 w-4" /> : children}
      </div>
    );
  }
);
StepperIndicator.displayName = 'StepperIndicator';

interface StepperTitleProps {
  children: React.ReactNode;
  className?: string;
}

const StepperTitle = React.forwardRef<HTMLDivElement, StepperTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('font-medium text-foreground', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
StepperTitle.displayName = 'StepperTitle';

interface StepperDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const StepperDescription = React.forwardRef<
  HTMLDivElement,
  StepperDescriptionProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </div>
  );
});
StepperDescription.displayName = 'StepperDescription';

interface StepperSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  isCompleted?: boolean;
  isCurrent?: boolean;
  isInactive?: boolean;
  canNavigate?: boolean;
  state?: 'active' | 'completed' | 'inactive';
}

const StepperSeparator = React.forwardRef<
  HTMLDivElement,
  StepperSeparatorProps
>(({ className, isCompleted = false, ...props }, ref) => {
  const { orientation } = useStepper();

  // Extract non-DOM props to avoid passing them to DOM
  const { isCompleted, ...domProps } = props;

  return (
    <div
      ref={ref}
      className={cn(
        'bg-border',
        orientation === 'vertical' ? 'h-8 w-px' : 'h-px flex-1',
        isCompleted ? 'bg-primary' : 'bg-border',
        className
      )}
      {...domProps}
    />
  );
});
StepperSeparator.displayName = 'StepperSeparator';

export {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
};
