import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { States } from '../../constants';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject({});
  constructor(private http: HttpClient) {}

  loading = new BehaviorSubject(false);

  login(email, password): Observable<any> {
    return this.http
      .post('/api/v1/admin/login', { email, password })
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
  setItem(key: string, value: any) {
    // const encrypted = CryptoJS.AES.encrypt(
    //   value,
    //   environment.ENCRYPTION_KEY
    // ).toString();
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
    // const encryptedItem = localStorage.getItem(key);
    // if (!encryptedItem) return null;
    // const value = CryptoJS.AES.decrypt(
    //   encryptedItem,
    //   environment.ENCRYPTION_KEY
    // ).toString(CryptoJS.enc.Utf8);
    // return value;
  }
  logout() {
    localStorage.clear();
    this.currentUser.next({});
  }
  isLoggedIn(): boolean {
    return this.getItem(environment.LOCALSTORAGE_KEY_TOKEN) ? true : false;
  }
  setCurrentUser(user: any) {
    this.currentUser.next(user);
  }

  getStates(): string[] {
    return States.map((item) => item.state.name).sort((item1, item2) => {
      if (item1 > item2) return 1;
      else if (item2 < item1) return -1;
      return 0;
    });
  }

  createUser(params): Observable<any> {
    return this.http
      .post('/api/v1/admin/create-user', params)
      .pipe(catchError(this.handleHttpError));
  }
  getUsers(): Observable<any> {
    return this.http.get('/api/v1/admin/get-users').pipe(
      map((response: any) =>
        response.data.sort((item1, item2) => item2.createdAt - item1.createdAt)
      ),
      catchError(this.handleHttpError)
    );
  }
  startLoading() {
    this.loading.next(true);
  }
  stopLoading() {
    this.loading.next(false);
  }
}
