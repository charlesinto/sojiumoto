import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_core/services/auth/auth.service';
import { BookingsService } from 'src/app/_core/services/booking/bookings.service';
import { FeedbackService } from 'src/app/_core/services/feedback.service';
import Swal from 'sweetalert2';
const $ = window['$'];
const M = window['Materialize'];

@Component({
  selector: 'app-suit-detail',
  templateUrl: './suit-detail.component.html',
  styleUrls: ['./suit-detail.component.scss'],
})
export class SuitDetailComponent implements OnInit, AfterViewInit {
  data: any = {};
  bookingForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required])),
    phoneNumber: new FormControl('', Validators.compose([Validators.required])),
    name: new FormControl('', Validators.compose([Validators.required])),
  });
  suite: number;
  checkoutDate = '';
  checkinDate = '';
  constructor(
    private bookingService: BookingsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private feebackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((item) => {
      this.getSuite(item.id);
      this.suite = parseInt(item.id);
    });
  }
  ngAfterViewInit() {
    $(document).ready(function () {
      $('.datepicker').datepicker();
      M.updateTextFields();
      $('.datepicker2').datepicker();
      $('select').material_select();
    });
  }
  getSuite(id: number) {
    this.bookingService.getOneSuite(id).subscribe(
      (response) => {
        console.log('data: ', response.data);
        this.data = response.data;
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }
  checkoutDateChange(event) {
    this.checkoutDate = $('#checkOutDate').val();
  }
  checkinDateChange(event) {
    this.checkinDate = $('#checkinDate').val();
    console.log('called here oo: ', this.checkinDate);
  }
  createBooking(event) {
    event.preventDefault();
    if (!this.authService.isLoggedIn()) {
      return Swal.fire({
        icon: 'info',
        title: 'Authentication failure',
        text: 'Please login to continue',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      });
    }

    console.log('this.bookingForm.valid: ', this.bookingForm.value);
    console.log('date: ', $('#customerCategory').val());
    if (this.bookingForm.valid) {
      console.log('called here');
      if (!$('#checkinDate').val() || $('#checkinDate').val() === '') {
        return Swal.fire({
          icon: 'info',
          title: 'Validation Failed',
          text: 'Please Provide Interest Date',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      }
      if (
        !$('#customerCategory').val() ||
        $('#customerCategory').val() === ''
      ) {
        return Swal.fire({
          icon: 'info',
          title: 'Validation Failed',
          text: 'Please Choose Customer Category',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      }
      this.authService.startLoading();
      this.bookingService
        .createBooking({
          suite: this.suite,
          ...this.bookingForm.value,
          checkInDate: $('#checkinDate').val(),
          checkOutDate: $('#checkOutDate').val(),
          customerCategory: $('#customerCategory').val(),
        })
        .subscribe(
          (data) => {
            console.log('operation successful: ', data);
            this.authService.stopLoading();
            this.bookingForm.reset();
            $('#checkinDate').val('');
            $('#checkOutDate').val('');
            $('#customerCategory').val('');

            Swal.fire({
              icon: 'success',
              title: 'Operation successful',
              text: 'Your Booking has been successfully recorded',
              showClass: {
                popup: 'animate__animated animate__fadeInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
              },
            });
          },
          (error) => {
            this.authService.stopLoading();
            console.log('error: ', error);
            this.feebackService.showPopAlertHttpError(error);
          }
        );
    } else {
      console.log('accl');
      Swal.fire({
        icon: 'error',
        title: 'Validation Failed',
        text: 'Please complete all required information',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      });
    }
  }
}
