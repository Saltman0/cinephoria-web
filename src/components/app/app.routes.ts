import {Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {OrderComponent} from '../order/order.component';
import {EmployeeComponent} from '../employee/employee.component';
import {MovieShowtimeSettingsComponent} from '../movie-showtime-settings/movie-showtime-settings.component';
import {HallSettingsComponent} from '../hall-settings/hall-settings.component';
import {ContactComponent} from '../contact/contact.component';
import {AccountCreationComponent} from '../account-creation/account-creation.component';
import {BookingComponent} from '../booking/booking.component';

export const root: string = "http://localhost:4200/";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', title: "Home page", component: HomeComponent },
  { path: 'booking', title: "Booking page", component: BookingComponent },
  { path: 'order', title: "Order page", component: OrderComponent },
  { path: 'employee', title: "Employee page", component: EmployeeComponent },
  { path: 'movie-showtime-settings', title: "Movie Showtime settings page", component: MovieShowtimeSettingsComponent },
  { path: 'hall-settings', title: "Hall settings page", component: HallSettingsComponent },
  { path: 'contact', title: "Contact page", component: ContactComponent },
  { path: 'account-creation', title: "Account creation page", component: AccountCreationComponent }
];
