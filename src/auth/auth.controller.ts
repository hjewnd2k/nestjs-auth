import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtoSignin, AuthDtoSignup } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() auth: AuthDtoSignup, @Req() req, @Res() res) {
    return this.authService.signup(auth, req, res);
  }

  @Post('signin')
  signin(@Body() auth: AuthDtoSignin, @Req() req, @Res() res) {
    return this.authService.signin(auth, req, res);
  }

  @Get('signout')
  signout(@Req() req, @Res() res) {
    return this.authService.signout(req, res);
  }
}
