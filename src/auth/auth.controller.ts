import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/sigin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // [POST] /auth/login
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SigninDto): Promise<any> {
    return this.authService.signIn(signInDto);
  }
}
