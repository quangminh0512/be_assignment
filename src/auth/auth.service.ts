import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';
import { SigninDto } from './dto/sigin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async signIn(signInDto: SigninDto): Promise<any> {
    // Tìm record match với username
    const user = await this.userModel.findOne({ username: signInDto.username });

    // Nếu match
    if (user) {
      // Đối chiếu password với hashed password trong record
      const hash = user.password;
      const isMatch = await bcrypt.compare(signInDto.password, hash);

      // Nếu match
      if (isMatch) {
        // Trả về thông tin user trừ password
        return this.userModel
          .findOne({ username: signInDto.username })
          .select('-password')
          .exec();
      }
    }
    // Nếu không tồn tại username hay password không match throw exception
    throw new UnauthorizedException();
  }
}
