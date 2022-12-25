import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class DefaultFormatInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    const currentUrl: string = context.getArgs()[0].url;
    const excludedPaths: string[] = ['public'];

    for (const ep of excludedPaths) {
      if (currentUrl.includes(ep)) {
        return next.handle();
      }
    }

    return next.handle().pipe(
      map((data) =>
        typeof data.success !== 'undefined'
          ? data
          : {
              success: true,
              data,
            }
      )
    );
  }
}
