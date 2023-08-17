import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from './strategies';
import { UsersModule } from 'src/user/users.module';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, JwtModule.register({})],
  providers: [AuthService, AtStrategy, RtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
