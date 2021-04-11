import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import {localStorageKeys} from './constants';
import {BehaviorSubject} from 'rxjs';
import {ConfigurationConstants} from '../shared/configuration-constants';
import {BackendResponse} from "../shared/interfaces/backend-response.interface";

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

  signup(formValues: SignupForm) {
    return this.http.post<BackendResponse<AuthResponse>>(`${this.authApi}/signup`, formValues).pipe(
      tap((response) => {
          this.signedin$.next(true);
          this.saveTokenInLocalStorage(response.body.access_token);
        }
      )
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

  validateUsername(value: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        username: value
      }
    };
    return this.http.get<boolean>(`${this.authApi}/signup/validate`, options);
  }


}


interface SigninForm {
  username: string;
  password: string;
}

interface SignupForm {
  username: string;
  password: string;
  passwordConfirmation: string;
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
