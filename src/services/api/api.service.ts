import {Injectable} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {GetBookingsGql} from "../../graphql/get-bookings.gql";
import {BookingModel} from "../../models/booking.model";
import {MovieModel} from '../../models/movie.model';
import {MovieFactory} from '../../factories/movie.factory';
import {BookingFactory} from '../../factories/booking.factory';
import {UserModel} from '../../models/user.model';
import {GetMoviesWithShowtimesGql} from '../../graphql/get-movies-with-showtimes-gql';
import {ShowtimeModel} from '../../models/showtime.model';
import {ShowtimeFactory} from '../../factories/showtime.factory';
import {HallModel} from '../../models/hall.model';
import {GetHallSettingsGql} from '../../graphql/get-hall-settings.gql';
import {HallFactory} from '../../factories/hall.factory';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://172.18.0.6/';

  constructor(private readonly getMoviesWithShowtimesGQL: GetMoviesWithShowtimesGql,
              private readonly getBookingsGQL: GetBookingsGql,
              private readonly getHallSettingsGql: GetHallSettingsGql,
              private readonly bookingFactory: BookingFactory,
              private readonly movieFactory: MovieFactory,
              private readonly hallFactory: HallFactory,
              private showtimeFactory: ShowtimeFactory) {}

  public async login(email: string, password: string): Promise<any> {
    const response = await fetch(this.apiUrl + "login", {
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
    const response: Response = await fetch(this.apiUrl + `user/${userId}`, {
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
    const response: Response = await fetch(this.apiUrl + `user` + roleQueryParam, {
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

  public async getMoviesWithShowtimes(): Promise<MovieModel[]> {
    let moviesWithShowtimes: MovieModel[] = [];

    let result = await this.getMoviesWithShowtimesGQL.watch().result();

    result.data.movies.forEach((movie: MovieModel) => {

      let showtimes: ShowtimeModel[] = [];
      movie.showtimes.forEach((showtime: ShowtimeModel) => {
        showtimes.push(
          this.showtimeFactory.create(
            showtime.id, movie, showtime.startTime, showtime.endTime, showtime.hall, []
          )
        );
      });

      moviesWithShowtimes.push(
        this.movieFactory.create(
          movie.id, movie.favorite, movie.title, movie.imageURL, movie.minimumAge, showtimes
        )
      );

    });

    return moviesWithShowtimes;
  }

  public async getLastMovies(token: string, limit: number): Promise<MovieModel[]> {
    const response: Response = await fetch(this.apiUrl + `movie/last-movies?limit=${limit}`, {
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

  public async getFavoriteMovies(token: string, limit: number): Promise<MovieModel[]> {
    const response: Response = await fetch(this.apiUrl + `movie/favorite-movies?limit=${limit}`, {
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

  public async getBookings(userId: number): Promise<BookingModel[]> {
    let bookings: BookingModel[] = [];

    let result = await this.getBookingsGQL.watch(
        { userId: userId }
    ).result();

    result.data.bookings.forEach((booking: BookingModel) => {
      bookings.push(this.bookingFactory.create(booking.id, booking.showtime, booking.bookingSeats));
    });

    return bookings;
  }

  public async getHalls(cinemaId: number): Promise<HallModel[]> {
    let halls: HallModel[] = [];

    let result = await this.getHallSettingsGql.watch(
      { cinemaId: cinemaId }
    ).result();

    result.data.halls.forEach((hall: HallModel) => {
      halls.push(this.hallFactory.create(hall.id, hall.number, hall.currentShowtime));
    });

    return halls;
  }
}
