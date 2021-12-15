import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ApartmentsComponent } from './apartments/apartments.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BookingsComponent } from './bookings/bookings.component';
import { SuitDetailComponent } from './suit-detail/suit-detail.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    HomeComponent,
    ApartmentsComponent,
    NavBarComponent,
    BookingsComponent,
    SuitDetailComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class HomeModule {}
