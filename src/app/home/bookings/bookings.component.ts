import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_core/services/auth/auth.service';
import { FeedbackService } from 'src/app/_core/services/feedback.service';
import { BookingsService } from '../../_core/services/booking/bookings.service';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  data: any[] = [];
  constructor(
    private bookingService: BookingsService,
    private feedbackService: FeedbackService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllSuites();
  }

  getAllSuites() {
    this.authService.startLoading();
    this.bookingService.getAllSuite().subscribe(
      (data) => {
        this.authService.stopLoading();
        console.log('data: ', data);
        this.data = data;
      },
      (error) => {
        this.authService.stopLoading();
        this.feedbackService.showPopAlertHttpError(error);
      }
    );
  }
}
