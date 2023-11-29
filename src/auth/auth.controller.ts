import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

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

// Login with google accout
@Controller('google')
export class GoogleController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    // console.log(req);
    return this.authService.googleLogin(req);
  }
}
