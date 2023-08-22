import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger/dist';
import { LoggingService } from './logger/logger.service';
import { LogLevels } from './logger/enums/logger.enum';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { HttpAdapterHost } from '@nestjs/core';

const PORT = process.env.PORT || 4000;
const SWAGGER_API_ENDPOINT = '/api/docs';
const LOG_LEVEL = +process.env.LOGGER_LEVEL || 2;
const LOGGER_LEVEL = [Object.values(LogLevels)[LOG_LEVEL]];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const config = new DocumentBuilder()
    .setTitle('Home-Library')
    .setDescription('REST API')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        type: 'apiKey',
        scheme: 'bearer',
        description:
          'Enter your token in format "Bearer token". <br>e.g. <b>Bearer abcd123</b>',
        name: 'Authorization',
        in: 'header',
        bearerFormat: 'JWT',
      },
      'Bearer',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_API_ENDPOINT, app, document);

  const logger = app.get(LoggingService);
  app.useLogger(logger);
  app.useLogger(LOGGER_LEVEL);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(logger, httpAdapterHost));

  process.on('unhandledRejection', async (err) => {
    await logger.error(`Unhandled Rejection ${err}`);
  });

  process.on('uncaughtException', async (err) => {
    await logger.error(`Uncaught Exception ${err.name} ${err.message}`);
    process.exit(1);
  });

  await app.listen(PORT);

  await logger.debug(`Application is running on port: ${PORT}`, bootstrap.name);
}
bootstrap();
