import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { toast } from 'ngx-sonner';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (req.url.includes('/refresh')) {
    return next(req);
  }

  const token = authService.getToken();

  const reqToSend = token
    ? req.clone({ setHeaders: { Authorization: token } }) // ou `Bearer ${token}`
    : req;

  return next(reqToSend).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse) {
        const isAuthError = err.status === 401 || err.status === 403;

        if (isAuthError) {
          return authService.refreshToken().pipe(
            switchMap(() => {
              const newToken = authService.getToken();
              const retryReq = newToken
                ? req.clone({ setHeaders: { Authorization: newToken } })
                : req;

              return next(retryReq);
            }),
            catchError((refreshErr) => {
              toast.error('You have been logged out, your session expired.');
              authService.logout?.();
              return throwError(() => refreshErr);
            })
          );
        }
      }

      return throwError(() => err);
    })
  );
};
