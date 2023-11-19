import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: AuthDto): Promise<any> {
    const user = await this.userModel.findOne({ username: data.username });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const passwordValid = await bcrypt.compare(data.password, user.password);
    if (!passwordValid) {
      throw new BadRequestException('Password is incorrect');
    }
    const tokens = await this.getTokens(user.id, user.username, user.role);
    // await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }

  hashData(data: string) {
    const saltOrRounds = 10;
    return bcrypt.hash(data, saltOrRounds);
  }

  // async updateRefreshToken(userId: string, refreshToken: string) {
  //   const hashedRefreshToken = await this.hashData(refreshToken);
  //   await this.usersService.update(userId, {
  //     refreshToken: hashedRefreshToken,
  //   });
  // }

  async getTokens(userId: string, username: string, role: string) {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          role,
        },
        {
          secret: 'ACCESS_SECRET_KEY',
          expiresIn: '2h',
        },
      ),
    ]);

    return {
      status: 'success',
      username: username,
      accessToken,
      role: role,
      // refreshToken,
    };
  }
}
