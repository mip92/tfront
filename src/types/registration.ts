// Types for multi-step registration process

export interface StartRegistrationInput {
  email?: string;
  phone?: string;
}

export interface StartRegistrationResponse {
  message: string;
  step: number;
  method: 'email' | 'sms';
  userId: string;
}

export interface VerifyCodeInput {
  code: string;
  userId: string;
}

export interface VerifyCodeResponse {
  message: string;
  step: number;
  verified: boolean;
  temp_token: string;
}

export interface SetPasswordInput {
  password: string;
  confirmPassword: string;
}

export interface SetPasswordResponse {
  message: string;
  step: number;
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    role: {
      id: string;
      name: string;
    };
  };
}

export interface SetPersonalInfoInput {
  firstName?: string;
  lastName?: string;
}

export interface SetPersonalInfoResponse {
  message: string;
  step: number;
  completed: boolean;
}

export interface ResendCodeInput {
  userId: string;
}

export interface ResendCodeResponse {
  message: string;
  method: 'email' | 'sms';
}

export interface GoBackStepInput {
  userId: string;
}

export interface GoBackStepResponse {
  message: string;
  step: number;
}

// Registration step types
export type RegistrationStep = 1 | 2 | 3 | 4;

export interface RegistrationState {
  currentStep: RegistrationStep;
  userId?: string;
  tempToken?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: {
    id: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    role: {
      id: string;
      name: string;
    };
  };
  method?: 'email' | 'sms';
  error?: string;
  isLoading: boolean;
  // Store form data from each step
  step1Data?: Step1FormData;
  step2Data?: Step2FormData;
  step3Data?: Step3FormData;
  step4Data?: Step4FormData;
}

// Form data for each step
export interface Step1FormData {
  email?: string;
  phone?: string;
}

export interface Step2FormData {
  code: string;
}

export interface Step3FormData {
  password: string;
  confirmPassword: string;
}

export interface Step4FormData {
  firstName?: string;
  lastName?: string;
}
