import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {localStorageKeys} from '../shared/etc/constants';
import {AuthService} from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.authService.isSignedIn()) {
      console.log('interceptor - signedin: ', false);
      this.authService.signedin$.next(false);
      return;
    }
    this.authService.signedin$.next(true);
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem(localStorageKeys.jwt)}`
      }
    });
    return next.handle(req);
  }
}
