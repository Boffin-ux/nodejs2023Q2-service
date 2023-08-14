import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import {
  Delete,
  Param,
  Put,
  Post,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common/decorators';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger/dist';
import { UsersService } from './users.service';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { ValidateId } from 'src/common/validations/validate-id.pipe';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { NotFoundInterceptor } from 'src/common/interceptors/notFound.interceptor';

@ApiTags('Users')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get('')
  async getAll() {
    const users = await this.usersService.getAllUsers();
    return users.map((user) => new UserEntity(user));
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({ description: 'New user is created' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @Post('')
  async create(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    userDto: CreateUserDto,
  ) {
    const user = await this.usersService.createUser(userDto);
    return new UserEntity(user);
  }

  @ApiOperation({ summary: 'Get User By Id' })
  @ApiOkResponse({ description: 'Found user' })
  @ApiNotFoundResponse({ description: `User ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @UseInterceptors(new NotFoundInterceptor('User'))
  @Get(':userId')
  async getUser(@Param('userId', ValidateId) id: string) {
    const user = await this.usersService.getUserById(id);
    return new UserEntity(user);
  }

  @ApiOperation({ summary: 'Update User by ID' })
  @ApiOkResponse({ description: 'User updated' })
  @ApiNotFoundResponse({ description: `User ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiForbiddenResponse({ description: ResponseMessages.WRONG_PASSWORD })
  @UseInterceptors(new NotFoundInterceptor('User'))
  @Put(':userId')
  async update(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    { oldPassword, newPassword }: UpdatePasswordDto,
    @Param('userId', ValidateId) id: string,
  ) {
    const user = await this.usersService.getUserById(id);

    if (user && user.password !== oldPassword) {
      throw new ForbiddenException(ResponseMessages.WRONG_PASSWORD);
    }

    const updateUser = await this.usersService.updateUser(id, newPassword);
    return new UserEntity(updateUser);
  }

  @ApiOperation({ summary: 'Delete User by ID' })
  @ApiNoContentResponse({ description: 'User deleted' })
  @ApiNotFoundResponse({ description: `User ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId')
  async remove(@Param('userId', ValidateId) id: string) {
    const user = await this.usersService.deleteUser(id);

    if (!user) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }

    return user;
  }
}
