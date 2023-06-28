import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, filter, tap } from 'rxjs';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      filter((event) => event.type !== 0), // Skip `sent` event
      tap({
        next: (event: HttpEvent<unknown>) => {
          if (event instanceof HttpResponse && event.status === 401) {
            this.router.navigateByUrl('/login');
          }

          return event;
        },
        error: (error: unknown) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.router.navigateByUrl('/login');
            }
          }
        },
      }),
    );
  }
}
