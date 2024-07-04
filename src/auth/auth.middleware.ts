import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const token = req.cookies['auth'];

    if(!token) throw new UnauthorizedException("The user is not authorized")
    next();
  }
}
