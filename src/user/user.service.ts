import { Model } from 'mongoose';
import { BadRequestException, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    // Check user already exists
    const userExists = await this.findUserByUsername(createUserDto.username);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const createdUser = new this.userModel({
      username: createUserDto.username,
      password: hashPassword,
      role: createUserDto.role,
    });
    return createdUser.save();
  }

  async findAllUsers(): Promise<UserDocument[]> {
    // Return toàn bộ users trong collection dưới dạng array
    return this.userModel.find().exec();
  }

  async findUserById(id: string): Promise<UserDocument | undefined> {
    // Filter ra một user thông qua _id
    return this.userModel.findById(id).exec();
  }

  async findUserByUsername(username: string) {
    // Filter ra một user thông qua username
    return this.userModel
      .findOne({ username: new RegExp('^' + username + '$', 'i') })
      .exec();
  }

  async updatePagesForUser(@Param('id') id: string) {
    const userExists = await this.userModel.findById(id);
    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    const pagesDefault: any = 50;

    const getUserId = await this.findUserById(id);

    const totalPages = getUserId.pages + pagesDefault;

    return this.userModel.findByIdAndUpdate(id, { pages: totalPages });
  }
}
