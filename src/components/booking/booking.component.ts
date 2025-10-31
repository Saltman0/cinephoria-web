import {Component, ViewChild} from '@angular/core';
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
import {ActivatedRoute, Router} from "@angular/router";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";
import {PaymentDialogComponent} from "../payment-dialog/payment-dialog.component";

@Component({
  selector: 'app-booking',
  imports: [
    HeaderComponent,
    FooterComponent,
    NgOptimizedImage,
    NavMobileComponent,
    PaymentDialogComponent
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

  @ViewChild(PaymentDialogComponent) paymentDialog!: PaymentDialogComponent;

  constructor(private readonly apiService: ApiService,
              private readonly seatService: SeatService,
              private readonly localStorageService: LocalStorageService,
              private readonly bookingRenderer: BookingRenderer,
              private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    let cinemaId: number = this.activatedRoute.snapshot.queryParams['cinemaId'];
    let movieId: number = this.activatedRoute.snapshot.queryParams['movieId'];
    let showtimeId: number = this.activatedRoute.snapshot.queryParams['showtimeId'];

    await this.loadCinemas();
    if (cinemaId && movieId && showtimeId) {
      cinemaId = Number(cinemaId);
      movieId = Number(movieId);
      showtimeId = Number(showtimeId);

      await this.loadMovies();
      await this.loadShowtimes(movieId);
      const selectedShowtime = this.showtimeList.find(
          showtime => showtime.id === showtimeId
      );
      await this.loadSeats(
          <number> selectedShowtime?.hallId,
          <number> selectedShowtime?.price,
          <number> selectedShowtime?.id
      );
    }
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
    await this.paymentDialog.showPaymentDialog(this.totalPrice);
  }

  public async confirmBooking() {
    let seatIds: number[] = [];
    this.selectedSeatList.forEach(selectedSeat => {
      seatIds.push(selectedSeat.id);
    });

    await this.apiService.createBooking(
        <string> this.localStorageService.getJwtToken(),
        JSON.parse(<string> this.localStorageService.getCurrentUser()).id,
        this.selectedShowtime.id,
        seatIds
    );

    await this.router.navigate(['/order']);
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
