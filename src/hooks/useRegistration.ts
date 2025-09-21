import { useState } from 'react';
import {
  useMutation,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth } from '@/contexts/AuthContext';
import {
  StartRegistrationDocument,
  VerifyCodeDocument,
  ResendCodeDocument,
  SetPasswordDocument,
  SetPersonalInfoDocument,
} from '@/generated/graphql';
import {
  StartRegistrationInput,
  StartRegistrationResponse,
  VerifyCodeInput,
  VerifyCodeResponse,
  SetPasswordInput,
  SetPasswordResponse,
  SetPersonalInfoInput,
  SetPersonalInfoResponse,
  ResendCodeInput,
  ResendCodeResponse,
  GoBackStepResponse,
  RegistrationState,
  RegistrationStep,
} from '@/types/registration';

const createRegistrationClient = (tempToken?: string) => {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: tempToken ? `Bearer ${tempToken}` : '',
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export const useRegistration = (onComplete?: () => void) => {
  const { login } = useAuth();
  const [state, setState] = useState<RegistrationState>({
    currentStep: 1,
    isLoading: false,
  });

  const [startRegistrationMutation] = useMutation(StartRegistrationDocument);
  const [verifyCodeMutation] = useMutation(VerifyCodeDocument);
  const [resendCodeMutation] = useMutation(ResendCodeDocument);
  useMutation(SetPasswordDocument);
  const [setPersonalInfoMutation] = useMutation(SetPersonalInfoDocument);

  const startRegistration = async (
    input: StartRegistrationInput
  ): Promise<StartRegistrationResponse> => {
    setState(prev => {
      return { ...prev, isLoading: true, error: undefined };
    });

    try {
      const { data, errors } = await startRegistrationMutation({
        variables: { input },
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      if (!data?.startRegistration) {
        throw new Error('No data returned from server');
      }

      const response: StartRegistrationResponse = data.startRegistration;

      const nextStep = response.step === 1 ? 2 : response.step;

      setState(prev => {
        const newState = {
          ...prev,
          currentStep: nextStep as RegistrationStep,
          userId: response.userId,
          method: response.method,
          step1Data: input,
          isLoading: false,
        };
        return newState;
      });

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to start registration';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      throw error;
    }
  };

  const verifyCode = async (
    input: VerifyCodeInput
  ): Promise<VerifyCodeResponse> => {
    setState(prev => ({ ...prev, isLoading: true, error: undefined }));

    try {
      const { data, errors } = await verifyCodeMutation({
        variables: { input },
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      if (!data?.verifyCode) {
        throw new Error('No data returned from server');
      }

      const response: VerifyCodeResponse = data.verifyCode;

      setState(prev => {
        const newState = {
          ...prev,
          currentStep: response.step as RegistrationStep,
          tempToken: response.temp_token,
          step2Data: input,
          isLoading: false,
        };
        return newState;
      });

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to verify code';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      throw error;
    }
  };

  const setPassword = async (
    input: SetPasswordInput
  ): Promise<SetPasswordResponse> => {
    setState(prev => {
      return { ...prev, isLoading: true, error: undefined };
    });

    try {
      const registrationClient = createRegistrationClient(state.tempToken);

      const { data, errors } = await registrationClient.mutate({
        mutation: SetPasswordDocument,
        variables: { input },
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      if (!data?.setPassword) {
        throw new Error('No data returned from server');
      }

      const response: SetPasswordResponse = data.setPassword;

      login(response.access_token, response.refresh_token);

      setState(prev => {
        const newState = {
          ...prev,
          currentStep: 4 as RegistrationStep,
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
          user: response.user,
          step3Data: input,
          isLoading: false,
        };
        return newState;
      });

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to set password';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      throw error;
    }
  };

  const setPersonalInfo = async (
    input: SetPersonalInfoInput
  ): Promise<SetPersonalInfoResponse> => {
    setState(prev => {
      return { ...prev, isLoading: true, error: undefined };
    });

    try {
      const { data, errors } = await setPersonalInfoMutation({
        variables: { input },
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      if (!data?.setPersonalInfo) {
        throw new Error('No data returned from server');
      }

      const response: SetPersonalInfoResponse = data.setPersonalInfo;

      setState(prev => {
        const newState = {
          ...prev,
          step4Data: input,
          isLoading: false,
        };
        return newState;
      });

      if (onComplete) {
        onComplete();
      }

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to set personal info';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      throw error;
    }
  };

  const resendCode = async (
    input: ResendCodeInput
  ): Promise<ResendCodeResponse> => {
    setState(prev => ({ ...prev, isLoading: true, error: undefined }));

    try {
      const { data, errors } = await resendCodeMutation({
        variables: { input },
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      if (!data?.resendCode) {
        throw new Error('No data returned from server');
      }

      const response: ResendCodeResponse = data.resendCode;

      setState(prev => ({
        ...prev,
        isLoading: false,
      }));

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to resend code';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      throw error;
    }
  };

  const goBackStep = async (): Promise<GoBackStepResponse> => {
    setState(prev => ({ ...prev, isLoading: true, error: undefined }));

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock response
      const response: GoBackStepResponse = {
        message: 'Moved back successfully',
        step: Math.max(1, state.currentStep - 1) as RegistrationStep,
      };

      setState(prev => ({
        ...prev,
        currentStep: response.step as RegistrationStep,
        isLoading: false,
      }));

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to go back step';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      throw error;
    }
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: undefined }));
  };

  const resetRegistration = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }

    setState({
      currentStep: 1,
      isLoading: false,
    });
  };

  const skipPersonalInfo = async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: undefined }));

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      setState(prev => ({
        ...prev,
        isLoading: false,
      }));

      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to skip personal info';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      throw error;
    }
  };

  const setError = (error: string) => {
    setState(prev => ({ ...prev, error }));
  };

  return {
    state,
    startRegistration,
    verifyCode,
    setPassword,
    setPersonalInfo,
    resendCode,
    goBackStep,
    clearError,
    resetRegistration,
    skipPersonalInfo,
    setError,
  };
};
