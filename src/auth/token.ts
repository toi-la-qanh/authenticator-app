import jwt from "jsonwebtoken";

export default function createSecretToken(name: string) {
  const expiresIn = process.env.TOKEN_EXPIRY;
  
  return jwt.sign({ name }, process.env.TOKEN_KEY as any, {
    expiresIn: expiresIn as any,
  });
}