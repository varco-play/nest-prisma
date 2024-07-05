import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

export function AuthMiddleware(jwtService: JwtService) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['auth'];
    if (!token) {
      throw new UnauthorizedException('The user is not authorized');
    }
    try {
      const isValid = jwtService.verify(token);
      if (!isValid) {
        throw new UnauthorizedException('Invalid authentication cookie');
      }
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid authentication cookie');
    }
  };
}
