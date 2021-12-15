import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/_core/services/auth/auth.service';
import { BookingsService } from 'src/app/_core/services/booking/bookings.service';
import { FeedbackService } from 'src/app/_core/services/feedback.service';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss'],
})
export class ManageBookingsComponent implements OnInit {
  bookings: any[] = [];
  aparments: any[] = [];
  constructor(
    private authService: AuthService,
    private bookingService: BookingsService,
    private FeedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.authService.startLoading();
    this.bookingService.getBookings().subscribe(
      (data) => {
        console.log(data);

        this.authService.stopLoading();
        this.bookings = data;
      },
      (error) => {
        this.authService.stopLoading();
        this.FeedbackService.showPopAlertHttpError(error);
      }
    );
  }
  checkOut(suiteId) {
    this.authService.startLoading();
    this.bookingService.checkoutApartment(suiteId).subscribe(
      (data) => {
        this.authService.stopLoading();

        this.FeedbackService.showPopAlertSuccess(
          'Operation successful',
          'Apartment successfully sold'
        );
        this.getBookings();
      },
      (error) => {
        this.authService.stopLoading();
        this.FeedbackService.showPopAlertHttpError(error);
      }
    );
  }
}
