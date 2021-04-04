import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import {localStorageKeys} from './constants';
import {BehaviorSubject} from 'rxjs';
import {AppSettings} from '../shared/app-settings';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = AppSettings.BASE_URL;
  signedin$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  signin(formValues: SigninForm) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, formValues).pipe(
      tap((response) => {
        this.saveTokenInLocalStorage(response.access_token);
        this.signedin$.next(true);
      })
    );
  }

  saveTokenInLocalStorage(jwtToken: string) {
    const tokenDecoded = this.decodeToken(jwtToken);
    localStorage.setItem(localStorageKeys.jwt, jwtToken);
    localStorage.setItem(localStorageKeys.username, tokenDecoded.username);
    localStorage.setItem(localStorageKeys.expirationTime, tokenDecoded.exp);
  }

  hello() {
    return this.http.get(`${this.baseUrl}/hello`);
  }

  getProfile() {
    return this.http.get(`${this.baseUrl}/profile`);
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

  decodeToken(jwtToken: string): JwtData {
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
}
