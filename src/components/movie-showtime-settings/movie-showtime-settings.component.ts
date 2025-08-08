import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {ApiService} from '../../services/api/api.service';
import {FooterComponent} from '../footer/footer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MovieModel} from '../../models/movie.model';
import {MovieShowtimeSettingsRenderer} from '../../renderers/movie-showtime-settings.renderer';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-movie-showtime-settings',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    NgOptimizedImage,
    NgOptimizedImage
  ],
  templateUrl: './movie-showtime-settings.component.html',
  styleUrl: './movie-showtime-settings.component.scss'
})
export class MovieShowtimeSettingsComponent {
  movieList: {
    id: number,
    favorite: boolean,
    imageUrl: string,
    minimumAge: number,
    title: string
  }[] = [];

  showtimeList: {
    id: number,
    date: string,
    hours: string,
    hallNumber: number
  }[] = [];

  constructor(
    private readonly movieShowtimeSettingsRenderer: MovieShowtimeSettingsRenderer,
    private readonly localStorageService: LocalStorageService,
    private readonly apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    const jwtToken = await this.apiService.login(
      "baudoin.mathieu@protonmail.com", "0123456789"
    );

    this.localStorageService.addJwtToken(jwtToken.value);

    const moviesWithShowtimes: MovieModel[] = await this.apiService.getMoviesWithShowtimes();

    for (const movieWithShowtimes of moviesWithShowtimes) {

      this.movieList.push(await this.movieShowtimeSettingsRenderer.renderMovie(movieWithShowtimes));

      for (const showtime of movieWithShowtimes.showtimes) {
        this.showtimeList.push(await this.movieShowtimeSettingsRenderer.renderShowtime(showtime));
      }

    }
  }

  editShowtime(showtimeId: number) {
    //this.router.navigate([`/booking-detail/${bookingId}`]);
  }

  deleteShowtime(showtimeId: number) {
    //this.router.navigate([`/booking-detail/${bookingId}`]);
  }
}
