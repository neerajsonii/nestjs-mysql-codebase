import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    
    /* 
       This block will be called before request comes.
       This intercepts the incoming request
     */

    return next.handle().pipe(map(data => {
      /* 
       This block will be called when response is being sent.
       This intercepts the outgoing response

       you can use this block for auditing requests.
     */
      return ({ data })
    }), catchError(err => throwError(this.handleResponseExceptions(err))
    ));
  }

  private handleResponseExceptions(err: HttpException) {
    // handle the exception response here
    return err
  }

}