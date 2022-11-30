import { PrismaService } from './../prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/contants';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(auth: AuthDto) {
    const { email, password } = auth;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    if (foundUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hasPassword(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    const token = await this.signToken({
      id: user.id,
      email: user.email,
    });
    return { token };
  }

  async signin(auth: AuthDto) {
    const { email, password } = auth;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }

    const isMatch = await this.comparePasswords({
      password,
      hash: foundUser.hashedPassword,
    });

    if (!isMatch) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    });
    return { token };
  }

  async signout() {
    return { message: 'signout' };
  }

  async hasPassword(password: string) {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { id: string; email: string }) {
    const payload = args;

    console.log(jwtSecret);

    return this.jwt.signAsync(payload, { secret: jwtSecret });
  }
}
