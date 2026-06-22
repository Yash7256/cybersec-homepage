# Single Sign-On (SSO) System Documentation

## Overview

This SSO system enables users to authenticate once on `home.cybersec.tech` and automatically gain access to `cybersec1.tech` without requiring a second login. The system uses JWT tokens for cross-domain authentication.

## Architecture

### Components

1. **JWT Token System** (`src/lib/auth/jwt.ts`)
   - HS256 algorithm for token signing
   - 5-minute token expiration
   - Token blacklist for revocation
   - HTTPS validation in production

2. **Supabase Integration** (`src/lib/supabase/`)
   - Client-side auth (`client.ts`)
   - Server-side admin access (`server.ts`)
   - Google OAuth provider

3. **React Hooks** (`src/hooks/`)
   - `useAuth.ts` - Authentication state management
   - `use-sso.ts` - SSO token operations

4. **Routes** (`src/routes/`)
   - `/auth/login` - Login page with Google OAuth
   - `/auth/callback` - OAuth callback handler
   - `/auth/sso` - SSO token verification
   - `/dashboard` - Protected dashboard

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# SSO Configuration
SSO_JWT_SECRET=your_super_secret_jwt_key_min_32_chars
SSO_TARGET_DOMAIN=https://cybersec1.tech

# App Configuration
VITE_APP_URL=https://home.cybersec.tech
```

**Important:**
- `SSO_JWT_SECRET` must be at least 32 characters
- Use a cryptographically secure random string
- Keep this secret safe and never expose it in client code

### 2. Supabase Setup

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

#### Configure Google OAuth

1. In Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
   - Redirect URL: `https://home.cybersec.tech/auth/callback`

#### Run Database Migration

Execute the SQL migration in `supabase/migrations/001_create_profiles.sql`:

```sql
-- This creates the profiles table with:
-- - UUID primary key linked to auth.users
-- - Email, full_name, avatar_url fields
-- - Row Level Security (RLS) policies
-- - Updated timestamp trigger
```

You can run this in:
- Supabase Dashboard → SQL Editor
- Or via CLI: `supabase db push`

### 3. Install Dependencies

Dependencies are already installed:
- `jose` - JWT signing/verification
- `@supabase/supabase-js` - Supabase client

### 4. Configure Both Domains

#### On `home.cybersec.tech` (Identity Provider)

- Set `VITE_APP_URL=https://home.cybersec.tech`
- Set `SSO_TARGET_DOMAIN=https://cybersec1.tech`
- Configure Google OAuth redirect to this domain

#### On `cybersec1.tech` (Service Provider)

- Set `VITE_APP_URL=https://cybersec1.tech`
- Set `SSO_TARGET_DOMAIN=https://home.cybersec.tech`
- Use the same `SSO_JWT_SECRET` as home.cybersec.tech
- Use the same Supabase project (or sync users between projects)

## How It Works

### Authentication Flow

```
1. User clicks "Continue with Google" on home.cybersec.tech
   ↓
2. Google OAuth authentication
   ↓
3. Supabase creates session
   ↓
4. Server generates JWT token (5 min expiry)
   ↓
5. Redirect to cybersec1.tech/auth/sso?token=<jwt>
   ↓
6. cybersec1.tech verifies JWT signature
   ↓
7. Create/update user profile in database
   ↓
8. Establish authenticated session
   ↓
9. Redirect to dashboard
```

### Token Structure

```typescript
{
  sub: "user_id",           // User UUID
  email: "user@example.com",
  name: "John Doe",
  avatar: "https://...",
  iat: 1234567890,         // Issued at
  exp: 1234568190,         // Expires (5 min)
  iss: "https://home.cybersec.tech",
  aud: "https://cybersec1.tech"
}
```

## Security Features

### 1. JWT Security
- **HS256 Algorithm**: Symmetric encryption with shared secret
- **Short Expiration**: 5-minute token lifetime
- **Issuer Validation**: Tokens must come from trusted domain
- **Audience Validation**: Tokens must be for correct domain
- **Token Blacklist**: Revoked tokens cannot be reused

### 2. HTTPS Enforcement
- Production environments require HTTPS
- Prevents token interception
- Secure cookie transmission

### 3. Supabase Security
- Row Level Security (RLS) on profiles table
- Service role key only used server-side
- Anon key for client operations
- Automatic session management

### 4. Rate Limiting (Recommended)
Add rate limiting to SSO endpoints to prevent abuse:
- Limit SSO token creation per user
- Limit verification attempts
- Implement IP-based throttling

## API Endpoints

### Client-Side (via React Hooks)

```typescript
// Create SSO token (called automatically after login)
const { mutateAsync: createToken } = useCreateSSOToken();
await createToken({ 
  access_token: session.access_token,
  refresh_token: session.refresh_token 
});

// Verify SSO token (called on cybersec1.tech)
const { mutateAsync: verifyToken } = useVerifySSOToken();
await verifyToken({ token: ssoToken });

// Logout
const { mutateAsync: logout } = useLogout();
await logout();
```

## File Structure

```
src/
├── lib/
│   ├── auth/
│   │   ├── jwt.ts              # JWT signing/verification
│   │   └── server-functions.ts # Server functions (backup)
│   └── supabase/
│       ├── client.ts           # Client Supabase instance
│       └── server.ts           # Server Supabase instance
├── hooks/
│   ├── use-auth.ts             # Auth state hook
│   └── use-sso.ts              # SSO operations hook
└── routes/
    ├── auth.login.tsx          # Login page
    ├── auth.callback.tsx       # OAuth callback
    ├── auth.sso.tsx            # SSO verification
    └── dashboard.tsx           # Protected dashboard

supabase/
└── migrations/
    └── 001_create_profiles.sql # Database schema
```

## Testing

### 1. Test Google OAuth

1. Navigate to `/auth/login`
2. Click "Continue with Google"
3. Complete Google authentication
4. Verify redirect to `/auth/callback`

### 2. Test SSO Flow

1. After successful login, verify redirect to `cybersec1.tech/auth/sso`
2. Check that token is in URL query parameter
3. Verify user profile created in database
4. Confirm redirect to dashboard

### 3. Test Protected Routes

1. Try accessing `/dashboard` without authentication
2. Verify redirect to `/auth/login`
3. Login and verify dashboard access

### 4. Test Logout

1. Click logout in dashboard
2. Verify session cleared
3. Confirm redirect to login page

## Troubleshooting

### "Missing SSO_JWT_SECRET"
- Ensure `.env` file exists
- Check `SSO_JWT_SECRET` is set (min 32 chars)

### "Invalid session"
- Supabase session expired
- User needs to re-authenticate

### "Token has been revoked"
- Token was blacklisted (logout)
- User needs to re-authenticate

### "SSO must use HTTPS in production"
- Ensure production URLs use HTTPS
- Check `VITE_APP_URL` configuration

### Google OAuth not working
- Verify Google OAuth credentials in Supabase
- Check redirect URL matches exactly
- Ensure Google OAuth is enabled in Supabase

### Profile not created
- Check database migration was run
- Verify Supabase RLS policies
- Check service role key permissions

## Deployment

### Vercel Deployment

1. Set environment variables in Vercel dashboard
2. Deploy both applications
3. Verify HTTPS is enabled
4. Test SSO flow in production

### Environment-Specific Config

```bash
# Development
VITE_APP_URL=http://localhost:8080
SSO_TARGET_DOMAIN=http://localhost:3001

# Production
VITE_APP_URL=https://home.cybersec.tech
SSO_TARGET_DOMAIN=https://cybersec1.tech
```

## Maintenance

### Regular Tasks

1. **Rotate JWT Secret**: Every 90 days
   - Update `SSO_JWT_SECRET` on both domains
   - Deploy simultaneously to avoid downtime

2. **Monitor Token Usage**: Check for unusual patterns
   - High verification failure rates
   - Suspicious IP addresses
   - Token replay attempts

3. **Review OAuth Credentials**: Ensure Google OAuth is secure
   - Rotate client secrets periodically
   - Review authorized redirect URLs

4. **Database Maintenance**: Clean up old profiles if needed
   - Remove inactive users (per policy)
   - Archive old data

## Support

For issues or questions:
1. Check this documentation
2. Review Supabase logs
3. Check browser console for errors
4. Verify environment variables are set correctly

## License

This SSO implementation is part of the cybersec-homepage project.
