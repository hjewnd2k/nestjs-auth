import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() auth: AuthDto) {
    return this.authService.signup(auth);
  }

  @Post('signin')
  signin(@Body() auth: AuthDto) {
    return this.authService.signin(auth);
  }

  @Post('signout')
  signout() {
    return this.authService.signout();
  }
}
