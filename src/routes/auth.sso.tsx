import { createFileRoute, redirect } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useVerifySSOToken } from '@/hooks/use-sso';
import { supabase } from '@/lib/supabase/client';

export const Route = createFileRoute('/auth/sso')({
  component: SSOHandler,
});

function SSOHandler() {
  const verifySSOToken = useVerifySSOToken();
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');

  useEffect(() => {
    const handleSSO = async () => {
      if (!token) {
        window.location.href = '/auth/login';
        return;
      }

      try {
        const result = await verifySSOToken.mutateAsync({ token });

        if (result.success && result.user) {
          // Create or update user profile in Supabase
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: result.user.sub,
              email: result.user.email,
              full_name: result.user.name || '',
              avatar_url: result.user.avatar || '',
            });

          if (profileError) {
            console.error('Profile creation error:', profileError);
          }

          // Redirect to dashboard
          window.location.href = '/dashboard';
        } else {
          console.error('SSO verification failed:', result.error);
          window.location.href = '/auth/login';
        }
      } catch (error) {
        console.error('SSO error:', error);
        window.location.href = '/auth/login';
      }
    };

    handleSSO();
  }, [token, verifySSOToken]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Verifying SSO token...</p>
      </div>
    </div>
  );
}
