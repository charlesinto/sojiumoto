import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class BaseHttpterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const AUTHORIZED_ROUTES = [
      '/api/v1/admin/create-tenant',
      '/api/v1/admin/get-bookings',
      '/api/v1/admin/create-user',
      '/api/v1/admin/get-users',
      '/api/v1/admin/create-suit',
    ];
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    const token = this.authService.getItem(environment.LOCALSTORAGE_KEY_TOKEN);

    if (isApiUrl) {
      console.log('in here: ', request.url);
      if (AUTHORIZED_ROUTES.includes(request.url)) {
        const headers = new HttpHeaders({
          Authorization: token,
          'Content-Type': 'application/json',
        });
        request = request.clone({
          url: `${environment.baseUrl}${request.url}`,
          headers,
        });
      } else {
        if (token) {
          const headers = new HttpHeaders({
            Authorization: token,
            'Content-Type': 'application/json',
          });
          request = request.clone({
            url: `${environment.baseUrl}${request.url}`,
            headers,
          });
        } else {
          request = request.clone({
            url: `${environment.baseUrl}${request.url}`,
          });
        }
      }
    } else {
      request = request.clone({ url: `${request.url}` });
    }

    return next.handle(request);
  }
}
