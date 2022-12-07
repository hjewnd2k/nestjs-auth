import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthDtoSignup, AuthDtoSignin } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/contants';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(auth: AuthDtoSignup, req: Request, res: Response) {
    const { frist_name, email, last_name, password } = auth;

    const foundUser = await this.prisma.userAccount.findUnique({
      where: { email },
    });

    if (foundUser) {
      throw new BadRequestException('Email already exists');
    }

    const hash_password = await this.hasPassword(password);

    const user = await this.prisma.userAccount.create({
      data: {
        email,
        frist_name,
        last_name,
        hash_password,
      },
    });

    const token = await this.signToken({
      id: user.id,
      email: user.email,
    });
    if (!token) {
      throw new ForbiddenException();
    }

    res.cookie('token', token);
    return res.send({ message: 'Logged in succefully' });
  }

  async signin(auth: AuthDtoSignin, req: Request, res: Response) {
    const { email, password } = auth;

    const foundUser = await this.prisma.userAccount.findUnique({
      where: { email },
    });

    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }

    const isMatch = await this.comparePasswords({
      password,
      hash: foundUser.hash_password,
    });

    if (!isMatch) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    });

    if (!token) {
      throw new ForbiddenException();
    }

    delete foundUser.hash_password;

    res.cookie('token', token);
    return res.send({ user: foundUser });
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Logged out succefully' });
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

    return this.jwt.signAsync(payload, { secret: jwtSecret });
  }
}
