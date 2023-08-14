import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ResponseMessages } from '../enums/response-messages.enum';
import { validate } from 'uuid';

@Injectable()
export class ValidateId implements PipeTransform<string> {
  transform(value: string) {
    if (validate(value)) {
      return value;
    }
    throw new BadRequestException(ResponseMessages.INCORRECT_ID);
  }
}
