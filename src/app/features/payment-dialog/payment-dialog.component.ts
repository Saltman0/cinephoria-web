import {Component, ElementRef, output, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from "../../core/services/api/api.service";
import {LocalStorageService} from "../../core/services/local-storage/local-storage.service";
import {loadStripe, Stripe, StripeCardElement} from "@stripe/stripe-js";

@Component({
  selector: 'app-payment-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './payment-dialog.component.html',
  styleUrl: './payment-dialog.component.scss'
})
export class PaymentDialogComponent {
  isPaymentLoading: boolean = false;

  stripe: Stripe|null = null;
  card: StripeCardElement|null = null;
  cardMounted: boolean = false;
  clientSecret: string = "";
  price: number = 0;

  readonly paymentDoneEvent = output<boolean>();

  @ViewChild('paymentDialog') paymentDialog!: ElementRef<HTMLDialogElement>;

  constructor(
      private readonly localStorageService: LocalStorageService,
      private readonly apiService: ApiService
  ) {}

  public async loadPaymentIntent() {
    const response: { clientSecret: string } = await this.apiService.createPayment(
        <string> this.localStorageService.getJwtToken(),
        this.price * 100
    );

    this.clientSecret = response.clientSecret;

    this.stripe = await loadStripe('pk_test_51S6v16J3IMiRJKOkuChheWglwomFsJOpq9w8UdX1Un5jzrtqyBkgMpTVPWEVWjo4oZ43syrdpwuIa8LUvsZbvKw500HorZ8gVl');

    const clientSecret: string = this.clientSecret;
    const elements = this.stripe!.elements({
      clientSecret,
      appearance: { theme: 'night' }
    });
    this.card = elements.create('card', {
      style: {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': { color: '#a0aec0' },
        },
        invalid: { color: '#e53e3e', iconColor: '#e53e3e' },
      },
    });
    this.card.mount('#card-element');
    this.cardMounted = true;
  }

  public async pay() {
    this.isPaymentLoading = true;
    if (!this.stripe || !this.card || !this.clientSecret) return;

    const result = await this.stripe.confirmCardPayment(this.clientSecret, {
      payment_method: {
        card: this.card
      },
    });

    if (result.error) {
      this.paymentDoneEvent.emit(false);
    } else if (result.paymentIntent.status === 'succeeded') {
      this.paymentDoneEvent.emit(true);
    }

    this.isPaymentLoading = false;
    this.closePaymentDialog();
  }

  public async showPaymentDialog(price: number): Promise<void> {
    this.paymentDialog.nativeElement.showModal();
    this.price = price;
    await this.loadPaymentIntent();
  }

  public closePaymentDialog(): void {
    this.paymentDialog.nativeElement.close();
  }
}
