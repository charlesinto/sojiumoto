import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable, EventEmitter } from '@angular/core';
// import { NotificationsService } from "angular2-notifications";
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  public balanceReportDelete;
  public customerDeliveryDelete;
  public notificationDesign: Object;
  constructor(
    // private notificationService: NotificationsService,
    private toastr: ToastrService
  ) {
    this.balanceReportDelete = new EventEmitter();
    this.customerDeliveryDelete = new EventEmitter();
  }

  //defines notification object
  public getNotificationDesign(timeOut): any {
    return (this.notificationDesign = {
      timeOut: timeOut,
      pauseOnHover: false,
      clickToClose: false,
      maxLength: 100,
      animate: 'scale',
    });
  }

  showSuccessToastr(title: string, message: string) {
    this.toastr.success(message, title);
  }

  showErrorToastr(title, message: string) {
    console.log('chhhhh', this.toastr);
    this.toastr.error(message, title);
  }

  showPopAlertError(title?: string, message?: string) {
    Swal.fire({
      icon: 'error',
      title: title ? title : 'Operation failed',
      text: message
        ? message
        : 'Some error were encountered our technical team will get on it quickly.',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  }

  showPopAlertSuccess(title?: string, message?: string) {
    Swal.fire({
      icon: 'success',
      title: title ? title : 'Operation failed',
      text: message ? message : 'Operation successful',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  }

  showPopAlertHttpError(error) {
    Swal.fire({
      icon: 'error',
      title: 'Operation failed',
      text: error?.error?.message
        ? error?.error?.message
        : 'Some errors were encountered, our technical team will resolve it shortly',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  }

  showInfoToastr(title, message: string) {
    this.toastr.info(message, title);
  }

  /**
   * structure the error message that will be shown to the user
   * @param err- send the error title
   * @param description- holds the body of the error message
   * @param timeout- decides how many seconds the error message will last
   */
  // errorMessage(err: string, description: string, timeout: number) {
  //   this.notificationService.error(
  //     err,
  //     description,
  //     this.getNotificationDesign(timeout)
  //   );
  // }

  /**
   *
   * @param msg - show the success title
   * @param description - show the body of the success message
   * @param timeout - show the duration of the success message
   * createDeleteSuccessMessage() create the structure of the success message
   */
  // successMessage(
  //   msg: string,
  //   description: string,
  //   timeout: number,
  //   id?: number
  // ) {
  //   this.notificationService.success(
  //     msg,
  //     description,
  //     this.getNotificationDesign(timeout)
  //   );
  // }

  /**
   * structure the wait message that will be shown to the user
   * @param err- send the wait title
   * @param description- holds the body of the wait message
   * @param timeout- decides how many seconds the wait message will last
   */
  // waitMessage(title: string, description: string, timeout: number) {
  //   this.notificationService.info(
  //     title,
  //     description,
  //     this.getNotificationDesign(timeout)
  //   );
  // }
}
