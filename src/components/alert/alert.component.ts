import {Component, Input} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-alert',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() type!: string;
  @Input() message!: string;
}
