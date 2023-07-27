import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IUser } from './interface/user.interface';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { UpdatePasswordDto } from 'src/user/dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

export class UserDatabase {
  private users: IUser[];

  constructor() {
    this.users = [];
  }

  async getAllUsers() {
    return this.users;
  }

  async createUser(dto: CreateUserDto) {
    const timestamp = Date.now();

    const newUser = {
      ...dto,
      id: uuidv4(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.users = [...this.users, newUser];

    return newUser;
  }

  async getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async deleteUser(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }

    this.users.splice(userIndex, 1);
  }

  async updateUser(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    let user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException(ResponseMessages.WRONG_PASSWORD);
    }

    user.password = newPassword;

    user = {
      ...user,
      version: ++user.version,
      updatedAt: Date.now(),
    };

    return user;
  }
}
