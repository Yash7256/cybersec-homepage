import { createFileRoute, redirect } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { signSSOToken } from '@/lib/auth/jwt';

export const Route = createFileRoute('/auth/callback')({
  component: AuthCallback,
});

function AuthCallback() {
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setStatus('Checking URL hash...');
        console.log('Current URL:', window.location.href);
        console.log('Hash:', window.location.hash);
        
        // Get session from URL hash (Supabase OAuth callback - implicit flow)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const error = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');
        
        console.log('Access token present:', !!accessToken);
        console.log('OAuth error:', error);
        console.log('OAuth error description:', errorDescription);
        
        if (error) {
          console.error('OAuth error:', error, errorDescription);
          setStatus(`OAuth Error: ${errorDescription || error}`);
          setTimeout(() => window.location.href = '/auth/login', 3000);
          return;
        }
        
        if (!accessToken) {
          console.error('No access token in callback');
          setStatus('No access token found');
          setTimeout(() => window.location.href = '/auth/login', 3000);
          return;
        }

        setStatus('Getting user from Supabase...');
        // Get user info from Supabase
        const { data: { user }, error: userError } = await supabase.auth.getUser(accessToken);
        
        if (userError || !user) {
          console.error('Failed to get user:', userError);
          setStatus(`Failed to get user: ${userError?.message}`);
          setTimeout(() => window.location.href = '/auth/login', 3000);
          return;
        }

        console.log('User retrieved:', user.email);
        setStatus('Generating SSO token...');
        
        // Generate SSO token directly on client
        const ssoToken = await signSSOToken({
          sub: user.id,
          email: user.email || '',
          name: user.user_metadata?.full_name,
          avatar: user.user_metadata?.avatar_url,
        });

        console.log('SSO token generated successfully');
        setStatus('Redirecting to cybersec1.tech...');
        
        // Redirect to cybersec1.tech with SSO token
        const targetDomain = import.meta.env.VITE_SSO_TARGET_DOMAIN || 'https://cybersec1.tech';
        const redirectUrl = `${targetDomain}/auth/sso?token=${ssoToken}`;
        
        console.log('Redirect URL:', redirectUrl);
        window.location.href = redirectUrl;
      } catch (error) {
        console.error('SSO error:', error);
        setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setTimeout(() => window.location.href = '/auth/login', 3000);
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">{status}</p>
      </div>
    </div>
  );
}
