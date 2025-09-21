'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { Step3FormData } from '@/types/registration';

const step3Schema = yup.object({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

interface Step3SetPasswordProps {
  onSubmit: (data: Step3FormData) => Promise<void>;
  onGoBack: () => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export function Step3SetPassword({
  onSubmit,
  onGoBack,
  isLoading,
  error,
}: Step3SetPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Step3FormData>({
    resolver: yupResolver(step3Schema),
  });

  const watchedPassword = watch('password');

  const handleFormSubmit = async (data: Step3FormData) => {
    try {
      await onSubmit(data);
    } catch {
      // Error is handled by parent component
    }
  };

  const handleGoBack = async () => {
    try {
      await onGoBack();
    } catch {
      // Error is handled by parent component
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-blue-500',
      'bg-green-500',
    ];

    return {
      strength,
      label: labels[Math.min(strength, 4)],
      color: colors[Math.min(strength, 4)],
    };
  };

  const passwordStrength = getPasswordStrength(watchedPassword || '');

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
            <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Create Your Password</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose a strong password to secure your account
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
              className={`pr-12 ${errors.password ? 'border-red-500' : ''}`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Password strength indicator */}
          {watchedPassword && (
            <div className="space-y-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(level => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded ${
                      level <= passwordStrength.strength
                        ? passwordStrength.color
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                ))}
              </div>
              <p
                className={`text-xs ${
                  passwordStrength.strength < 3
                    ? 'text-red-600'
                    : passwordStrength.strength < 4
                      ? 'text-yellow-600'
                      : 'text-green-600'
                }`}
              >
                Password strength: {passwordStrength.label}
              </p>
            </div>
          )}

          {errors.password && (
            <p className="text-sm text-red-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              {...register('confirmPassword')}
              className={`pr-12 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errors.confirmPassword.message}
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
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoBack}
            disabled={isLoading}
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to verification
          </Button>
        </div>
      </form>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        <p>Your password must contain:</p>
        <ul className="mt-2 space-y-1 text-xs">
          <li>• At least 8 characters</li>
          <li>• One uppercase letter</li>
          <li>• One lowercase letter</li>
          <li>• One number</li>
        </ul>
      </div>
    </div>
  );
}
