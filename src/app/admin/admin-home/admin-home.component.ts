import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_core/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  user: any = {};
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = this.authService.getItem(environment.LOCALSTORAGE_KEY_USER);
    console.log(this.user);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
