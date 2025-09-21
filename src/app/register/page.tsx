import React from 'react';
import { RegisterClient } from './RegisterClient';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="pt-[100px] pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <RegisterClient />
        </div>
      </div>
    </div>
  );
}
