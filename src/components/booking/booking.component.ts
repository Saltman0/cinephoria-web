import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {ApiService} from '../../services/api/api.service';
import {FooterComponent} from '../footer/footer.component';
import {NgOptimizedImage} from '@angular/common';
import {CinemaModel} from '../../models/cinema.model';
import {ShowtimeModel} from '../../models/showtime.model';
import {BookingRenderer} from '../../renderers/booking.renderer';
import {MovieModel} from '../../models/movie.model';
import {SeatModel} from '../../models/seat.model';
import {SeatService} from '../../services/seat/seat.service';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';

@Component({
  selector: 'app-booking',
  imports: [
    HeaderComponent,
    FooterComponent,
    NgOptimizedImage,
    NavMobileComponent
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  cinemaList: { id: number; name: string; }[] = [];

  movieList: { id: number; title: string; imageURL: string; }[] = [];

  showtimeList: {
    id: number;
    showtimeDate: string;
    hours: string;
    price: number;
    hallId: number;
    hallNumber: number;
    projectionQuality: string|null;
  }[] = [];

  seatList: { row: string; seats: { id: number; row: string; number: number; }[] }[] = [];
  alreadyBookedSeatList: { id: number; row: string; number: number; }[] = [];
  selectedSeatList: { id: number; row: string; number: number; }[] = [];

  selectedShowtime: { id: number; price: number; } = {id: 0, price: 0};

  totalPrice: number = 0;

  isMovieListLoading: boolean = false;
  isShowtimeListLoading: boolean = false;
  isSeatListLoading: boolean = false;

  constructor(private readonly apiService: ApiService,
              private readonly seatService: SeatService,
              private readonly bookingRenderer: BookingRenderer) {}

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

  public async loadMovies(): Promise<void> {
    this.resetMovies();
    this.resetShowtimes();
    this.resetSeats();

    this.isMovieListLoading = true;
    this.isShowtimeListLoading = false;
    this.isSeatListLoading = false;
    const movies: MovieModel[] = await this.apiService.getMovies();

    for (const movie of movies) {
      this.movieList.push(this.bookingRenderer.renderMovie(movie));
    }
  }

  public async loadShowtimes(movieId: number): Promise<void> {
    this.resetSeats();
    this.resetShowtimes();

    this.isShowtimeListLoading = true;
    this.isSeatListLoading = false;
    const showtimes: ShowtimeModel[] = await this.apiService.getShowtimes(movieId);

    for (const showtime of showtimes) {
      this.showtimeList.push(this.bookingRenderer.renderShowtime(showtime));
    }
  }

  public async loadSeats(hallId: number, price: number, showtimeId: number): Promise<void> {
    this.resetSeats();
    this.resetTotalPrice();

    this.isSeatListLoading = true;

    this.selectedShowtime.id = showtimeId;
    this.selectedShowtime.price = price;

    const seats: SeatModel[] = await this.apiService.getSeats(hallId);
    const alreadyBookedSeatList: SeatModel[] = await this.apiService.getBookedSeats(
      showtimeId, null
    );

    this.seatList = this.seatService.groupSeatsByRow(seats);

    for (const alreadyBookedSeat of alreadyBookedSeatList) {
      this.alreadyBookedSeatList.push(this.bookingRenderer.renderSeat(alreadyBookedSeat));
    }
  }

  public selectSeat(seatId: number, seatRow: string, seatNumber: number): void {
    if (this.isSelected(seatId)) {
      this.selectedSeatList = this.selectedSeatList.filter(seat => seat.id !== seatId);
      this.totalPrice -= this.selectedShowtime.price;
    } else {
      this.selectedSeatList.push({id: seatId, row: seatRow, number: seatNumber});
      this.totalPrice += this.selectedShowtime.price;
    }
  }

  public isSelected(seatId: number): boolean {
    return this.selectedSeatList.some(seat => seat.id === seatId);
  }

  public isAlreadyBooked(seatId: number) {
    return this.alreadyBookedSeatList.some(
      alreadyBookedSeat => alreadyBookedSeat.id === seatId
    );
  }

  public async book(): Promise<void> {
    // TODO Effectuer le paiement

    let seatIds: number[] = [];
    this.selectedSeatList.forEach(selectedSeat => {
      seatIds.push(selectedSeat.id);
    });

    // TODO Modifier le user ID par celui de l'utilisateur connecté
    await this.apiService.createBooking('tokenAInserer', 1, this.selectedShowtime.id, seatIds);

    // TODO Lorsque c'est fini, afficher un message pour dire que c'est ok et recharger la page
  }

  private resetMovies(): void {
    this.movieList = [];
  }

  private resetShowtimes(): void {
    this.showtimeList = [];
  }

  private resetSeats(): void {
    this.seatList = [];
    this.alreadyBookedSeatList = [];
    this.selectedSeatList = [];
  }

  private resetTotalPrice(): void {
    this.totalPrice = 0;
  }
}
