import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import {localStorageKeys} from './constants';
import {BehaviorSubject} from 'rxjs';
import {ConfigurationConstants} from '../shared/configuration-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authApi = `${ConfigurationConstants.BASE_URL}/auth`;
  private tokenDecode: JwtPayload;
  signedin$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  signin(formValues: SigninForm) {
    return this.http.post<AuthResponse>(`${this.authApi}/login`, formValues).pipe(
      tap((response) => {
        this.saveTokenInLocalStorage(response.access_token);
        this.signedin$.next(true);
      })
    );
  }

  saveTokenInLocalStorage(jwtToken: string) {
    const tokenDecoded = this.decodeToken(jwtToken);
    localStorage.setItem(localStorageKeys.jwt, jwtToken);
    localStorage.setItem(localStorageKeys.expirationTime, String(tokenDecoded.exp));
    localStorage.setItem(localStorageKeys.sub, tokenDecoded.sub);
  }

  hello() {
    return this.http.get(`${this.authApi}/hello`);
  }

  getProfile() {
    return this.http.get(`${this.authApi}/profile`);
  }

  isSignedIn(): boolean {
    const currentTime = Date.now();
    const jwtExpTime = Date.parse(localStorage.getItem(localStorageKeys.expirationTime));
    if (currentTime > jwtExpTime) {
      localStorage.removeItem(localStorageKeys.jwt);
      return false;
    }
    return true;
  }

  decodeToken(jwtToken: string): JwtPayload {
    return jwtDecode(jwtToken);
  }

}


interface SigninForm {
  username: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
}

interface JwtData {
  username: string;
  iat: string;
  exp: string;
  sub: string;
}
