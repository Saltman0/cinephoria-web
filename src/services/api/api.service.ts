import {Injectable} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {GetBookingsGql} from "../../graphql/get-bookings.gql";
import {BookingModel} from "../../models/booking.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MovieModel} from '../../models/movie.model';
import {MovieFactory} from '../../factories/movie.factory';
import {GetMoviesGql} from '../../graphql/get-movies.gql';
import {BookingFactory} from '../../factories/booking.factory';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://172.18.0.6/';

  constructor(private readonly getMoviesGQL: GetMoviesGql, private readonly getBookingsGQL: GetBookingsGql,
              private readonly bookingFactory: BookingFactory, private readonly movieFactory: MovieFactory,
              private readonly httpClient: HttpClient) {}

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

  public login2(email: string, password: string) {
    const url = this.apiUrl + 'login';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email:email, password:password };

    return this.httpClient.post(url, body, { headers }).subscribe(
      res => {
        console.log(res);
      });
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

  public async getMovies(userId: number) {

    let movies: MovieModel[] = [];

    let result = await this.getMoviesGQL.watch(
      { userId: userId }
    ).result();

    result.data.movies.forEach((movie: MovieModel) => {
      movies.push(this.movieFactory.create(movie.id, movie.title, movie.imageUrl, movie.showtime));
    });

    return movies;
  }

  public async getBookings(userId: number) {

    let bookings: BookingModel[] = [];

    let result = await this.getBookingsGQL.watch(
        { userId: userId }
    ).result();

    result.data.bookings.forEach((booking: BookingModel) => {
      bookings.push(this.bookingFactory.create(booking.id, booking.qrCode, booking.showtime, booking.bookingSeats));
    });

    return bookings;
  }
}
