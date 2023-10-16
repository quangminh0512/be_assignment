import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessTokenGuard } from 'src/auth/guards/tokens/accessToken.guard';
import { Role } from './entities/role.enum';
import { Roles } from 'src/auth/strategies/role';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // [GET] Get all users
  @UseGuards(AccessTokenGuard)
  @Roles(Role.Admin)
  @Get('/users')
  async findAllUsers() {
    const data = this.userService.findAllUsers();

    return data.then((users) => {
      return users.map((user) => [
        {
          id: user._id,
          username: user.username,
          name: user.name,
          class: user.class,
          phoneNumber: user.phoneNumber,
          balance: user.balance,
          role: user.role,
          createAt: user.createdAt,
          updateAt: user.updatedAt,
        },
      ]);
    });
  }

  // [GET] Get user by id
  @Get('/user/:id')
  async findUserById(@Param('id') id: string) {
    const data = this.userService.findUserById(id);

    return data.then((user) => {
      return {
        id: user._id,
        username: user.username,
        name: user.name,
        class: user.class,
        phoneNumber: user.phoneNumber,
        balance: user.balance,
        role: user.role,
        createAt: user.createdAt,
        updateAt: user.updatedAt,
      };
    });
  }
}
