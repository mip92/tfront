'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2, ArrowLeft, RotateCcw } from 'lucide-react';
import { Step2FormData } from '@/types/registration';

const step2Schema = yup.object({
  code: yup
    .string()
    .matches(/^\d{6}$/, 'Code must be exactly 6 digits')
    .required('Verification code is required'),
});

interface Step2VerifyCodeProps {
  onSubmit: (data: Step2FormData) => Promise<void>;
  onResendCode: () => Promise<void>;
  onGoBack: () => Promise<void>;
  isLoading: boolean;
  error?: string;
  method?: 'email' | 'sms';
  email?: string;
  phone?: string;
}

export function Step2VerifyCode({
  onSubmit,
  onResendCode,
  onGoBack,
  isLoading,
  error,
  method,
}: Step2VerifyCodeProps) {
  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<Step2FormData>({
    resolver: yupResolver(step2Schema),
  });

  // Auto-format code input
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setValue('code', value);
  };

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleFormSubmit = async (data: Step2FormData) => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }

    if (!data.code || data.code.length !== 6) {
      return;
    }

    try {
      await onSubmit(data);
    } catch {}
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    try {
      setValue('code', '');

      await onResendCode();
      setCountdown(method === 'email' ? 20 : 300);
    } catch {
    } finally {
      setIsResending(false);
    }
  };

  const handleGoBack = async () => {
    try {
      await onGoBack();
    } catch {}
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">Verification Code</Label>
          <Input
            id="code"
            type="text"
            inputMode="numeric"
            placeholder="000000"
            maxLength={6}
            {...register('code')}
            onChange={handleCodeChange}
            className={`text-center text-2xl tracking-widest font-mono ${errors.code ? 'border-red-500' : ''}`}
            disabled={isLoading}
            autoComplete="one-time-code"
          />
          {errors.code && (
            <p className="text-sm text-red-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errors.code.message}
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-md text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <div className="space-y-3">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying code...
              </>
            ) : (
              'Verify Code'
            )}
          </Button>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoBack}
              disabled={isLoading}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleResendCode}
              disabled={isLoading || isResending || countdown > 0}
              className="flex-1"
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : countdown > 0 ? (
                <>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Resend in {countdown}s
                </>
              ) : (
                <>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Resend Code
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          Didn&apos;t receive the code? Check your spam folder or try resending.
        </p>
        <p className="mt-1">Code expires in 20 minutes</p>
      </div>
    </div>
  );
}
