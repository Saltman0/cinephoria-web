import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService} from '../../services/api/api.service';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';
import {NgOptimizedImage} from '@angular/common';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    NavMobileComponent,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  constructor(
      private readonly localStorageService: LocalStorageService,
      private readonly apiService: ApiService,
      private readonly router: Router
  ) {}

  public async connect(): Promise<void> {
    const result = await this.apiService.login(
        <string> this.loginForm.value.email,
        <string> this.loginForm.value.password
    );

    this.localStorageService.addJwtToken(result.value);

    const resultUser = await this.apiService.getUser(<string> this.localStorageService.getJwtToken());

    this.localStorageService.addCurrentRole(resultUser.role);

    await this.router.navigate(['/home']);
  }
}
