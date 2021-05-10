import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import jwtDecode, {JwtPayload} from 'jwt-decode';
import {localStorageKeys} from '../shared/etc/constants';
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {ConfigurationConstants} from '../shared/configuration-constants';
import {BackendResponse} from '../shared/etc/interfaces/backend-response.interface';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authApi = `${ConfigurationConstants.BASE_URL}/auth`;

  signedin$ = new BehaviorSubject(null);

  constructor(private http: HttpClient,
              private router: Router) {
    const isTokenValid = this.isTokenValid();
    if (this.isTokenValid()) {
      this.signedin$.next(isTokenValid);
    }

  }

  signin(formValues: SigninForm) {
    console.log(`signin: ${this.authApi}/login`);
    return this.http.post<BackendResponse<AuthResponse>>(`${this.authApi}/login`, formValues).pipe(
      tap((response) => {
        console.log('signin - TAP: ');
        this.saveTokenInLocalStorage(response.body.access_token);
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
    const jwtExpTime = this.getJwtExpTimeMillis();
    if (currentTime > jwtExpTime) {
      console.log('isSignedIn - false: ');
      localStorage.removeItem(localStorageKeys.jwt);
      return false;
    }
    console.log('isSignedIn - true: ');
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


  isTokenValid(): Observable<BackendResponse<ValidateToken>> {
    const jwtToken = localStorage.getItem(localStorageKeys.jwt);
    return this.http.post<BackendResponse<ValidateToken>>(`${this.authApi}/validate-token`, jwtToken).pipe(
      tap(response => {
        if (response.body.isValid === true) {
          this.signedin$.next(response.body.isValid);
        }
      }),
      catchError(err => {
        this.signedin$.next(false);
        console.log(err.message);
        return EMPTY;
      })
    );
  }

  getJwtExpTimeMillis(): number {
    const exp = Number.parseInt(localStorage.getItem(localStorageKeys.expirationTime), 10);
    if (isNaN(exp)) {
      return 0;
    }
    return exp * 1000;
  }

  cleanAuthenticationData() {
    localStorage.removeItem(localStorageKeys.jwt);
    localStorage.removeItem(localStorageKeys.sub);
    localStorage.removeItem(localStorageKeys.expirationTime);
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

export interface AuthResponse {
  access_token: string;
}

interface JwtData {
  username: string;
  iat: string;
  exp: string;
  sub: string;
}

export interface ValidateToken {
  isValid: boolean;
}
