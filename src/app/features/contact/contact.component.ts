import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService} from '../../core/services/api/api.service';
import {HeaderComponent} from '../../shared/header/header.component';
import {FooterComponent} from '../../shared/footer/footer.component';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';
import {AlertComponent} from "../../shared/alert/alert.component";

@Component({
  selector: 'app-contact',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    NavMobileComponent,
    AlertComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm = new FormGroup({
    contactEmail: new FormControl("", [Validators.required, Validators.email]),
    contactTitle: new FormControl("", [Validators.required]),
    contactDescription: new FormControl("", [Validators.required])
  });

  type: string|null = null;
  message: string|null = null;

  isSendingMail: boolean = false;

  constructor(private readonly apiService: ApiService) {}

  async submit() {
    try {
      this.isSendingMail = true;

      await this.apiService.sendMail(
          <string> this.contactForm.value.contactEmail,
          <string> this.contactForm.value.contactTitle,
          <string> this.contactForm.value.contactDescription
      );

      this.type = "success";
      this.message = "Le mail a été envoyé avec succès !";
      this.isSendingMail = false;
    } catch (error) {
      this.isSendingMail = false;
      this.type = "error";
      this.message = "Une erreur est survenue.";
    }
  }
}
