import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { PrismaService } from './connect.service';



@Injectable()
export class Users {
  constructor(private prisma: PrismaService) {}

  createUser({ email, password, name }: AuthPayloadDto) {
    return this.prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
  }

  findAllUsers() {
    return this.prisma.user.findMany();
  }
}


