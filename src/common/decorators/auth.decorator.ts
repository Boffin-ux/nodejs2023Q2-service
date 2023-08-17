import { UseGuards } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AccessTokenGuard } from '@src/common/guards/accessToken.guard';
import { ResponseMessages } from '@src/common/enums/response-messages.enum';

export function Auth() {
  return applyDecorators(
    UseGuards(AccessTokenGuard),
    ApiBearerAuth('Bearer'),
    ApiUnauthorizedResponse({ description: ResponseMessages.UNAUTHORIZED }),
  );
}
