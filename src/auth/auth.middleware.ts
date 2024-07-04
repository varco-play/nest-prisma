import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwt: JwtService) {}
  use(req: any, res: any, next: () => void) {
    const token = req.cookies['auth'];

    if(!token) throw new UnauthorizedException("The user is not authorized");

     const isValid = this.jwt.verify(token);
    if (!isValid) {
      throw new UnauthorizedException('Invalid authentication cookie');
    }
    next();
  }
}
