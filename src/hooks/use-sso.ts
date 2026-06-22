import { useMutation } from '@tanstack/react-query';

interface CreateSSOTokenInput {
  access_token: string;
  refresh_token?: string;
}

interface CreateSSOTokenOutput {
  success: boolean;
  redirectUrl?: string;
  token?: string;
  error?: string;
}

export function useCreateSSOToken() {
  return useMutation({
    mutationFn: async (data: CreateSSOTokenInput): Promise<CreateSSOTokenOutput> => {
      const response = await fetch('/api/auth/sso/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create SSO token');
      }

      return response.json();
    },
  });
}

interface VerifySSOTokenInput {
  token: string;
}

interface VerifySSOTokenOutput {
  success: boolean;
  user?: {
    sub: string;
    email: string;
    name?: string;
    avatar?: string;
  };
  error?: string;
}

export function useVerifySSOToken() {
  return useMutation({
    mutationFn: async (data: VerifySSOTokenInput): Promise<VerifySSOTokenOutput> => {
      const response = await fetch('/api/auth/sso/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to verify SSO token');
      }

      return response.json();
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      return response.json();
    },
  });
}
