import { SignJWT, jwtVerify, JWTPayload } from 'jose';

export interface SSOPayload extends JWTPayload {
  sub: string; // User ID
  email: string;
  name?: string;
  avatar?: string;
  iss: string; // Issuer (home.cybersec.tech)
  aud: string; // Audience (cybersec1.tech)
}

const JWT_EXPIRATION_SECONDS = 300; // 5 minutes
const TOKEN_BLACKLIST = new Set<string>(); // In-memory blacklist for revoked tokens

/**
 * Get JWT secret from environment (works in both browser and Node.js)
 */
function getJWTSecret(): string {
  // Try browser env first (Vite)
  const browserSecret = import.meta.env.VITE_SSO_JWT_SECRET;
  if (browserSecret) return browserSecret;
  
  // Fallback to Node.js env
  const nodeSecret = process.env.VITE_SSO_JWT_SECRET;
  if (nodeSecret) return nodeSecret;
  
  throw new Error('VITE_SSO_JWT_SECRET not found in environment variables');
}

/**
 * Get app URL from environment
 */
function getAppUrl(): string {
  const browserUrl = import.meta.env.VITE_APP_URL;
  if (browserUrl) return browserUrl;
  
  const nodeUrl = process.env.VITE_APP_URL;
  if (nodeUrl) return nodeUrl;
  
  return 'https://home.cybersec.tech';
}

/**
 * Get target domain from environment
 */
function getTargetDomain(): string {
  const browserDomain = import.meta.env.VITE_SSO_TARGET_DOMAIN;
  if (browserDomain) return browserDomain;
  
  const nodeDomain = process.env.VITE_SSO_TARGET_DOMAIN;
  if (nodeDomain) return nodeDomain;
  
  return 'https://cybersec1.tech';
}

/**
 * Add a token to the blacklist (for logout/revocation)
 */
export function revokeToken(token: string): void {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const exp = decoded.exp * 1000;
    const ttl = exp - Date.now();
    
    if (ttl > 0) {
      TOKEN_BLACKLIST.add(token);
      setTimeout(() => TOKEN_BLACKLIST.delete(token), ttl);
    }
  } catch (error) {
    console.error('Error revoking token:', error);
  }
}

/**
 * Check if a token is revoked
 */
export function isTokenRevoked(token: string): boolean {
  return TOKEN_BLACKLIST.has(token);
}

/**
 * Sign an SSO token with HS256 algorithm
 */
export async function signSSOToken(payload: Omit<SSOPayload, 'iat' | 'exp' | 'iss' | 'aud'>): Promise<string> {
  const secret = new TextEncoder().encode(getJWTSecret());
  
  if (!secret || secret.length < 32) {
    throw new Error('SSO_JWT_SECRET must be at least 32 characters');
  }

  const now = Math.floor(Date.now() / 1000);
  const issuer = getAppUrl();
  const audience = getTargetDomain();

  // Validate HTTPS in production
  const isProduction = import.meta.env.MODE === 'production' || process.env.NODE_ENV === 'production';
  if (isProduction && !issuer.startsWith('https://')) {
    throw new Error('SSO must use HTTPS in production');
  }

  return new SignJWT({ 
    sub: payload.sub,
    email: payload.email,
    name: payload.name,
    avatar: payload.avatar,
  } as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(now)
    .setExpirationTime(now + JWT_EXPIRATION_SECONDS)
    .setIssuer(issuer)
    .setAudience(audience)
    .sign(secret);
}

/**
 * Verify an SSO token
 */
export async function verifySSOToken(token: string): Promise<SSOPayload> {
  const secret = new TextEncoder().encode(getJWTSecret());
  
  if (!secret || secret.length < 32) {
    throw new Error('SSO_JWT_SECRET must be at least 32 characters');
  }

  // Check if token is revoked
  if (isTokenRevoked(token)) {
    throw new Error('Token has been revoked');
  }

  const { payload } = await jwtVerify(token, secret, {
    issuer: getAppUrl(),
    audience: getTargetDomain(),
  });

  // Validate required fields
  if (!payload.sub || !payload.email) {
    throw new Error('Invalid token: missing required fields');
  }

  return payload as unknown as SSOPayload;
}
