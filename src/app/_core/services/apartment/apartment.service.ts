import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  constructor(private http: HttpClient) {}

  uploadToCloudinary(file: any[]): Observable<ICloudinary[]> {
    const requests = [];
    file.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', environment.folderName);
      formData.append('upload_preset', environment.UPLOAD_PRESET);
      requests.push(this.http.post(environment.CLOUDINARY_URL, formData));
    });
    return forkJoin<ICloudinary[][]>(requests).pipe(
      catchError(this.handleHttpError)
    );
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
  createApartment(payload: any): Observable<any> {
    return this.http
      .post('/api/v1/admin/create-suit', payload)
      .pipe(catchError(this.handleHttpError));
  }
  reOpenApartment(payload) {
    return this.http
      .post('/api/v1/admin/open-suite', payload)
      .pipe(catchError(this.handleHttpError));
  }
}

export interface ICloudinary {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: [];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
}
