import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  signin(formValues: SigninForm) {
    return this.http.post(`${this.baseUrl}/auth/login`, formValues).pipe(
      tap((response) => {
        console.log(response);
      })
    );
  }

  hello() {
    return this.http.get(`${this.baseUrl}/hello`);
  }
}


interface SigninForm {
  username: string;
  password: string;
}
