'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2, User, Check } from 'lucide-react';
import { Step4FormData } from '@/types/registration';

const step4Schema = yup.object({
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .optional(),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .optional(),
}) as yup.ObjectSchema<Step4FormData>;

interface Step4PersonalInfoProps {
  onSubmit: (data: Step4FormData) => Promise<void>;
  onSkip: () => void;
  isLoading: boolean;
  error?: string;
  user?: {
    firstName?: string;
    lastName?: string;
  };
}

export function Step4PersonalInfo({
  onSubmit,
  onSkip,
  isLoading,
  error,
  user,
}: Step4PersonalInfoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step4FormData>({
    resolver: yupResolver(step4Schema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
  });

  const handleFormSubmit = async (data: Step4FormData) => {
    try {
      await onSubmit(data);
    } catch {
      // Error is handled by parent component
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
            <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tell us a bit about yourself (optional)
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            First Name
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            {...register('firstName')}
            className={errors.firstName ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.firstName && (
            <p className="text-sm text-red-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Last Name
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            {...register('lastName')}
            className={errors.lastName ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.lastName && (
            <p className="text-sm text-red-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errors.lastName.message}
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
                Completing registration...
              </>
            ) : (
              'Complete Registration'
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onSkip}
            disabled={isLoading}
            className="w-full"
          >
            Skip for now
          </Button>
        </div>
      </form>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          You can always update your personal information later in your profile
          settings.
        </p>
      </div>
    </div>
  );
}
