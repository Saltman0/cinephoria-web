import {Component, ViewChild} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {HeaderComponent} from '../header/header.component';
import {ApiService} from '../../services/api/api.service';
import {FooterComponent} from '../footer/footer.component';
import {NgOptimizedImage} from '@angular/common';
import {BookingModel} from '../../models/booking.model';
import {ReactiveFormsModule} from '@angular/forms';
import {BookingRenderer} from '../../renderers/booking.renderer';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';
import {CinemaModel} from '../../models/cinema.model';
import {LocalStorageService} from "../../services/local-storage/local-storage.service";
import {AddRatingDialogComponent} from "../add-rating-dialog/add-rating-dialog.component";

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
    private readonly apiService: ApiService,
    private readonly localStorageService: LocalStorageService
  ) {}

  async ngOnInit(): Promise<void> {
    this.selectedUserId = JSON.parse(<string> this.localStorageService.getCurrentUser()).id;
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

    const userId: number = jwtDecode<{id: number}>(<string> this.localStorageService.getJwtToken()).id;
    const bookings: BookingModel[] = await this.apiService.getBookings(userId, null);

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
