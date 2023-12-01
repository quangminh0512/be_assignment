import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const userExists = await this.usersService.findUserByUsername(
      createUserDto.username,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const newUser = await this.usersService.create({
      ...createUserDto,
    });
    const tokens = await this.getTokens(
      newUser._id,
      newUser.username,
      newUser.role,
    );
    return tokens;
  }

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

    const getUserId = await this.userModel.findOne({ username: username });

    return {
      status: 'success',
      id: getUserId._id,
      username: username,
      accessToken,
      role: role,
      // refreshToken,
    };
  }

  // Login with google
  async googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }

    // Check if user already exists
    const checkEmailExists = this.userModel.collection.countDocuments({
      email: req.user.email,
    });

    checkEmailExists
      .then((res: any) => {
        console.log(res);
        if (res === null || res === 0) {
          return this.userModel.create({
            email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            image: req.user.picture,
            access_Token: req.user.accessToken,
          });
        }
      })
      .catch((err) => console.log(err));
  }
}
