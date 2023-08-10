import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async createUser(dto: CreateUserDto) {
    return await this.prisma.user.create({ data: dto });
  }

  async getUserById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async deleteUser(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (err) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }
  }

  async updateUser(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException(ResponseMessages.WRONG_PASSWORD);
    }

    return await this.prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: { increment: 1 },
      },
    });
  }
}
