import { HttpException as NestHttpException } from '@nestjs/common';
import { HttpExceptionOptions } from '@nestjs/common/exceptions/http.exception';
import { ExceptionDetail } from '../interfaces/exception-detail.interface';

export class HttpException extends NestHttpException {
  public decription: string;
  public baseException?: any;

  constructor(
    description: string,
    details: ExceptionDetail[],
    status: number,
    baseException?: any,
    options?: HttpExceptionOptions
  ) {
    super({ details }, status ?? 400, options);
    this.decription = description;
    this.baseException = baseException;
  }
}
