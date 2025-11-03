import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService} from '../../core/services/api/api.service';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-forgotten-password',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    NavMobileComponent,
    NgOptimizedImage
  ],
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.scss'
})
export class ForgottenPasswordComponent {
  forgottenPasswordForm = new FormGroup({
    email: new FormControl(
      "",
      [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)]
    ),
  });

  constructor(private readonly apiService: ApiService) {}

  public async submit() {
    await this.apiService.sendMail(
      <string> this.forgottenPasswordForm.value.email,
      "Cinéphoria - Réinitialisation de mot de passe",
      "Votre mot de passe a été réinitialisé ! " +
      "Veuillez modifier votre mot de passe vers le lien suivant : lien"
    );
  }
}
