import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isTokenValid().subscribe(
      (value => {
        if (value.body.isValid) {
          this.authService.signedin$.next(value.body.isValid);
          this.router.navigateByUrl('/home');
        }
      })
    );
  }

  signinForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
  }

  onSignin() {
    console.log('On signin');
    this.authService.signin(this.signinForm.value).subscribe(
      value => {
        console.log('On signin: ', value);
        this.router.navigateByUrl('/home');
      }
    );
  }
}
