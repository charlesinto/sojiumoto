import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ApartmentService } from 'src/app/_core/services/apartment/apartment.service';
import { AuthService } from 'src/app/_core/services/auth/auth.service';
import { BookingsService } from 'src/app/_core/services/booking/bookings.service';
import { FeedbackService } from 'src/app/_core/services/feedback.service';

const $ = window['$'];
const M = window['Materialize'];

@Component({
  selector: 'app-create-apartment',
  templateUrl: './create-apartment.component.html',
  styleUrls: ['./create-apartment.component.scss'],
})
export class CreateApartmentComponent implements OnInit, AfterViewInit {
  uploadForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required])),
    price: new FormControl('', Validators.compose([Validators.required])),
    discountedPrice: new FormControl('', Validators.compose([])),
    shortDescription: new FormControl('', Validators.compose([])),
    longDescription: new FormControl('', Validators.compose([])),
    state: new FormControl('', Validators.compose([])),
  });
  states = [];
  constructor(
    private authService: AuthService,
    private apartMentService: ApartmentService,
    private feedbackService: FeedbackService,
    private bookingService: BookingsService
  ) {}
  files: any[] = [];
  apartments: any[] = [];

  ngOnInit(): void {
    this.getStates();
    this.getData();
  }

  getData() {
    this.authService.startLoading();
    forkJoin([this.bookingService.getAllSuite()]).subscribe(
      (data) => {
        this.authService.stopLoading();
        this.apartments = data[0];
      },
      (error) => {
        this.authService.stopLoading();
        this.feedbackService.showPopAlertHttpError(error);
      }
    );
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      M.updateTextFields();
      // $('select').formSelect({ classes: 'select-dropdown-menu' });
      $('select').material_select();
    });
  }
  getStates() {
    this.states = this.authService.getStates();
  }
  resetForm() {
    this.uploadForm.reset();
    $('select').formSelect();
  }
  saveApartment() {
    if (this.uploadForm.invalid) {
      return this.feedbackService.showPopAlertError(
        'Validation Failed',
        'Please fill out all information'
      );
    }
    if (this.files.length === 0) {
      return this.feedbackService.showPopAlertError(
        'No image(s) added',
        'Please select one or more images'
      );
    }

    this.authService.startLoading();

    this.apartMentService
      .uploadToCloudinary(this.files)
      .pipe(
        mergeMap((data) => {
          return this.apartMentService.createApartment({
            ...this.uploadForm.value,
            thumbNailUrl: data[0]?.secure_url,
            otherImage1: data[1]?.secure_url,
            otherImage2: data[2]?.secure_url,
            otherImage3: data[3]?.secure_url,
            otherImage4: data[4]?.secure_url,
            info: [],
          });
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.authService.stopLoading();
          this.feedbackService.showPopAlertSuccess(
            'Operation Successful',
            'Apartment created sucessfully'
          );
          this.resetForm();
        },
        (error) => {
          this.authService.stopLoading();
          this.feedbackService.showPopAlertHttpError(error);
        }
      );
  }
  onFileChange(event) {
    console.log('event: ', event.target.files);
    this.files = [];
    Object.values(event.target.files).forEach((item) => this.files.push(item));
  }

  openApartment(suiteId) {
    this.authService.startLoading();
    this.apartMentService.reOpenApartment({ suiteId }).subscribe(
      () => {
        this.authService.stopLoading();
        this.getData();
      },
      (error) => {
        this.feedbackService.showPopAlertHttpError(error);
        this.authService.stopLoading();
        console.log(error);
      }
    );
  }
}
