import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-income-home',
  templateUrl: './income-home.component.html',
  styleUrls: ['./income-home.component.css']
})
export class IncomeHomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  profile: any;
  date: Date;

  ngOnInit(): void {
  }

  getHello() {
    this.authService.hello().subscribe((val) => {
      console.log('getHello: ', val);
      this.date = new Date();
    });
  }

  getProfile() {
    this.authService.getProfile().subscribe((value => {
      this.profile = value;
    }));
  }

  // ngAfterViewChecked() {
  //   this.date = new Date();
  // }


}
