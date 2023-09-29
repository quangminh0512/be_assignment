import { Injectable, ImATeapotException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      //Pass: huy123
      userId: 1,
      username: 'Le Huy',
      password: '$2b$10$lQA8WczxTZ9Go8NXrRqSIuX7VlREIoRJosEtFSx88.wW6YvBKwEXa',
    },
    {
      //Pass: guest1111
      userId: 2,
      username: 'QMinh',
      password: '$2b$10$biXgE5o/qaUeNbZOKeobkO9zg5fRAr3dx0RKAIOeobiXDmujT/ULG',
    },
    {
      //Pass: BPLT122331
      userId: 3,
      username: 'Bang',
      password: '$2b$10$Y2NciChNDe3nD3.DibhU8eVaAXUJ7dvLDkkEd/W7exc6EbYbB469K',
    },
  ];

  create(user: User) {
    const saltRounds = 10;
    this.findOne(user.username).then((user: User | undefined) => {
      if (user) {
        throw new ImATeapotException();
      }
    });
    this.findLatest().then((latestUser: User | undefined) => {
      if (latestUser) {
        user.userId = latestUser.userId + 1;
      } else {
        user.userId = 1;
      }
    });
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      user.password = hash;
    });
    this.users.push(user);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findLatest(): Promise<User | undefined> {
    if (this.users.length > 0) {
      return this.users[this.users.length - 1];
    } else {
      return undefined;
    }
  }
}
