import {Injectable} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {GetBookingsGql} from "../../graphql/get-bookings.gql";
import {BookingModel} from "../../models/booking.model";
import {MovieModel} from '../../models/movie.model';
import {MovieFactory} from '../../factories/movie.factory';
import {BookingFactory} from '../../factories/booking.factory';
import {UserModel} from '../../models/user.model';
import {GetMoviesSettingsGql} from '../../graphql/get-movies-settings.gql';
import {ShowtimeModel} from '../../models/showtime.model';
import {ShowtimeFactory} from '../../factories/showtime.factory';
import {HallModel} from '../../models/hall.model';
import {GetHallSettingsGql} from '../../graphql/get-hall-settings.gql';
import {HallFactory} from '../../factories/hall.factory';
import {GetShowtimesGql} from '../../graphql/get-showtimes.gql';
import {CinemaModel} from '../../models/cinema.model';
import {CinemaFactory} from '../../factories/cinema.factory';
import {GetCinemasGql} from '../../graphql/get-cinemas.gql';
import {SeatModel} from '../../models/seat.model';
import {GetSeatsGql} from '../../graphql/get-seats.gql';
import {SeatFactory} from '../../factories/seat.factory';
import {GetBookedSeatsGql} from '../../graphql/get-booked-seats.gql';
import {BookingSeatModel} from '../../models/bookingSeat.model';
import {environment} from "../../environments/environment";
import {CategoryModel} from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private bookingApiUrl: string = environment.BOOKING_API_URL;
  private infrastructureApiUrl: string = environment.INFRASTRUCTURE_API_URL;
  private movieApiUrl: string = environment.MOVIE_API_URL;
  private showtimeApiUrl: string = environment.MOVIE_API_URL;
  private userApiUrl: string = environment.USER_API_URL;

  constructor(private readonly getMoviesSettingsGQL: GetMoviesSettingsGql,
              private readonly getBookingsGQL: GetBookingsGql,
              private readonly getShowtimesGQL: GetShowtimesGql,
              private readonly getHallSettingsGql: GetHallSettingsGql,
              private readonly getCinemasGql: GetCinemasGql,
              private readonly getSeatsGql: GetSeatsGql,
              private readonly getBookedSeatsGql: GetBookedSeatsGql,
              private readonly bookingFactory: BookingFactory,
              private readonly movieFactory: MovieFactory,
              private readonly cinemaFactory: CinemaFactory,
              private readonly hallFactory: HallFactory,
              private readonly seatFactory: SeatFactory,
              private showtimeFactory: ShowtimeFactory) {}

  public async login(email: string, password: string): Promise<any> {
    const response = await fetch(this.userApiUrl + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: email, password: password})
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getUser(token: string) {
    const userId: number = jwtDecode<{id: number}>(token).id;
    const response: Response = await fetch(this.userApiUrl + `user/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  /**
   * Retourne les utilisateurs
   * @param token
   * @param role
   */
  public async getUsers(token: string, role: string|null): Promise<UserModel[]> {
    let roleQueryParam: string|null = null;
    if (role !== null) {
      roleQueryParam = "?role=" + role;
    }
    const response: Response = await fetch(this.userApiUrl + `user` + roleQueryParam, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async deleteUser(token: string, userId: number) {
    const response: Response = await fetch(this.userApiUrl + `user/${encodeURIComponent(userId)}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getCategories(): Promise<CategoryModel[]> {
    const response: Response = await fetch(this.movieApiUrl + `category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getMoviesWithShowtimes(): Promise<MovieModel[]> {
    let moviesWithShowtimes: MovieModel[] = [];

    let result = await this.getMoviesSettingsGQL.watch({fetchPolicy: "network-only"}).result();

    result.data.movies.forEach((movie: MovieModel): void => {

      moviesWithShowtimes.push(
        this.movieFactory.create(movie.id,
          movie.favorite,
          movie.title,
          movie.description,
          movie.imageURL,
          movie.minimumAge,
          movie.showtimes,
          movie.category
        )
      );

    });

    return moviesWithShowtimes;
  }

  public async getMovies(): Promise<MovieModel[]> {
    const response: Response = await fetch(this.movieApiUrl + `movie`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  /**
   * Return the last movies from the cinema
   * @param limit
   */
  public async getLastMovies(limit: number): Promise<MovieModel[]> {
    const response: Response = await fetch(this.movieApiUrl + `movie/last-movies?limit=${encodeURIComponent(limit)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  /**
   * Return the favorite movies from the cinema
   * @param limit
   */
  public async getFavoriteMovies(limit: number): Promise<MovieModel[]> {
    const response: Response = await fetch(this.movieApiUrl + `movie/favorite-movies?limit=${encodeURIComponent(limit)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async deleteMovie(token: string, movieId: number) {
    const response: Response = await fetch(this.movieApiUrl + `movie/${encodeURIComponent(movieId)}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async createMovie(
    token: string,
    title: string,
    description: string,
    minimumAge: number|null,
    favorite: boolean,
    imageURL: string,
    categoryId: number
  ): Promise<any> {
    const response: Response = await fetch(this.movieApiUrl + "movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "title": title,
        "description": description,
        "minimumAge": minimumAge,
        "favorite": favorite,
        "imageURL": imageURL,
        "categoryId": categoryId
      })
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async updateMovie(
      token: string,
      movieId: number,
      title: string,
      description: string,
      minimumAge: number|null,
      favorite: boolean,
      imageURL: string,
      categoryId: number
  ): Promise<any> {
    const response: Response = await fetch(this.movieApiUrl + `movie/${encodeURIComponent(movieId)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "title": title,
        "description": description,
        "minimumAge": minimumAge,
        "favorite": favorite,
        "imageURL": imageURL,
        "categoryId": categoryId
      })
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getBookings(userId: number|null, showtimeId: number|null): Promise<BookingModel[]> {
    let bookings: BookingModel[] = [];

    let result = await this.getBookingsGQL.watch(
        { userId: userId, showtimeId: showtimeId }
    ).result();

    result.data.bookings.forEach((booking: BookingModel) => {
      bookings.push(
        this.bookingFactory.create(booking.id, booking.qrCode, booking.user, booking.showtime, booking.bookingSeats)
      );
    });

    return bookings;
  }

  public async getShowtimes(movieId: number): Promise<ShowtimeModel[]> {
    let showtimes: ShowtimeModel[] = [];

    let result = await this.getShowtimesGQL.watch(
      { movieId: movieId }, { fetchPolicy: "network-only" }
    ).result();

    result.data.showtimes.forEach((showtime: ShowtimeModel) => {
      showtimes.push(
        this.showtimeFactory.create(
          showtime.id, showtime.startTime, showtime.endTime, showtime.price,
          showtime.movie, showtime.hall, showtime.bookings
        )
      );
    });

    return showtimes;
  }

  public async createShowtime(
      token: string,
      movieId: number,
      hallId: number,
      startTime: string,
      endTime: string,
      price: number
  ): Promise<any> {
    const response: Response = await fetch(this.showtimeApiUrl + "showtime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "movieId": movieId,
        "hallId": hallId,
        "startTime": startTime,
        "endTime": endTime,
        "price": price
      })
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async deleteShowtime(token: string, showtimeId: number) {
    const response: Response = await fetch(this.showtimeApiUrl + `showtime/${encodeURIComponent(showtimeId)}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getCinemas(): Promise<CinemaModel[]> {
    let cinemas: CinemaModel[] = [];

    let result = await this.getCinemasGql.watch().result();

    result.data.cinemas.forEach((cinema: CinemaModel) => {
      cinemas.push(
        this.cinemaFactory.create(
          cinema.id, cinema.name, cinema.address, cinema.postalCode, cinema.city, cinema.phoneNumber,
          cinema.openHour, cinema.closeHour, cinema.halls
        )
      );
    });

    return cinemas;
  }

  public async createHall(token: string, number: number, projectionQuality: string, cinemaId: number): Promise<any> {
    const response: Response = await fetch(this.infrastructureApiUrl + "hall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "number": number,
        "projectionQuality": projectionQuality,
        "cinemaId": cinemaId
      })
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async updateHall(
    token: string,
    hallId: number,
    number: number,
    projectionQuality: string,
    cinemaId: number
  ): Promise<any> {
    const response: Response = await fetch(this.infrastructureApiUrl + `hall/${encodeURIComponent(hallId)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "number": number,
        "projectionQuality": projectionQuality,
        "cinemaId": cinemaId
      })
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getHalls(cinemaId: number): Promise<HallModel[]> {
    let halls: HallModel[] = [];

    let result = await this.getHallSettingsGql.watch(
      {cinemaId: cinemaId},
      {fetchPolicy: "network-only"}
    ).result();

    result.data.halls.forEach((hall: HallModel) => {
      halls.push(
        this.hallFactory.create(
          hall.id, hall.number, hall.projectionQuality, hall.cinema, hall.currentShowtime, hall.incidents, hall.seats
        )
      );
    });

    return halls;
  }

  public async deleteHall(token: string, hallId: number): Promise<any> {
    const response: Response = await fetch(this.infrastructureApiUrl + `hall/${encodeURIComponent(hallId)}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async createSeat(token: string, row: string, number: number, hallId: number): Promise<any> {
    const response: Response = await fetch(this.infrastructureApiUrl + "seat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "row": row,
        "number": number,
        "hallId": hallId
      })
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getSeats(hallId: number): Promise<SeatModel[]> {
    let seats: SeatModel[] = [];

    let result = await this.getSeatsGql.watch(
      { hallId: hallId }
    ).result();

    result.data.seats.forEach((seat: SeatModel) => {
      seats.push(this.seatFactory.create(seat.id, seat.row, seat.number, seat.hall, seat.bookingSeats));
    });

    return seats;
  }

  public async deleteSeat(token: string, seatId: number): Promise<any> {
    const response: Response = await fetch(this.infrastructureApiUrl + `seat/${encodeURIComponent(seatId)}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getBookedSeats(showtimeId: number, userId: number|null): Promise<SeatModel[]> {
    let seats: SeatModel[] = [];

    let result = await this.getBookedSeatsGql.watch(
      { showtimeId: showtimeId, userId: userId }
    ).result();

    result.data.bookings.forEach((booking: BookingModel) => {

      booking.bookingSeats.forEach((bookingSeat: BookingSeatModel) => {

        const seat: SeatModel = bookingSeat.seat;
        seats.push(this.seatFactory.create(seat.id, seat.row, seat.number, seat.hall, seat.bookingSeats));

      });

    });

    return seats;
  }

  public async sendMail(email: string, title: string, description: string): Promise<any> {
    const response: Response = await fetch("https://formspree.io/f/xjkojppa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: email, title: title, description: description})
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async createUser(
    token: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    role: string
  ): Promise<any> {
    const response: Response = await fetch(this.userApiUrl + "user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "phoneNumber": phoneNumber,
        "role": role
      })
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async updateUser(
    employeeId: number,
    token: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    role: string
  ): Promise<any> {
    const response: Response = await fetch(this.userApiUrl + `user/${encodeURIComponent(employeeId)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "phoneNumber": phoneNumber,
        "role": role
      })
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async createBooking(token: string, userId: number, showtimeId: number, seatIds: number[]): Promise<any> {
    const response: Response = await fetch(this.bookingApiUrl + "booking", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "userId": userId,
        "showtimeId": showtimeId,
        "seats": seatIds
      })
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }
}
