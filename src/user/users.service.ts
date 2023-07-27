import { Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Database } from 'src/db/database.provider';

@Injectable()
export class UsersService {
  constructor(private db: Database) {}

  async getAllUsers() {
    return this.db.users.getAllUsers();
  }

  async createUser(dto: CreateUserDto) {
    return await this.db.users.createUser(dto);
  }

  async getUserById(id: string) {
    return await this.db.users.getUserById(id);
  }

  async deleteUser(id: string) {
    await this.db.users.deleteUser(id);
  }

  async updateUser(id: string, dto: UpdatePasswordDto) {
    return await this.db.users.updateUser(id, dto);
  }
}
