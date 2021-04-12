import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {IncomeDto} from '../income-dto';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-income-home',
  templateUrl: './income-home.component.html',
  styleUrls: ['./income-home.component.css']
})
export class IncomeHomeComponent implements OnInit {


  incomeList: IncomeDto[];

  profile: any;
  date: Date;


  constructor(private authService: AuthService,
              private activeRoute: ActivatedRoute) {
    this.activeRoute.data.subscribe((data) => {
        this.incomeList = data.incomeList;
      }
    );
  }

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
