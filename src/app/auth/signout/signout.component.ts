import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  profile: any;

  ngOnInit(): void {
  }

  getHello() {
    this.authService.hello().subscribe((val) => {
      console.log('getHello: ', val);
    });
  }

  getProfile() {
    this.authService.getProfile().subscribe((value => {
      this.profile = value;
    }));
  }

}
