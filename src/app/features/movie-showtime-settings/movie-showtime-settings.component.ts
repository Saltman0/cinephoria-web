import {Component, ViewChild} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {ApiService} from '../../core/services/api/api.service';
import {FooterComponent} from '../../shared/footer/footer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MovieModel} from '../../core/models/movie.model';
import {MovieShowtimeSettingsRenderer} from '../../core/renderers/movie-showtime-settings.renderer';
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {NgOptimizedImage} from '@angular/common';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';
import {ShowtimeModel} from '../../core/models/showtime.model';
import {DeleteMovieDialogComponent} from '../delete-movie-dialog/delete-movie-dialog.component';
import {DeleteShowtimeDialogComponent} from '../delete-showtime-dialog/delete-showtime-dialog.component';
import {AddMovieDialogComponent} from "../add-movie-dialog/add-movie-dialog.component";
import {UpdateMovieDialogComponent} from "../update-movie-dialog/update-movie-dialog.component";
import {AddShowtimeDialogComponent} from "../add-showtime-dialog/add-showtime-dialog.component";
import {UpdateShowtimeDialogComponent} from "../update-showtime-dialog/update-showtime-dialog.component";

@Component({
  selector: 'app-movie-showtime-settings',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    NgOptimizedImage,
    NgOptimizedImage,
    NavMobileComponent,
    DeleteMovieDialogComponent,
    DeleteShowtimeDialogComponent,
    AddMovieDialogComponent,
    UpdateMovieDialogComponent,
    AddShowtimeDialogComponent,
    UpdateShowtimeDialogComponent
  ],
  templateUrl: './movie-showtime-settings.component.html',
  styleUrl: './movie-showtime-settings.component.scss'
})
export class MovieShowtimeSettingsComponent {
  stars: number[] = [0, 1, 2, 3, 4];

  movieList: {
    id: number,
    categoryId: number,
    imageURL: string,
    favorite: boolean,
    title: string,
    description: string,
    nbShowtimes: number,
    minimumAge: number|null,
    // TODO rating
  }[] = [];

  showtimeList: {
    id: number,
    date: string,
    startTime: Date,
    endTime: Date,
    hours: string,
    hallId: number,
    hallNumber: number,
    movieId: number,
    price: number
  }[] = [];

  isMovieListLoading: boolean = false;
  isShowtimeListLoading: boolean = false;

  selectedMovieId: number = 0;
  selectedShowtimeId: number = 0;

  @ViewChild(AddMovieDialogComponent) addMovieDialog!: AddMovieDialogComponent;
  @ViewChild(UpdateMovieDialogComponent) updateMovieDialog!: UpdateMovieDialogComponent;
  @ViewChild(DeleteMovieDialogComponent) deleteMovieDialog!: DeleteMovieDialogComponent;
  @ViewChild(AddShowtimeDialogComponent) addShowtimeDialog!: AddShowtimeDialogComponent;
  @ViewChild(UpdateShowtimeDialogComponent) updateShowtimeDialog!: UpdateShowtimeDialogComponent;
  @ViewChild(DeleteShowtimeDialogComponent) deleteShowtimeDialog!: DeleteShowtimeDialogComponent;

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

    const moviesWithShowtimes: MovieModel[] = await this.apiService.getMoviesWithShowtimes();

    for (const movieWithShowtimes of moviesWithShowtimes) {
      this.movieList.push(await this.movieShowtimeSettingsRenderer.renderMovie(movieWithShowtimes));
    }

    this.isMovieListLoading = false;
  }

  public async loadShowtimeList(movieId: number): Promise<void> {
    this.resetShowtimeList();

    this.isShowtimeListLoading = true;

    const showtimes: ShowtimeModel[] = await this.apiService.getShowtimes(movieId);

    for (const showtime of showtimes) {
      this.showtimeList.push(await this.movieShowtimeSettingsRenderer.renderShowtime(showtime));
    }

    this.isShowtimeListLoading = false;
  }

  public openAddMovieDialog() {
    this.addMovieDialog.showAddMovieDialog();
  }

  public openUpdateMovieDialog(
      movieId: number,
      categoryId: number,
      title: string,
      description: string,
      minimumAge: number|null,
      favorite: boolean,
      imageURL: string
  ): void {
    this.updateMovieDialog.showUpdateMovieDialog(
        movieId,
        categoryId,
        title,
        description,
        minimumAge,
        favorite,
        imageURL
    );
  }

  public openDeleteMovieDialog(movieId: number) {
    this.selectedMovieId = movieId;
    this.deleteMovieDialog.showDeleteMovieDialog();
  }

  public openAddShowtimeDialog() {
    this.addShowtimeDialog.showAddShowtimeDialog();
  }

  public openUpdateShowtimeDialog(
      showtimeId: number,
      movieId: number,
      hallId: number,
      startTime: Date,
      endTime: Date,
      price: number
  ) {
    this.selectedShowtimeId = showtimeId;
    this.updateShowtimeDialog.showUpdateShowtimeDialog(
        showtimeId,
        movieId,
        hallId,
        startTime.toString(),
        endTime.toString(),
        price
    );
  }

  public openDeleteShowtimeDialog(showtimeId: number, movieId: number): void {
    this.selectedShowtimeId = showtimeId;
    this.selectedMovieId = movieId;
    this.deleteShowtimeDialog.showDeleteMovieDialog();
  }

  private resetMovieList(): void {
    this.movieList = [];
  }

  private resetShowtimeList(): void {
    this.showtimeList = [];
  }
}
