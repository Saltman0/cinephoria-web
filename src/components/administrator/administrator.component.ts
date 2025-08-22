import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService} from '../../services/api/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-creation',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './administrator.component.html',
  styleUrl: './administrator.component.scss'
})
export class AdministratorComponent {
  accountCreationForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required, Validators.pattern("^\\+?[0-9]{1,3}([-\\s]?[0-9]{1,4}){2,4}$\n")])
  });

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
