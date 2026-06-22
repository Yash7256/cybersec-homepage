import { createServerFn } from '@tanstack/react-start';
import { signSSOToken, verifySSOToken as verifyJWT } from './jwt';
import { supabaseAdmin } from '../supabase/server';

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

export const createSSOToken = createServerFn({ method: 'POST' })
  .handler(async (ctx: any) => {
    try {
      const input = ctx.data as CreateSSOTokenInput;
      const { access_token } = input;

      if (!access_token) {
        return { success: false, error: 'Missing access token' };
      }

      // Verify the session with Supabase
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(access_token);

      if (error || !user) {
        return { success: false, error: 'Invalid session' };
      }

      // Generate SSO token
      const ssoToken = await signSSOToken({
        sub: user.id,
        email: user.email || '',
        name: user.user_metadata?.full_name,
        avatar: user.user_metadata?.avatar_url,
      });

      // Return the SSO token and redirect URL
      const targetDomain = process.env.SSO_TARGET_DOMAIN || 'https://cybersec1.tech';
      const redirectUrl = `${targetDomain}/auth/sso?token=${ssoToken}`;

      return {
        success: true,
        redirectUrl,
        token: ssoToken,
      };
    } catch (error) {
      console.error('SSO token creation error:', error);
      return { success: false, error: 'Failed to create SSO token' };
    }
  });

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

export const verifySSOToken = createServerFn({ method: 'POST' })
  .handler(async (ctx: any) => {
    try {
      const input = ctx.data as VerifySSOTokenInput;
      const { token } = input;

      if (!token) {
        return { success: false, error: 'Missing token' };
      }

      const payload = await verifyJWT(token);

      return {
        success: true,
        user: {
          sub: payload.sub,
          email: payload.email,
          name: payload.name,
          avatar: payload.avatar,
        },
      };
    } catch (error) {
      console.error('SSO token verification error:', error);
      return { success: false, error: 'Invalid or expired token' };
    }
  });

export const logoutUser = createServerFn({ method: 'POST' })
  .handler(async (): Promise<{ success: boolean; error?: string }> => {
    try {
      // This would typically clear server-side sessions
      // For now, we'll return success
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Failed to logout' };
    }
  });
