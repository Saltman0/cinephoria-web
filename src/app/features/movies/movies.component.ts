import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HeaderComponent} from '../../shared/header/header.component';
import {FooterComponent} from '../../shared/footer/footer.component';
import {NgOptimizedImage} from '@angular/common';
import {CinemaModel} from '../../core/models/cinema.model';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CategoryModel} from "../../core/models/category.model";
import {MovieRenderer} from "../../core/renderers/movie.renderer";
import {MovieModel} from "../../core/models/movie.model";
import {MovieApiService} from "../../core/services/api/movie.api.service";
import {InfrastructureApiService} from "../../core/services/api/infrastructure.api.service";

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

  selectedCinemaId: number|null = null;
  selectedCategoryId: number|null = null;
  selectedShowtimeDateStart: Date|null = null;
  selectedShowtimeDateEnd: Date|null = null;

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
      private readonly infrastructureApiService: InfrastructureApiService,
      private readonly movieApiService: MovieApiService,
      private readonly movieRenderer: MovieRenderer,
      private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadCinemas();
    await this.loadCategories();
    await this.loadMoviesAndShowtimes();
  }

  public async loadCinemas(): Promise<void> {
    const cinemas: CinemaModel[] = await this.infrastructureApiService.getCinemas();

    for (const cinema of cinemas) {
      this.cinemaList.push(this.movieRenderer.renderCinema(cinema));
    }
  }

  public async loadCategories(): Promise<void> {
    const categories: CategoryModel[] = await this.movieApiService.getCategories();

    for (const category of categories) {
      this.categoryList.push(this.movieRenderer.renderCategory(category));
    }
  }

  public async loadMoviesAndShowtimes(): Promise<void> {
    this.resetMovieList();
    this.resetShowtimeList();
    this.resetSelectedMovie();

    this.isMovieListLoading = true;

    const movies: MovieModel[] = await this.movieApiService.getMoviesGql(
        this.selectedCategoryId !== null ? Number(this.selectedCategoryId) : null,
        this.selectedShowtimeDateStart,
        this.selectedShowtimeDateEnd,
        this.selectedCinemaId !== null ? Number(this.selectedCinemaId) : null,
    );

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

  public redirectToBookingPage(selectedMovieId: number, selectedShowtimeId: number): void {
    this.router.navigate(['/booking'], {
      queryParams: {
        cinemaId: this.selectedCinemaId,
        movieId: selectedMovieId,
        showtimeId: selectedShowtimeId
      }
    });
  }

  public selectCinemaId(event: Event): void {
    this.selectedCinemaId = <number><unknown>(event.target as HTMLInputElement).value;
  }

  public selectCategoryId(event: Event): void {
    this.selectedCategoryId = <number><unknown>(event.target as HTMLInputElement).value;
  }

  public selectShowtimeDateStart(event: Event): void {
    this.selectedShowtimeDateStart = <Date><unknown>(event.target as HTMLInputElement).value;
  }

  public selectShowtimeDateEnd(event: Event): void {
    this.selectedShowtimeDateEnd = <Date><unknown>(event.target as HTMLInputElement).value;
  }

  private resetMovieList(): void {
    this.movieList = [];
  }

  private resetShowtimeList(): void {
    this.showtimeList = [];
  }

  private resetSelectedMovie(): void {
    this.selectedMovie = null;
  }
}
