import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(`JWT Token is missing.`, 403);
  }

  try {
    const token = authHeader.split(' ')[1];
    //const [, token] = authHeader.split(' ');

    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as JwtPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError(`Invalid JWT Token.`, 403);
  }
}
