import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {ApiService} from '../../services/api/api.service';
import {FooterComponent} from '../footer/footer.component';
import {NgOptimizedImage} from '@angular/common';
import {BookingModel} from '../../models/booking.model';
import {ReactiveFormsModule} from '@angular/forms';
import {BookingRenderer} from '../../renderers/booking.renderer';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FooterComponent,
    NgOptimizedImage,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  bookingList: {
    id: number,
    movieTitle: string,
    movieImage: string,
    showtimeDate: string,
    hours: string,
    numberOfSeats: string
  }[] = [];

  constructor(
    private readonly bookingRenderer: BookingRenderer,
    private readonly apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    const bookings: BookingModel[] = await this.apiService.getBookings(1);

    for (const booking of bookings) {
      this.bookingList.push(await this.bookingRenderer.render(booking));
    }
  }
}
