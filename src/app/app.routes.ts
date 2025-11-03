import {Routes} from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {LoginComponent} from "./features/login/login.component";
import {MoviesComponent} from "./features/movies/movies.component";
import {OrderComponent} from './features/order/order.component';
import {EmployeeListComponent} from './features/employee-list/employee-list.component';
import {MovieShowtimeSettingsComponent} from './features/movie-showtime-settings/movie-showtime-settings.component';
import {HallSettingsComponent} from './features/hall-settings/hall-settings.component';
import {ContactComponent} from './features/contact/contact.component';
import {AccountCreationComponent} from './features/account-creation/account-creation.component';
import {BookingComponent} from './features/booking/booking.component';
import {AdministratorComponent} from './features/administrator/administrator.component';
import {ForgottenPasswordComponent} from './features/forgotten-password/forgotten-password.component';
import {EmployeeGuard} from "./core/guards/employee.guard";
import {AdminGuard} from "./core/guards/admin.guard";
import {UserGuard} from "./core/guards/user.guard";
import {AuthGuard} from "./core/guards/auth.guard";

export const root: string = "http://localhost:4200/";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', title: "Home page", component: HomeComponent },
  { path: 'login', title: "Login page", component: LoginComponent },
  { path: 'movies', title: "Movies page", component: MoviesComponent },
  { path: 'booking', title: "Booking page", component: BookingComponent },
  { path: 'order', title: "Order page", component: OrderComponent, canActivate: [UserGuard, AuthGuard] },
  { path: 'employee', title: "Employee page", component: EmployeeListComponent, canActivate: [AdminGuard, AuthGuard] },
  {
    path: 'movie-showtime-settings',
    title: "Movie Showtime settings page",
    component: MovieShowtimeSettingsComponent,
    canActivate: [EmployeeGuard, AuthGuard]
  },
  {
    path: 'hall-settings',
    title: "Hall settings page",
    component: HallSettingsComponent,
    canActivate: [EmployeeGuard, AuthGuard]
  },
  { path: 'contact', title: "Contact page", component: ContactComponent },
  { path: 'account-creation', title: "Account creation page", component: AccountCreationComponent },
  {
    path: 'administrator',
    title: "Administrator page",
    component: AdministratorComponent,
    canActivate: [AdminGuard, AuthGuard]
  },
  { path: 'forgotten-password', title: "Forgotten password page", component: ForgottenPasswordComponent }
];
