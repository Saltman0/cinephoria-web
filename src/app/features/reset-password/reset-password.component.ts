import {Component} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {FooterComponent} from '../../shared/footer/footer.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService} from '../../core/services/api/api.service';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';
import {NgOptimizedImage} from '@angular/common';
import {AlertComponent} from "../../shared/alert/alert.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    NavMobileComponent,
    NgOptimizedImage,
    AlertComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  token!: string;

  resetPasswordForm = new FormGroup({
    newPassword: new FormControl(
      "",
      [Validators.required, Validators.minLength(10), Validators.maxLength(64)]
    ),
    confirmPassword: new FormControl(
        "",
        [Validators.required, Validators.minLength(10), Validators.maxLength(64)]
    )
  });

  type: string|null = null;
  message: string|null = null;

  isResettingPassword: boolean = false;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParams['token'];
  }

  public async sendResetPasswordLink() {
    this.type = this.message = null;
    this.isResettingPassword = true;

    const newPassword: string = <string> this.resetPasswordForm.value.newPassword;
    const confirmPassword: string = <string> this.resetPasswordForm.value.confirmPassword;

    try {
      if (newPassword === confirmPassword) {
        await this.apiService.resetPassword(this.token, newPassword);
        this.displayMessage("success", "Votre mot de passe a été modifié avec succès !");
      } else {
        this.displayMessage("error", "Les deux mots de passe ne correspondent pas.");
      }
    } catch (error) {
      this.type = "error";
      this.message = "Une erreur est survenue.";
    } finally {
      this.isResettingPassword = false;
    }
  }

  private displayMessage(type: string, message: string): void {
    this.type = type;
    this.message = message;
  }
}
