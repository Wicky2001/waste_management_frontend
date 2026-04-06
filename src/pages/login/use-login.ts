import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { api } from '../../common-shared/service/apiClient';

export type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  message: string;
};

const LOGIN_ENDPOINT = '/auth/login';

export const useLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const submitLogin = async (payload: LoginPayload) => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsSubmitting(true);

    try {
      const response = await api.post(
        LOGIN_ENDPOINT,
        payload,
        {
          signal: controller.signal,
        },
      );

      const data = response?.data as LoginResponse | undefined;
      const message = data?.message || 'Login successful';

      toast.success(message, {
        position: 'bottom-right',
      });

      return data;
    } catch (error: unknown) {
      if (axios.isCancel(error)) {
        return null;
      }

      let message = 'Login failed. Please try again.';

      if (axios.isAxiosError(error)) {
        message =
          (error.response?.data as { message?: string } | undefined)?.message ||
          message;
      }

      toast.error(message, {
        position: 'bottom-right',
      });

    } finally {
      if (abortControllerRef.current === controller) {
        setIsSubmitting(false);
      }
    }
  };

  return {
    isSubmitting,
    submitLogin,
  };
};
