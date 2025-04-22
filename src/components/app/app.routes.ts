import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';

export const root: string = "http://localhost:4200/";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', title: "Home page", component: HomeComponent }
];
