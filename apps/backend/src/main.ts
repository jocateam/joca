import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestApplicationOptions } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initServer } from './app/config/server.config';

async function bootstrap() {
  const serverConfig: NestApplicationOptions = {
    cors: true,
  };

  let app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    serverConfig
  );

  app = initServer(app);

  // Swagger added
  const config = new DocumentBuilder()
    .setTitle('JOCA')
    .setDescription("The Job Offers' Centralization App")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  return await app.listen(process.env?.PORT ?? 3000);
}
bootstrap().then((server) =>
  console.log(`Server started on`, server.address())
);
