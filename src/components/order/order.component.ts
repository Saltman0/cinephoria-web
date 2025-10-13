import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {ApiService} from '../../services/api/api.service';
import {FooterComponent} from '../footer/footer.component';
import {NgOptimizedImage} from '@angular/common';
import {BookingModel} from '../../models/booking.model';
import {ReactiveFormsModule} from '@angular/forms';
import {BookingRenderer} from '../../renderers/booking.renderer';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';
import {CinemaModel} from '../../models/cinema.model';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FooterComponent,
    NgOptimizedImage,
    NgOptimizedImage,
    ReactiveFormsModule,
    NavMobileComponent
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  cinemaList: { id: number; name: string; }[] = [];

  bookingList: {
    id: number,
    movieTitle: string,
    movieImage: string,
    showtimeDate: string,
    hours: string,
    numberOfSeats: string
  }[] = [];

  isBookingListLoading: boolean = false;

  constructor(
    private readonly bookingRenderer: BookingRenderer,
    private readonly apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    await this.loadCinemas();
  }

  public async loadCinemas(): Promise<void> {
    const cinemas: CinemaModel[] = await this.apiService.getCinemas();

    this.cinemaList = [];
    for (const cinema of cinemas) {
      this.cinemaList.push(this.bookingRenderer.renderCinema(cinema));
    }
  }

  public async loadBookings(): Promise<void> {
    this.isBookingListLoading = true;

    this.resetBookings();

    const bookings: BookingModel[] = await this.apiService.getBookings(1, null);

    for (const booking of bookings) {
      this.bookingList.push(await this.bookingRenderer.render(booking));
    }

    this.isBookingListLoading = false;
  }

  private resetBookings(): void {
    this.bookingList = [];
  }
}
