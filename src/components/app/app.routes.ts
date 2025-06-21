import {Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {OrderComponent} from '../order/order.component';
import {EmployeeComponent} from '../employee/employee.component';

export const root: string = "http://localhost:4200/";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', title: "Home page", component: HomeComponent },
  { path: 'order', title: "Order page", component: OrderComponent },
  { path: 'employee', title: "Employee page", component: EmployeeComponent }
];
