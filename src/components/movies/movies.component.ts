import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HeaderComponent} from '../header/header.component';
import {ApiService} from '../../services/api/api.service';
import {FooterComponent} from '../footer/footer.component';
import {NgOptimizedImage} from '@angular/common';
import {CinemaModel} from '../../models/cinema.model';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CategoryModel} from "../../models/category.model";
import {MovieRenderer} from "../../renderers/movie.renderer";
import {MovieModel} from "../../models/movie.model";

@Component({
  selector: 'app-booking',
  imports: [
    HeaderComponent,
    FooterComponent,
    NgOptimizedImage,
    NavMobileComponent,
    ReactiveFormsModule
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  cinemaList: { id: number; name: string; }[] = [];
  categoryList: { id: number; name: string; }[] = [];
  movieList: {
    id: number,
    favorite: boolean,
    title: string,
    description: string,
    imageURL: string,
    minimumAge: number,
    averageRating: number
  }[] = [];
  showtimeList: { [movieId: number]: {id: number, date: string, hours: string}[] } = {};

  selectedCinemaId!: number;
  selectedMovie: {
    id: number,
    favorite: boolean,
    title: string,
    description: string,
    imageURL: string,
    minimumAge: number,
    averageRating: number
  }|null = null;
  selectedShowtimes: { [movieId: number]: {id: number, date: string, hours: string}[] } = {};


  isMovieListLoading: boolean = false;

  constructor(
      private readonly apiService: ApiService,
      private readonly movieRenderer: MovieRenderer,
      private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadCinemas();
    await this.loadCategories();
  }

  public async loadCinemas(): Promise<void> {
    const cinemas: CinemaModel[] = await this.apiService.getCinemas();

    for (const cinema of cinemas) {
      this.cinemaList.push(this.movieRenderer.renderCinema(cinema));
    }
  }

  public async loadCategories(): Promise<void> {
    const categories: CategoryModel[] = await this.apiService.getCategories();

    for (const category of categories) {
      this.categoryList.push(this.movieRenderer.renderCategory(category));
    }
  }

  public async loadMoviesAndShowtimes(event: Event): Promise<void> {
    const cinemaId: number = <number><unknown>(event.target as HTMLInputElement).value;

    this.selectedCinemaId = <number><unknown> cinemaId;
    this.resetMovieList();
    this.resetShowtimeList();

    this.isMovieListLoading = true;

    const movies: MovieModel[] = await this.apiService.getMoviesGql();

    for (const movie of movies) {
      this.movieList.push(this.movieRenderer.renderMovie(movie));

      this.showtimeList[movie.id] = [];
      for (const showtime of movie.showtimes) {
        this.showtimeList[movie.id].push(this.movieRenderer.renderShowtime(showtime));
      }
    }

    this.isMovieListLoading = false;
  }

  public displayMovieDetails(
    id: number,
    favorite: boolean,
    title: string,
    description: string,
    imageURL: string,
    minimumAge: number,
    averageRating: number
  ) {
    this.selectedMovie = {
      id: id,
      favorite: favorite,
      title: title,
      description: description,
      imageURL: imageURL,
      minimumAge: minimumAge,
      averageRating: averageRating,
    };

    this.selectedShowtimes[id] = this.showtimeList[id];
  }

  public redirectToBookingPage(
      selectedCinemaId: number,
      selectedMovieId: number,
      selectedShowtimeId: number
  ): void {
    this.router.navigate(['/booking'], {
      queryParams: {
        cinemaId: selectedCinemaId,
        movieId: selectedMovieId,
        showtimeId: selectedShowtimeId
      }
    });
  }

  private resetMovieList(): void {
    this.movieList = [];
  }

  private resetShowtimeList(): void {
    this.showtimeList = [];
  }
}
