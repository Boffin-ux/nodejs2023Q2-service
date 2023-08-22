import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from '@src/user/users.service';
import { compareData, hashData } from '@src/common/utils/helpers';
import { UserEntity } from '@src/user/entities/user.entity';
import { AuthUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async updateUserRToken(userId: string, rToken: string) {
    const hashToken = await hashData(rToken);
    await this.usersService.updateUserToken(userId, hashToken);
  }

  async getTokens({ id: userId, login }: UserEntity) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId, login },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        },
      ),
      this.jwtService.signAsync(
        { userId, login },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    ]);

    await this.updateUserRToken(userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, rToken: string) {
    const user = await this.usersService.getUserById(userId);

    if (!user || !user.refreshToken) {
      return null;
    }

    const rtMatches = await compareData(rToken, user.refreshToken);

    if (!rtMatches) {
      return null;
    }

    return user;
  }

  async signIn({ login, password }: AuthUserDto) {
    const user = await this.usersService.getUserByLogin(login);

    if (!user) {
      return null;
    }
    const passwordMatches = await compareData(password, user.password);

    if (!passwordMatches) {
      return null;
    }

    return user;
  }

  async signUp(authDto: AuthUserDto) {
    return await this.usersService.createUser(authDto);
  }

  async logout(userId: string) {
    return await this.usersService.updateUserToken(userId, null);
  }
}
