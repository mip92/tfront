'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IMaskInput } from 'react-imask';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2, Mail, Phone } from 'lucide-react';
import { Step1FormData } from '@/types/registration';
import { cn } from '@/lib/utils';

const step1Schema = yup.object({
  email: yup
    .string()
    .test(
      'email-valid',
      'Please enter a valid email address',
      function (value) {
        if (!value || value.length === 0) return true; // Allow empty if phone is provided

        // More strict email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          return false;
        }

        // Check for common TLDs or at least 2 characters
        const parts = value.split('@');
        if (parts.length !== 2) return false;

        const domain = parts[1];
        const domainParts = domain.split('.');
        if (domainParts.length < 2) return false;

        const tld = domainParts[domainParts.length - 1];
        if (tld.length < 2) return false;

        return true;
      }
    )
    .test(
      'at-least-one',
      'Please provide either email or phone number (or both)',
      function (value) {
        const parent = this.parent;
        const hasEmail = value && value.trim().length > 0;
        const hasPhone = parent.phone && parent.phone.trim().length > 0;

        if (!(hasEmail || hasPhone)) {
          return this.createError({
            message: 'Please provide either email or phone number (or both)',
          });
        }

        return true;
      }
    )
    .optional(),
  phone: yup
    .string()
    .test(
      'phone-valid',
      'Please enter a complete Ukrainian phone number +380 99 999 99 99',
      function (value) {
        if (!value || value.length === 0) return true; // Allow empty if email is provided
        // Remove all non-digit characters for validation
        const cleanPhone = value.replace(/\D/g, '');
        // Must be exactly 12 digits and start with 380
        return cleanPhone.length === 12 && cleanPhone.startsWith('380');
      }
    )
    .test(
      'at-least-one',
      'Please provide either email or phone number (or both)',
      function (value) {
        const parent = this.parent;
        const hasEmail = parent.email && parent.email.trim().length > 0;
        const hasPhone = value && value.trim().length > 0;

        if (!(hasEmail || hasPhone)) {
          return this.createError({
            message: 'Please provide either email or phone number (or both)',
          });
        }

        return true;
      }
    )
    .optional(),
}) as yup.ObjectSchema<Step1FormData>;

interface Step1StartRegistrationProps {
  onSuccess: (data: { email?: string; phone?: string }) => void;
  isLoading: boolean;
  error?: string;
  initialData?: { email?: string; phone?: string };
}

export function Step1StartRegistration({
  onSuccess,
  isLoading,
  error,
  initialData,
}: Step1StartRegistrationProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: yupResolver(step1Schema),
    defaultValues: initialData || {},
  });

  const handleFormSubmit = (data: Step1FormData) => {
    onSuccess({
      email: data.email,
      phone: data.phone,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            {...register('email')}
            aria-invalid={!!errors.email}
            className={cn(
              errors.email
                ? 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                : ''
            )}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-red-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone Number
          </Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <IMaskInput
                id="phone"
                mask="+380 00 000 00 00"
                placeholder="+380 99 999 99 99"
                value={field.value || ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-invalid={!!errors.phone}
                className={cn(
                  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                  'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                  errors.phone
                    ? 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                    : ''
                )}
                disabled={isLoading}
              />
            )}
          />
          {errors.phone && (
            <p className="text-sm text-red-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Root form errors (like at-least-one validation) */}
        {errors.root && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-md text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {errors.root.message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-md text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending verification code...
            </>
          ) : (
            'Send Verification Code'
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          We&apos;ll send you a verification code to confirm your identity. You
          can provide both email and phone for better security.
        </p>
      </div>
    </div>
  );
}
