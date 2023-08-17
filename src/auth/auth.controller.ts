import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
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

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ description: 'Successful login' })
  @ApiForbiddenResponse({ description: ResponseMessages.INCORRECT_AUTH_DATA })
  @Post('login')
  signIn(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    authDto: AuthUserDto,
  ) {
    return this.authService.signIn(authDto);
  }

  @ApiOperation({ summary: 'SignUp' })
  @ApiCreatedResponse({ description: 'Successful signup' })
  @ApiConflictResponse({ description: `Login ${ResponseMessages.CONFLICT}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @Post('signup')
  signUp(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    authDto: AuthUserDto,
  ) {
    return this.authService.signUp(authDto);
  }

  @ApiOperation({ summary: 'Update Tokens' })
  @ApiOkResponse({ description: 'Updated Tokens' })
  @ApiForbiddenResponse({ description: ResponseMessages.FORBIDDEN })
  @ApiBearerAuth('Bearer')
  @UseGuards(RefreshTokenGuard)
  @ApiUnauthorizedResponse({ description: ResponseMessages.UNAUTHORIZED })
  @Get('refresh')
  refreshTokens(@CurrentUser() { userId, refreshToken }: JwtRefreshPayload) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @ApiOperation({ summary: 'Destroy Token' })
  @ApiOkResponse({ description: 'Refresh Token is Null' })
  @Auth()
  @Get('logout')
  logout(@CurrentUser() { userId }: JwtPayload) {
    return this.authService.logout(userId);
  }
}
