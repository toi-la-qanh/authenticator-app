import speakeasy from 'speakeasy';

export function generateOTP(secret: string): string {
  return speakeasy.totp({
    secret,
    encoding: 'base32',
    step: 30, // 30 seconds
  });
}
