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
import {ResetPasswordComponent} from "./features/reset-password/reset-password.component";
import {DashboardComponent} from "./features/dashboard/dashboard.component";

export const root: string = "http://localhost:4200/";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Public Routes
  {
    path: 'home',
    title: "Home page",
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    title: "Login page",
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'movies',
    title: "Movies page",
    loadComponent: () => import('./features/movies/movies.component').then(m => m.MoviesComponent)
  },
  {
    path: 'booking',
    title: "Booking page",
    loadComponent: () => import('./features/booking/booking.component').then(m => m.BookingComponent)
  },
  {
    path: 'contact',
    title: "Contact page",
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'account-creation',
    title: "Account creation page",
    loadComponent: () => import('./features/account-creation/account-creation.component').then(m => m.AccountCreationComponent)
  },
  {
    path: 'forgotten-password',
    title: "Forgotten password page",
    loadComponent: () => import('./features/forgotten-password/forgotten-password.component').then(m => m.ForgottenPasswordComponent)
  },
  {
    path: 'reset-password',
    title: "Reset password page",
    loadComponent: () => import('./features/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },

  // User Protected Routes
  {
    path: 'order',
    title: "Order page",
    loadComponent: () => import('./features/order/order.component').then(m => m.OrderComponent),
    canActivate: [UserGuard, AuthGuard]
  },

  // Employee Protected Routes
  {
    path: 'movie-showtime-settings',
    title: "Movie Showtime settings page",
    loadComponent: () => import('./features/movie-showtime-settings/movie-showtime-settings.component').then(m => m.MovieShowtimeSettingsComponent),
    canActivate: [EmployeeGuard, AuthGuard]
  },
  {
    path: 'hall-settings',
    title: "Hall settings page",
    loadComponent: () => import('./features/hall-settings/hall-settings.component').then(m => m.HallSettingsComponent),
    canActivate: [EmployeeGuard, AuthGuard]
  },

  // Admin Protected Routes
  {
    path: 'employee',
    title: "Employee page",
    loadComponent: () => import('./features/employee-list/employee-list.component').then(m => m.EmployeeListComponent),
    canActivate: [AdminGuard, AuthGuard]
  },
  {
    path: 'dashboard',
    title: "Dashboard page",
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AdminGuard, AuthGuard]
  },
  {
    path: 'administrator',
    title: "Administrator page",
    loadComponent: () => import('./features/administrator/administrator.component').then(m => m.AdministratorComponent),
    canActivate: [AdminGuard, AuthGuard]
  }
];
