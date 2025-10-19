import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService} from '../../services/api/api.service';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';
import {NgOptimizedImage} from '@angular/common';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-account-creation',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    NavMobileComponent,
    NgOptimizedImage
  ],
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.scss'
})
export class AccountCreationComponent {
  accountCreationForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl(
      "",
      [Validators.required, Validators.pattern("^\\+?[0-9]{1,3}([-\\s]?[0-9]{1,4}){2,4}$\n")]
    )
  });

  constructor(private readonly localStorageService: LocalStorageService, private readonly apiService: ApiService) {}

  async submit() {
    await this.apiService.createUser(
      <string> this.localStorageService.getJwtToken(),
      <string> this.accountCreationForm.value.email,
      <string> this.accountCreationForm.value.password,
      <string> this.accountCreationForm.value.firstName,
      <string> this.accountCreationForm.value.lastName,
      <string> this.accountCreationForm.value.phoneNumber,
      "user"
    );
  }
}
