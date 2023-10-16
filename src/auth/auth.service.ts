import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';
import { SigninDto } from './dto/sigin.dto';
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

  // async signIn(signInDto: SigninDto): Promise<any> {
  //   // Tìm record match với username
  //   const user = await this.userModel.findOne({ username: signInDto.username });

  //   // Nếu match
  //   if (user) {
  //     // Đối chiếu password với hashed password trong record
  //     const hash = user.password;
  //     const isMatch = await bcrypt.compare(signInDto.password, hash);

  //     // Nếu match
  //     if (isMatch) {
  //       // Trả về thông tin user trừ password
  //       return this.userModel
  //         .findOne({ username: signInDto.username })
  //         .select('-password')
  //         .exec();
  //     }
  //   }
  //   // Nếu không tồn tại username hay password không match throw exception
  //   throw new UnauthorizedException();
  // }

  async signIn(data: SigninDto): Promise<any> {
    const user = await this.userModel.findOne({ username: data.username });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const passwordValid = await bcrypt.compare(data.password, user.password);
    if (!passwordValid) {
      throw new BadRequestException('Password is incorrect');
    }
    const tokens = await this.getTokens(user.id, user.username);
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

  async getTokens(userId: string, username: string) {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: 'ACCESS_SECRET_KEY',
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: 'REFRESH_SECRET_KEY',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      status: 'success',
      username: username,
      accessToken,
      // refreshToken,
    };
  }
}
