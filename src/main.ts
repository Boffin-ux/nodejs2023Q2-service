import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger/dist';

const PORT = process.env.PORT || 4000;
const SWAGGER_API_ENDPOINT = '/api/docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
