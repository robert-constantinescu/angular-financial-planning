
// the only reason i am adding the @Injectable is to enable this class to use the DependencyInjectionSystem
import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {AbstractControl} from '@angular/forms';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UniqueUsername {
  constructor(private authService: AuthService) {
  }

  // by using the arrow function here, we bind the context of the `validate` arrow function
  // to the instance of the class, but why?
  validate = (control: AbstractControl) => {
    const {value} = control;

    return this.authService.validateUsername(value).pipe(
      map((response: any) => {
        if (response.userIsAvailable) {
          return null;
        }
      }),
      catchError((err) => {
        console.log(err);
        if (err.error.username) {
          return of({isUniqueUsername: false});
        }
        else {
          return of({error: err.message, statusCode: err.statusCode});
        }
      })
    );

}

}
