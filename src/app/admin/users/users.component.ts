import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_core/services/auth/auth.service';
import { FeedbackService } from 'src/app/_core/services/feedback.service';
const M = window['Materialize'];
const $ = window['$'];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  createUserForm = new FormGroup({
    firstName: new FormControl('', Validators.compose([Validators.required])),
    lastName: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required])),
    role: new FormControl('', Validators.compose([])),
    phoneNumber: new FormControl('', Validators.compose([Validators.required])),
    password: new FormControl('', Validators.compose([Validators.required])),
  });
  users: any[] = [];
  constructor(
    private authService: AuthService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }
  ngAfterViewInit() {
    $(document).ready(function () {
      M.updateTextFields();
      // $('select').material_select();

      $('select').formSelect();
    });
  }

  createUser(event) {
    event.preventDefault();
    console.log(this.createUserForm.value, $('select').val());

    if (this.createUserForm.valid && $('select').val().trim() !== '') {
      this.authService.startLoading();
      this.authService
        .createUser({ ...this.createUserForm.value, role: $('select').val() })
        .subscribe(
          (data) => {
            this.authService.stopLoading();
            console.log('data: ', data);
            this.getUsers();
            this.feedbackService.showPopAlertSuccess(
              'Operation Successful',
              'User Created Successfully'
            );
            this.createUserForm.reset();
          },
          (error) => {
            this.authService.stopLoading();
            this.feedbackService.showPopAlertHttpError(error);
          }
        );
    } else {
      this.feedbackService.showPopAlertError(
        'Validation Failed',
        'Please fill all fields on the form'
      );
    }
  }
  getUsers() {
    this.authService.getUsers().subscribe((data) => (this.users = data));
  }
}
