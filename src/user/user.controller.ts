import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessTokenGuard } from 'src/auth/guards/tokens/accessToken.guard';
import { Role } from './entities/user.entities';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // [GET] Get all users
  @UseGuards(AccessTokenGuard, RoleGuard)
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
        pages: user.pages,
        role: user.role,
        createAt: user.createdAt,
        updateAt: user.updatedAt,
      };
    });
  }

  // [PATCH] Update pages default for user
  @Patch('/user/:id/update-page')
  async updatePagesDefaultForUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const data = this.userService.updatePagesDefaultForUser(id, updateUserDto);

    return data.then((user) => {
      return {
        message: 'Update pages successfully',
        id: user._id,
        name: user.name,
      };
    });
  }

  @Patch('/user/:userId/update-balance')
  async updateBalanceForUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const data = this.userService.updateBalanceForUser(userId, updateUserDto);

    return data.then((user) => {
      return {
        message: 'Update balance successfully',
        id: user._id,
        name: user.name,
        balance: user.balance,
      };
    });
  }

  // [PATCH] Update pages default for user
  @Patch('/user/:userId/buy-pages')
  async updateBalanceAfterBuyingPages(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return this.userService.updateBalanceAfterBuyingPages(
      userId,
      updateUserDto,
    );
  }
}
