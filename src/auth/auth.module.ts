import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Users } from './auth.service';
import { PrismaService } from './connect.service';
import { AuthService } from './validation.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'may neym is ravras',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, Users, PrismaService],
})
export class AuthModule {}
