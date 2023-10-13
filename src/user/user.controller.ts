import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // [GET] /user
  @Get('/users')
  async findAllUsers(): Promise<User[] | undefined> {
    return this.userService.findAllUsers();
  }

  // [GET] /user/:id
  @Get('/user/:id')
  async findUserById(@Param('id') id: string): Promise<User | undefined> {
    return this.userService.findUserById(id);
  }
}
