import speakeasy from 'speakeasy';

export function verifyOTP(secret: string, token: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1, // allow 1 step before/after
    step: 30,
  });
}