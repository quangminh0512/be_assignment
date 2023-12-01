import { Model } from 'mongoose';
import { BadRequestException, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

const pricePerPage = 100;

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

  async updatePagesDefaultForUser(
    @Param('id') id: string,
    updateUserDto: UpdateUserDto,
  ) {
    const userExists = await this.userModel.findById(id);
    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    const getUserId = await this.findUserById(id);

    const totalPages = getUserId.pages + Number(updateUserDto.pages);

    return this.userModel
      .findByIdAndUpdate(id, { pages: totalPages }, { new: true })
      .exec();
  }

  async updateBalanceForUser(
    @Param('userId') userId: string,
    updateUserDto: UpdateUserDto,
  ) {
    const userExists = await this.userModel.findById(userId);
    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    const getUserId = await this.findUserById(userId);

    if (getUserId.balance === undefined || Number.isNaN(getUserId.balance)) {
      getUserId.balance = 0;
    }

    const newBalance = getUserId.balance + updateUserDto.balance;

    return this.userModel
      .findByIdAndUpdate(userId, { balance: newBalance }, { new: true })
      .exec();
  }

  async updateBalanceAfterBuyingPages(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const userExists = await this.userModel.findById(userId);
    if (!userExists) {
      return {
        error: 'User not found',
      };
    }

    const buyingPages = updateUserDto.pages;
    const buyingPrice = buyingPages * pricePerPage;
    if (userExists.balance < buyingPrice) {
      return {
        error: 'Insufficient balance',
      };
    }
    const newBalance = userExists.balance - buyingPrice;
    const newPages = userExists.pages + Number(buyingPages);
    const data = await this.userModel.findByIdAndUpdate(
      userId,
      {
        balance: newBalance,
        pages: newPages,
      },
      { new: true },
    );

    return {
      message: 'Buying Pages Successfully',
      id: data._id,
      name: data.name,
      balance: data.balance,
      pages: data.pages,
    };
  }
}
