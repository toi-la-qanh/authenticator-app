declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        [key: string]: any;
      };
    }
  }
}

export {}; 