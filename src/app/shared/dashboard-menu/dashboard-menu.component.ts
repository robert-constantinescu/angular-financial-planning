import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent implements OnInit {

  mySidebar = null;
  overlayBg = null;
  constructor(private router: Router) { }


  ngOnInit(): void {
    this.mySidebar = document.getElementById('mySidebar');
    this.overlayBg = document.getElementById('myOverlay');
  }

  onMenuClose() {
    this.mySidebar.style.display = 'none';
    this.overlayBg.style.display = 'none';
  }

  onMenuOpen() {
    if (this.mySidebar.style.display === 'block') {
      this.mySidebar.style.display = 'none';
      this.overlayBg.style.display = 'none';
    } else {
      this.mySidebar.style.display = 'block';
      this.overlayBg.style.display = 'block';
    }
  }

  onSignUp() {
    this.router.navigateByUrl('/signup');
  }
}
