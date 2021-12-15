import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_core/services/auth/auth.service';
import { BookingsService } from 'src/app/_core/services/booking/bookings.service';
import { FeedbackService } from 'src/app/_core/services/feedback.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: any;
  bookings: any[] = [];
  constructor(
    private authService: AuthService,
    private bookingService: BookingsService,
    private feebackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getBookings();
  }

  getUser() {
    this.user = this.authService.getItem(environment.LOCALSTORAGE_KEY_USER);
  }

  getBookings() {
    this.authService.startLoading();
    this.bookingService.getBookings().subscribe(
      (data) => {
        this.authService.stopLoading();
        this.bookings = data;
      },
      (error) => {
        this.authService.stopLoading();
        this.feebackService.showPopAlertHttpError(error);
      }
    );
  }
}
