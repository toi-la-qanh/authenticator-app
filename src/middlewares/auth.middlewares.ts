import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ errors: "Not created account yet" });
  }

  jwt.verify(token, process.env.TOKEN_KEY as any, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ errors: "Token invalid" });
    }
    req.user = decoded.name; // Store username in request for later use
    next();
  });
};