import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findAllUsers(): Promise<User[] | undefined> {
    // Return toàn bộ users trong collection dưới dạng array
    return this.userModel.find().exec();
  }

  async findUserById(id: string): Promise<User | undefined> {
    // Filter ra một user thông qua _id
    return this.userModel.findById(id).exec();
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    // Filter ra một user thông qua username
    return this.userModel.findOne({ username }).exec();
  }
}
