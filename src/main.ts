import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger/dist';
import { LoggingService } from './logger/logger.service';
import { LogLevels } from './logger/enums/logger.enum';

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

  await app.listen(PORT);

  logger.debug(`Application is running on port: ${PORT}`, 'StartApp');
}
bootstrap();
