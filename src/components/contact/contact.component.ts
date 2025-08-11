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
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm = new FormGroup({
    contactEmail: new FormControl("", [Validators.required, Validators.email]),
    contactTitle: new FormControl("", [Validators.required]),
    contactDescription: new FormControl("", [Validators.required])
  });

  constructor(private readonly apiService: ApiService) {}

  async submit() {
    await this.apiService.sendMail(
      <string> this.contactForm.value.contactEmail,
      <string> this.contactForm.value.contactTitle,
      <string> this.contactForm.value.contactDescription
    );
  }
}
