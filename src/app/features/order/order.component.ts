import {Component, ViewChild} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {HeaderComponent} from '../../shared/header/header.component';
import {FooterComponent} from '../../shared/footer/footer.component';
import {NgOptimizedImage} from '@angular/common';
import {BookingModel} from '../../core/models/booking.model';
import {ReactiveFormsModule} from '@angular/forms';
import {BookingRenderer} from '../../core/renderers/booking.renderer';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';
import {CinemaModel} from '../../core/models/cinema.model';
import {LocalStorageService} from "../../core/services/local-storage/local-storage.service";
import {AddRatingDialogComponent} from "../add-rating-dialog/add-rating-dialog.component";
import {BookingApiService} from "../../core/services/api/booking.api.service";
import {InfrastructureApiService} from "../../core/services/api/infrastructure.api.service";

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FooterComponent,
    NgOptimizedImage,
    NgOptimizedImage,
    ReactiveFormsModule,
    NavMobileComponent,
    AddRatingDialogComponent
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  cinemaList: { id: number; name: string; }[] = [];

  bookingList: {
    id: number,
    movieId: number,
    movieTitle: string,
    movieImage: string,
    showtimeDate: string,
    hours: string,
    numberOfSeats: string
  }[] = [];

  isBookingListLoading: boolean = false;

  selectedMovieId!: number;
  selectedUserId!: number;

  @ViewChild(AddRatingDialogComponent) addRatingDialog!: AddRatingDialogComponent;

  constructor(
    private readonly bookingRenderer: BookingRenderer,
    private readonly bookingApiService: BookingApiService,
    private readonly infrastructureApiService: InfrastructureApiService,
    private readonly localStorageService: LocalStorageService
  ) {}

  async ngOnInit(): Promise<void> {
    this.selectedUserId = JSON.parse(<string> this.localStorageService.getCurrentUser()).id;
    await this.loadCinemas();
  }

  public async loadCinemas(): Promise<void> {
    const cinemas: CinemaModel[] = await this.infrastructureApiService.getCinemas();

    this.cinemaList = [];
    for (const cinema of cinemas) {
      this.cinemaList.push(this.bookingRenderer.renderCinema(cinema));
    }
  }

  public async loadBookings(): Promise<void> {
    this.isBookingListLoading = true;

    this.resetBookings();

    const userId: number = jwtDecode<{id: number}>(<string> this.localStorageService.getJwtToken()).id;
    const bookings: BookingModel[] = await this.bookingApiService.getBookings(userId, null);

    for (const booking of bookings) {
      this.bookingList.push(await this.bookingRenderer.renderBooking(booking));
    }

    this.isBookingListLoading = false;
  }

  public openAddRatingDialog(movieId: number) {
    this.selectedMovieId = movieId;
    this.addRatingDialog.showAddRatingDialog();
  }

  private resetBookings(): void {
    this.bookingList = [];
  }
}
