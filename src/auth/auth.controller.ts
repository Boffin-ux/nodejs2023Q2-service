import { AuthService } from './auth.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessages } from '@src/common/enums/response-messages.enum';
import { AuthUserDto } from './dto/auth.dto';

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
  signUp(@Body() authDto: AuthUserDto) {
    return this.authService.signUp(authDto);
  }
}
