import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import {localStorageKeys} from './constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  signin(formValues: SigninForm) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, formValues).pipe(
      tap((response) => {
        this.saveTokenInLocalStorage(response.access_token);
      })
    );
  }

  saveTokenInLocalStorage(jwtToken: string) {
    const tokenDecoded = this.decodeToken(jwtToken);
    localStorage.setItem(localStorageKeys.jwt, jwtToken);
    localStorage.setItem(localStorageKeys.username, tokenDecoded.username);
    localStorage.setItem(localStorageKeys.expirationTime, tokenDecoded.exp);
  }

  decodeToken(jwtToken: string): JwtData {
    return jwtDecode(jwtToken);
  }

  hello() {
    return this.http.get(`${this.baseUrl}/hello`);
  }

  getProfile() {
    return this.http.get(`${this.baseUrl}/profile`);
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
