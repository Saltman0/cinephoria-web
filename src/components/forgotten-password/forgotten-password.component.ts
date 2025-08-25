import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-contact',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.scss'
})
export class ForgottenPasswordComponent {
  contactForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email])
  });

  constructor(private readonly apiService: ApiService) {}

  async submit() {
    await this.apiService.sendMail(
      <string> this.contactForm.value.email,
      "Cinéphoria - Réinitialisation de mot de passe",
      "Votre mot de passe a été réinitialisé ! Veuillez modifier votre mot de passe vers le lien suivante : ajoutez le lien"
    );
  }
}
