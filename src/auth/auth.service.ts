import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from '@src/user/users.service';
import { compareData, hashData } from '@src/common/utils/helpers';
import { ResponseMessages } from '@src/common/enums/response-messages.enum';
import { UserEntity } from '@src/user/entities/user.entity';
import { AuthUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async getTokens({ id: userId, login }: UserEntity) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId, login },
        {
          secret: String(process.env.JWT_SECRET_KEY),
          expiresIn: String(process.env.TOKEN_EXPIRE_TIME),
        },
      ),
      this.jwtService.signAsync(
        { userId, login },
        {
          secret: String(process.env.JWT_REFRESH_SECRET_KEY),
          expiresIn: String(process.env.TOKEN_REFRESH_EXPIRE_TIME),
        },
      ),
    ]);

    await this.updateUserRToken(userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateUserRToken(userId: string, rToken: string) {
    const hashToken = await hashData(rToken);
    await this.usersService.updateUserToken(userId, hashToken);
  }

  async refreshTokens(userId: string, rToken: string) {
    const user = await this.usersService.getUserById(userId);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException(ResponseMessages.FORBIDDEN);
    }

    const rtMatches = await compareData(rToken, user.refreshToken);

    if (!rtMatches) {
      throw new ForbiddenException(ResponseMessages.FORBIDDEN);
    }

    return await this.getTokens(user);
  }

  async signIn({ login, password }: AuthUserDto) {
    const user = await this.usersService.getUserByLogin(login);

    if (!user) {
      throw new BadRequestException();
    }
    const passwordMatches = await compareData(password, user.password);

    if (!passwordMatches) {
      throw new ForbiddenException(ResponseMessages.INCORRECT_AUTH_DATA);
    }

    return await this.getTokens(user);
  }

  async signUp(authDto: AuthUserDto) {
    return await this.usersService.createUser(authDto);
  }

  async logout(userId: string) {
    return await this.usersService.updateUserToken(userId, null);
  }
}
