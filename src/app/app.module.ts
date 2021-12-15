import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseHttpterceptor } from './_core/interceptors/http.interceptor';
import { BookingsService } from './_core/services/booking/bookings.service';
import { AuthService } from './_core/services/auth/auth.service';
import { CanActivateService } from './_core/guards/admin/can-activate.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './loader/loading/loading.component';
import { ToastrModule } from 'ngx-toastr';
import { FeedbackService } from './_core/services/feedback.service';
import { ApartmentService } from './_core/services/apartment/apartment.service';
import { AdminCanActivateGuard } from './_core/guards/admin-canactivate/admin-can-activate.guard';
@NgModule({
  declarations: [AppComponent, NavBarComponent, LoadingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseHttpterceptor, multi: true },
    BookingsService,
    AuthService,
    CanActivateService,
    FeedbackService,
    ApartmentService,
    AdminCanActivateGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
