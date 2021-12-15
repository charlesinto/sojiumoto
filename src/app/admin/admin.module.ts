import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UsersComponent } from './users/users.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateApartmentComponent } from './create-apartment/create-apartment.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    AdminHomeComponent,
    UsersComponent,
    CreateApartmentComponent,
    ManageBookingsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AdminModule {}
