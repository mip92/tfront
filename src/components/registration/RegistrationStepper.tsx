'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
} from '@/components/ui/stepper';
import { useRegistration } from '@/hooks/useRegistration';
import { Step1StartRegistration } from './Step1StartRegistration';
import { Step2VerifyCode } from './Step2VerifyCode';
import { Step3SetPassword } from './Step3SetPassword';
import { Step4PersonalInfo } from './Step4PersonalInfo';
import { RegistrationStep, Step4FormData } from '@/types/registration';
import { Loader2 } from 'lucide-react';

interface RegistrationStepperProps {
  onComplete?: () => void;
}

export function RegistrationStepper({ onComplete }: RegistrationStepperProps) {
  const router = useRouter();

  const {
    state,
    startRegistration,
    verifyCode,
    setPassword,
    setPersonalInfo,
    resendCode,
    goBackStep,
    clearError,
  } = useRegistration(onComplete);

  const stepTitles = useMemo(
    () => ({
      1: 'Create Account',
      2: 'Verify Your Email',
      3: 'Create Password',
      4: 'Personal Info',
    }),
    []
  );

  const stepDescriptions = useMemo(
    () => ({
      1: 'Enter your email or phone number to get started',
      2: 'We sent a 6-digit code to your email',
      3: 'Create a secure password',
      4: 'Tell us about yourself',
    }),
    []
  );

  const handleStep2Submit = async (data: { code: string }) => {
    clearError();
    try {
      await verifyCode({
        code: data.code,
        userId: state.userId!,
      });
    } catch {}
  };

  const handleStep3Submit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    clearError();
    try {
      await setPassword(data);
    } catch {}
  };

  const handleStep4Submit = async (data: Step4FormData) => {
    clearError();
    try {
      await setPersonalInfo(data);
      // Registration completed successfully
      if (state.accessToken && state.refreshToken && state.user) {
        onComplete?.();
        router.push('/');
      }
    } catch {}
  };

  const handleResendCode = async () => {
    clearError();
    try {
      await resendCode({ userId: state.userId! });
    } catch {}
  };

  const handleGoBack = async () => {
    clearError();
    try {
      await goBackStep();
    } catch {}
  };

  const handleSkipPersonalInfo = () => {
    onComplete?.();
    router.push('/');
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return (
          <Step1StartRegistration
            onSuccess={async data => {
              try {
                await startRegistration({
                  email: data.email,
                  phone: data.phone,
                });
              } catch {}
            }}
            isLoading={state.isLoading}
            error={state.error}
            initialData={state.step1Data}
          />
        );
      case 2:
        return (
          <Step2VerifyCode
            onSubmit={handleStep2Submit}
            onResendCode={handleResendCode}
            onGoBack={handleGoBack}
            isLoading={state.isLoading}
            error={state.error}
            method={state.method}
            email={state.user?.email}
            phone={state.user?.phone}
          />
        );
      case 3:
        return (
          <Step3SetPassword
            onSubmit={handleStep3Submit}
            onGoBack={handleGoBack}
            isLoading={state.isLoading}
            error={state.error}
          />
        );
      case 4:
        return (
          <Step4PersonalInfo
            onSubmit={handleStep4Submit}
            onSkip={handleSkipPersonalInfo}
            isLoading={state.isLoading}
            error={state.error}
            user={state.user}
          />
        );
      default:
        return null;
    }
  };

  const progressSteps = useMemo(() => {
    return [
      { step: 1, title: stepTitles[1], description: stepDescriptions[1] },
      { step: 2, title: stepTitles[2], description: stepDescriptions[2] },
      { step: 3, title: stepTitles[3], description: stepDescriptions[3] },
      { step: 4, title: stepTitles[4], description: stepDescriptions[4] },
    ];
  }, [stepDescriptions, stepTitles]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader className="space-y-6">
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">
              {stepTitles[state.currentStep as RegistrationStep]}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {stepDescriptions[state.currentStep as RegistrationStep]}
            </p>
          </div>

          {/* Mobile Progress stepper - Vertical */}
          <div className="sm:hidden">
            <Stepper currentStep={state.currentStep} orientation="vertical">
              {progressSteps.map((progressStep, index) => (
                <React.Fragment key={progressStep.step}>
                  <StepperItem
                    step={progressStep.step}
                    className="flex flex-col items-center text-center"
                  >
                    <StepperTrigger>
                      <StepperIndicator
                        state={
                          state.currentStep === progressStep.step
                            ? 'active'
                            : state.currentStep > progressStep.step
                              ? 'completed'
                              : 'inactive'
                        }
                      >
                        {state.currentStep === progressStep.step &&
                        state.isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          progressStep.step
                        )}
                      </StepperIndicator>
                    </StepperTrigger>
                    <div className="mt-2">
                      <StepperTitle
                        className={cn(
                          'text-sm font-medium transition-colors',
                          state.currentStep === progressStep.step
                            ? 'text-primary font-semibold'
                            : 'text-muted-foreground'
                        )}
                      >
                        {progressStep.title}
                      </StepperTitle>
                    </div>
                    {index < progressSteps.length - 1 && (
                      <StepperSeparator
                        isCompleted={state.currentStep > progressStep.step}
                        className="mt-4"
                      />
                    )}
                  </StepperItem>
                </React.Fragment>
              ))}
            </Stepper>
          </div>

          {/* Tablet and Desktop Progress stepper - Horizontal */}
          <div className="hidden sm:block">
            <Stepper currentStep={state.currentStep} orientation="horizontal">
              {progressSteps.map((progressStep, index) => (
                <React.Fragment key={progressStep.step}>
                  <StepperItem step={progressStep.step}>
                    <StepperTrigger>
                      <StepperIndicator
                        state={
                          state.currentStep === progressStep.step
                            ? 'active'
                            : state.currentStep > progressStep.step
                              ? 'completed'
                              : 'inactive'
                        }
                      >
                        {state.currentStep === progressStep.step &&
                        state.isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          progressStep.step
                        )}
                      </StepperIndicator>
                      <div className="flex flex-col items-start">
                        <StepperTitle
                          className={cn(
                            'transition-colors',
                            state.currentStep === progressStep.step
                              ? 'text-primary font-semibold'
                              : 'text-foreground'
                          )}
                        >
                          {progressStep.title}
                        </StepperTitle>
                        <StepperDescription
                          className={cn(
                            'transition-colors',
                            state.currentStep === progressStep.step
                              ? 'text-primary/80'
                              : 'text-muted-foreground'
                          )}
                        >
                          {progressStep.description}
                        </StepperDescription>
                      </div>
                    </StepperTrigger>
                  </StepperItem>
                  {index < progressSteps.length - 1 && (
                    <StepperSeparator
                      isCompleted={state.currentStep > progressStep.step}
                    />
                  )}
                </React.Fragment>
              ))}
            </Stepper>
          </div>
        </CardHeader>

        <CardContent>{renderStep()}</CardContent>
      </Card>

      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs">
          <h4 className="font-semibold mb-2">Debug Info:</h4>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(
              {
                currentStep: state.currentStep,
                userId: state.userId,
                hasTempToken: !!state.tempToken,
                hasAccessToken: !!state.accessToken,
                hasRefreshToken: !!state.refreshToken,
                method: state.method,
                isLoading: state.isLoading,
                error: state.error,
              },
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}
