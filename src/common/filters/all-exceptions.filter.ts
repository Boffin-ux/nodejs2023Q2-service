import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggingService } from '@src/logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggingService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const { url, method } = ctx.getRequest();
    const isHttpException = exception instanceof HttpException;

    const statusCode = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = isHttpException && exception.message;
    const name = isHttpException && exception.name;
    const responseBody = {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: url,
    };

    await this.logger.error(`${method} ${url} ${statusCode} ${message}`, name);

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
