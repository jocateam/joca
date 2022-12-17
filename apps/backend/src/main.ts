import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestApplicationOptions } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const serverConfig: NestApplicationOptions = {
    cors: true,
  };

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    serverConfig,
  );

  console.log('root folder : ', __dirname);

  // Swagger added
  const config = new DocumentBuilder()
    .setTitle('JOCA')
    .setDescription("The Job Offers' Centralization App")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  return await app.listen(process.env?.PORT ?? 3000);
}
bootstrap()
  .then((server) => console.log(`Server started on`, server.address()))
