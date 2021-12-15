import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCanActivateGuard } from '../_core/guards/admin-canactivate/admin-can-activate.guard';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateApartmentComponent } from './create-apartment/create-apartment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminHomeComponent,
    children: [
      {
        path: 'users',
        canActivate: [AdminCanActivateGuard],
        component: UsersComponent,
      },
      {
        path: 'create-apartment',
        canActivate: [AdminCanActivateGuard],
        component: CreateApartmentComponent,
      },
      {
        path: 'manage-boookings',
        component: ManageBookingsComponent,
      },
      { path: '', component: DashboardComponent },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
