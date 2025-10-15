import {Component, ViewChild} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {ApiService} from '../../services/api/api.service';
import {FooterComponent} from '../footer/footer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MovieModel} from '../../models/movie.model';
import {MovieShowtimeSettingsRenderer} from '../../renderers/movie-showtime-settings.renderer';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {NgOptimizedImage} from '@angular/common';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';
import {ShowtimeModel} from '../../models/showtime.model';
import {DeleteMovieDialogComponent} from '../delete-movie-dialog/delete-movie-dialog.component';

@Component({
  selector: 'app-movie-showtime-settings',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    NgOptimizedImage,
    NgOptimizedImage,
    NavMobileComponent,
    DeleteMovieDialogComponent
  ],
  templateUrl: './movie-showtime-settings.component.html',
  styleUrl: './movie-showtime-settings.component.scss'
})
export class MovieShowtimeSettingsComponent {
  stars: number[] = [0, 1, 2, 3, 4];

  movieList: {
    id: number,
    imageURL: string,
    favorite: boolean,
    title: string,
    nbShowtimes: number,
    minimumAge: number
    // TODO rating
  }[] = [];

  showtimeList: {
    id: number,
    date: string,
    hours: string,
    hallNumber: number
  }[] = [];

  isMovieListLoading: boolean = false;
  isShowtimeListLoading: boolean = false;

  movieIdToDelete: number = 0;

  @ViewChild(DeleteMovieDialogComponent) deleteMovieDialog!: DeleteMovieDialogComponent;

  constructor(
    private readonly movieShowtimeSettingsRenderer: MovieShowtimeSettingsRenderer,
    private readonly localStorageService: LocalStorageService,
    private readonly apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    await this.loadMovieList();
  }

  public async loadMovieList(): Promise<void> {
    this.resetShowtimeList();
    this.resetMovieList();

    this.isMovieListLoading = true;

    const jwtToken = await this.apiService.login(
      "baudoin.mathieu@protonmail.com", "0123456789"
    );

    this.localStorageService.addJwtToken(jwtToken.value);

    const moviesWithShowtimes: MovieModel[] = await this.apiService.getMoviesWithShowtimes();

    for (const movieWithShowtimes of moviesWithShowtimes) {
      this.movieList.push(await this.movieShowtimeSettingsRenderer.renderMovie(movieWithShowtimes));
    }

    this.isMovieListLoading = false;
  }

  public async loadShowtimeList(movieId: number): Promise<void> {
    this.resetShowtimeList();

    this.isShowtimeListLoading = true;

    const jwtToken = await this.apiService.login(
      "baudoin.mathieu@protonmail.com", "0123456789"
    );

    this.localStorageService.addJwtToken(jwtToken.value);

    const showtimes: ShowtimeModel[] = await this.apiService.getShowtimes(movieId);

    for (const showtime of showtimes) {
      this.showtimeList.push(await this.movieShowtimeSettingsRenderer.renderShowtime(showtime));
    }

    this.isShowtimeListLoading = false;
  }

  public openAddMovieDialog() {

  }

  public openUpdateMovieDialog() {

  }

  public openDeleteMovieDialog(movieId: number) {
    this.movieIdToDelete = movieId;
    this.deleteMovieDialog.showDeleteMovieDialog();
  }

  public openAddShowtimeDialog() {

  }

  public openUpdateShowtimeDialog(showtimeId: number) {

  }

  public openDeleteShowtimeDialog(showtimeId: number) {

  }

  private resetMovieList(): void {
    this.movieList = [];
  }

  private resetShowtimeList(): void {
    this.showtimeList = [];
  }
}
