'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSetBreadcrumbs } from '@/hooks/useSetBreadcrumbs';
import { RegistrationStepper } from '@/components/registration/RegistrationStepper';

export function RegisterClient() {
  const router = useRouter();

  const breadcrumbItems = useMemo(
    () => [{ label: 'Register', href: '/register', isActive: true }],
    []
  );

  useSetBreadcrumbs(breadcrumbItems);

  const handleMultiStepComplete = () => {
    router.push('/');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <RegistrationStepper onComplete={handleMultiStepComplete} />
    </div>
  );
}
