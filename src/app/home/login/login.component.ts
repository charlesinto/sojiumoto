import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_core/services/auth/auth.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/_core/services/feedback.service';
const M = window['Materialize'];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm = new FormGroup({
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: new FormControl('', Validators.compose([Validators.required])),
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private FeedbackService: FeedbackService
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    M.updateTextFields();
  }
  login(event) {
    if (this.loginForm.valid) {
      const email = this.loginForm.value['email'];
      const password = this.loginForm.value['password'];
      this.authService.startLoading();
      this.authService.login(email, password).subscribe(
        (data) => {
          this.authService.stopLoading();
          this.authService.setItem(
            environment.LOCALSTORAGE_KEY_TOKEN,
            data.token
          );
          this.authService.setItem(
            environment.LOCALSTORAGE_KEY_USER,
            data.user
          );
          this.authService.setCurrentUser(data.user);
          this.router.navigateByUrl('/admin/dashboard');
        },
        (error) => {
          console.log(error);
          this.authService.stopLoading();
          this.FeedbackService.showPopAlertHttpError(error);
        }
      );
    }
    if (this.loginForm['email'].trim() === '') {
      return this.FeedbackService.showPopAlertError(null, 'Email is required');
    }
    if (this.loginForm['password'].trim() === '') {
      return this.FeedbackService.showPopAlertError(
        null,
        'Password is required'
      );
    }
  }
}
