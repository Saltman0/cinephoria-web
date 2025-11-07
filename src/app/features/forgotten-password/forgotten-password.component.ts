import {Component} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {FooterComponent} from '../../shared/footer/footer.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';
import {NgOptimizedImage} from '@angular/common';
import {AlertComponent} from "../../shared/alert/alert.component";
import {UserApiService} from "../../core/services/api/user.api.service";
import {MailApiService} from "../../core/services/api/mail.api.service";

@Component({
  selector: 'app-forgotten-password',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    NavMobileComponent,
    NgOptimizedImage,
    AlertComponent
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

  type: string|null = null;
  message: string|null = null;

  isSendingMail: boolean = false;

  constructor(private readonly userApiService: UserApiService, private readonly mailApiService: MailApiService) {}

  public async sendResetPasswordLink() {
    this.type = this.message = null;
    this.isSendingMail = true;

    const email: string = <string> this.forgottenPasswordForm.value.email;

    try {
      const resetPasswordLink = await this.userApiService.forgotPassword(email);

      await this.mailApiService.sendForgotPasswordMail(
          <string> this.forgottenPasswordForm.value.email,
          "Cinéphoria - Réinitialisation de mot de passe",
          "Votre mot de passe a été réinitialisé ! " +
          `Veuillez modifier votre mot de passe vers le lien suivant : ${resetPasswordLink}`
      );

      this.type = "success";
      this.message = "Vous avez reçu un mail de réinitialisation de mot de passe.";
    } catch (error) {
      this.type = "error";
      this.message = "Une erreur est survenue.";
    } finally {
      this.isSendingMail = false;
    }



  }
}
