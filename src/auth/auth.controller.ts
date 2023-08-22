import { AuthService } from './auth.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResponseMessages } from '@src/common/enums/response-messages.enum';
import { AuthUserDto } from './dto/auth.dto';
import { JwtPayload, JwtRefreshPayload } from './interface/tokens.interface';
import { CurrentUser } from '@src/user/decorators/user.decorator';
import { RefreshTokenGuard } from '@src/common/guards/refreshToken.guard';
import { Auth } from '@src/common/decorators/auth.decorator';
import { UserEntity } from '@src/user/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ description: 'Successful login' })
  @ApiForbiddenResponse({ description: ResponseMessages.INCORRECT_AUTH_DATA })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @Post('login')
  async signIn(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    authDto: AuthUserDto,
  ) {
    const user = await this.authService.signIn(authDto);

    if (!user) {
      throw new ForbiddenException(ResponseMessages.INCORRECT_AUTH_DATA);
    }

    return await this.authService.getTokens(user);
  }

  @ApiOperation({ summary: 'SignUp' })
  @ApiCreatedResponse({ description: 'Successful signup' })
  @ApiConflictResponse({ description: `Login ${ResponseMessages.CONFLICT}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @Post('signup')
  async signUp(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    authDto: AuthUserDto,
  ) {
    const user = await this.authService.signUp(authDto);
    return new UserEntity(user);
  }

  @ApiOperation({ summary: 'Update Tokens' })
  @ApiOkResponse({ description: 'Updated Tokens' })
  @ApiForbiddenResponse({ description: ResponseMessages.FORBIDDEN })
  @ApiBearerAuth('Bearer')
  @UseGuards(RefreshTokenGuard)
  @ApiUnauthorizedResponse({ description: ResponseMessages.UNAUTHORIZED })
  @Get('refresh')
  async refreshTokens(
    @CurrentUser() { userId, refreshToken }: JwtRefreshPayload,
  ) {
    const user = await this.authService.refreshTokens(userId, refreshToken);

    if (!user) {
      throw new ForbiddenException(ResponseMessages.INCORRECT_AUTH_DATA);
    }

    return await this.authService.getTokens(user);
  }

  @ApiOperation({ summary: 'Destroy Token' })
  @ApiOkResponse({ description: 'Refresh Token is Null' })
  @Auth()
  @Get('logout')
  async logout(@CurrentUser() { userId }: JwtPayload) {
    return await this.authService.logout(userId);
  }
}
