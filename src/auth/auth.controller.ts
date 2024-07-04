import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Res,
} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { Users } from './auth.service';
import { Response } from 'express';
import { AuthService } from './validation.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private db: Users,
  ) {}

  @Post('login')
  login(@Body() authPayload: AuthPayloadDto, @Res() res: Response) {
    const user = this.authService.validateUser(authPayload);
    if (!user) throw new HttpException('Invalid credentials', 401);

    res.cookie('auth', user, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.send('Logged in successful');
  }

  @Get('users')
  getUsers() {
    return this.db.findAllUsers();
  }

  @Post('register')
  register(@Body() user: AuthPayloadDto) {
    return this.db.createUser(user);
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('auth');
    return res.send("User was logged out");
  }
}
