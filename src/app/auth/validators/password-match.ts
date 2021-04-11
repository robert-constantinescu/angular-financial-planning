import {AbstractControl, ValidationErrors, Validator} from "@angular/forms";
import {Injectable} from "@angular/core";


@Injectable({providedIn: 'root'})
export class PasswordMatch implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    // in our case, the control argument will be a FormGroup object
    // the control.value will match the values from the FormControls named 'password, passwordConfirmation'
    const {password, passwordConfirmation} = control.value;

    if (password === passwordConfirmation) {
      // if there is no error we return Null. Here if the password matches
      return null;
    } else {
      // we just return an object that says what is wrong. Here can be anything, 'passwordMatch' was chosen by Robert
      return {passwordMatch: false};
    }
  }

}
