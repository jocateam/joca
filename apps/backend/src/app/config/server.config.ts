import { NestExpressApplication } from '@nestjs/platform-express';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as morgan from 'morgan';
import { HttpFilter } from '../../shared/filters/http.filter';
import { DefaultFormatInterceptor } from '../../shared/interceptors/default-format.interceptor';

export const initServer = (
  app: NestExpressApplication
): NestExpressApplication =>
  app
    .useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors) => new BadRequestException(errors),
        validationError: { value: true, target: false },
      })
    )
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .useGlobalInterceptors(new DefaultFormatInterceptor())
    .useGlobalFilters(new HttpFilter())
    .use(morgan('dev'));
