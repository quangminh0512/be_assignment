import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // [POST] /auth/login
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: AuthDto): Promise<any> {
    return this.authService.signIn(signInDto);
  }
}
