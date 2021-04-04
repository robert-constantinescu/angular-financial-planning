import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  signinForm = new FormGroup({
    username: new FormControl('richie'),
    password: new FormControl('admin'),
  });

  ngOnInit(): void {
  }

  // ngAfterViewChecked(): void {
  //
  // }

  onSignin() {
    console.log('On signin');
    this.authService.signin(this.signinForm.value).subscribe(
      value => {
        this.router.navigateByUrl('/home');
      }
    );
  }
}
