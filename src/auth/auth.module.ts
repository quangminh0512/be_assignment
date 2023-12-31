import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController, GoogleController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from 'src/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({}),
    PassportModule,
    UserModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    UserService,
    GoogleStrategy,
  ],
  controllers: [AuthController, GoogleController],
})
export class AuthModule {}
