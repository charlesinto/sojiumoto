import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApartmentsComponent } from './apartments/apartments.component';
import { BookingsComponent } from './bookings/bookings.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SuitDetailComponent } from './suit-detail/suit-detail.component';

const routes: Routes = [
  { path: 'suits', component: ApartmentsComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'suit-detail/:id', component: SuitDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
