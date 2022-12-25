import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { HttpException } from '../exceptions/http.exception';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionReponse = exception.getResponse() as { details: any[] };

    response.status(status).json({
      data: null,
      success: false,
      error: {
        statusCode: status,
        message: exception.decription,
        details: exceptionReponse.details,
      },
    });
  }
}
