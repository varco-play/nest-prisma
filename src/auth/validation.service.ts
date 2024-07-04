import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "./connect.service";
import { AuthPayloadDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

 async validateUser({ name, password }: AuthPayloadDto) {
    const users = await this.prisma.user.findMany();
    const findUser = users.find(user => user.name === name);
    if (!findUser) return null;
    if (password === findUser.password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }
}