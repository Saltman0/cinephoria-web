import {Component} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {FooterComponent} from '../../shared/footer/footer.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';
import {NgOptimizedImage} from '@angular/common';
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {AlertComponent} from "../../shared/alert/alert.component";
import {UserApiService} from "../../core/services/api/user.api.service";

@Component({
  selector: 'app-account-creation',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    NavMobileComponent,
    NgOptimizedImage,
    AlertComponent
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

  type: string|null = null;
  message: string|null = null;

  isCreatingAccount: boolean = false;

  constructor(
      private readonly localStorageService: LocalStorageService,
      private readonly userApiService: UserApiService
  ) {}

  async submit() {
    try {
      this.isCreatingAccount = true;

      await this.userApiService.createUser(
          <string> this.localStorageService.getJwtToken(),
          <string> this.accountCreationForm.value.email,
          <string> this.accountCreationForm.value.password,
          <string> this.accountCreationForm.value.firstName,
          <string> this.accountCreationForm.value.lastName,
          <string> this.accountCreationForm.value.phoneNumber,
          "user"
      );
      this.type = "success";
      this.message = "Le compte a été créé avec succès !";
    } catch (error) {
      this.type = "error";
      this.message = "Une erreur est survenue.";
    } finally {
      this.isCreatingAccount = false;
    }
  }
}
