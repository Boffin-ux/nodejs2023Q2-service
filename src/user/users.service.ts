import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { hashData } from '@src/common/utils/helpers';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async createUser(dto: CreateUserDto) {
    const hash = await hashData(dto.password);
    return await this.prisma.user.create({ data: { ...dto, password: hash } });
  }

  async getUserById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async getUserByLogin(login: string) {
    return await this.prisma.user.findFirst({ where: { login } });
  }

  async updateUserToken(id: string, rt: string | null) {
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken: rt },
    });
  }

  async updateUser(id: string, newPassword: string) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          password: newPassword,
          version: { increment: 1 },
        },
      });
    } catch {
      return null;
    }
  }

  async deleteUser(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
