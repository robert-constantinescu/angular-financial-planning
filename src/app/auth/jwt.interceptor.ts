import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {localStorageKeys} from '../shared/etc/constants';
import {AuthService} from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private excludeUrlForIntercept = [
    'auth/login'
  ];

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.authService.isSignedIn() && this.isUrlValidForInterceptor(request.url)) {
      this.authService.signedin$.next(false);
      console.log('interceptor - willReturn: ');
      return;
    }
    console.log('interceptor-afterIf');
    this.authService.signedin$.next(true);
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem(localStorageKeys.jwt)}`
      }
    });
    return next.handle(req);
  }

  private isUrlValidForInterceptor(requestUrl: string) {
    const positionIndicator = 'api/';
    const position = requestUrl.indexOf(positionIndicator);
    if (position > 0) {
      const destination = requestUrl.substr(position + positionIndicator.length);
      for (const address of this.excludeUrlForIntercept) {
        if (new RegExp(address).test(destination)){
          return false;
        }
      }
    }
    return true;
  }
}
