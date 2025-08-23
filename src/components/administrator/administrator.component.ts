import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {Router} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-account-creation',
  imports: [
    HeaderComponent,
    FooterComponent,
    NgOptimizedImage
  ],
  templateUrl: './administrator.component.html',
  styleUrl: './administrator.component.scss'
})
export class AdministratorComponent {
  constructor(private readonly router: Router) {}

  redirectToMovieShowtimeSettingsPage() {
    this.router.navigate(['movie-showtime-settings']);
  }

  redirectToHallSettingsPage() {
    this.router.navigate(['hall-settings']);
  }

  redirectToEmployeeListPage() {
    this.router.navigate(['employee-list']);
  }

  redirectToDashboardPage() {
    this.router.navigate(['dashboard']);
  }
}
