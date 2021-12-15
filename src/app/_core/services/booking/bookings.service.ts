import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  constructor(private http: HttpClient) {}

  getAllSuite(): Observable<any> {
    return this.http.get('/api/v1/suite/get-suite').pipe(
      map((response: any) =>
        response.data.sort(
          (item1: any, item2: any) => item2.createdAt - item1.createdAt
        )
      ),
      catchError(this.handleHttpError)
    );
  }

  checkoutApartment(suiteId: number) {
    return this.http
      .get(`/api/v1/admin/close-deal/${suiteId}`)
      .pipe(catchError(this.handleHttpError));
  }
  getOneSuite(id: number): Observable<any> {
    return this.http
      .get(`/api/v1/suite/get-suit-by-id/${id}`)
      .pipe(catchError(this.handleHttpError));
  }
  handleHttpError(error: HttpErrorResponse) {
    if (error?.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error?.error?.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error?.status}, body was: ${error?.error}`
      );
      console.error(error?.error);
    }

    // If you want to return a new response:
    //return of(new HttpResponse({body: [{name: "Default value..."}]}));

    // If you want to return the error on the upper level:
    //return throwError(error);

    // or just return nothing:
    return throwError(error);
  }

  getBookings(): Observable<any> {
    return this.http.get('/api/v1/admin/get-bookings').pipe(
      map((response: any) => {
        return response.data.sort(
          (item1, item2) => item2.createdAt - item1.createdAt
        );
      }),
      catchError(this.handleHttpError)
    );
  }

  createBooking(param): Observable<any> {
    return this.http
      .post('/api/v1/admin/create-tenant', param)
      .pipe(catchError(this.handleHttpError));
  }
}
