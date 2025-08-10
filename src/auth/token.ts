import jwt from "jsonwebtoken";

export default function createSecretToken(id: string) {
  const expiresIn = process.env.TOKEN_EXPIRY;
  
  return jwt.sign({ id }, process.env.TOKEN_KEY as any, {
    expiresIn: expiresIn as any,
  });
}