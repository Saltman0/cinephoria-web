import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {ApiService} from '../../services/api/api.service';
import {FooterComponent} from '../footer/footer.component';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {NgOptimizedImage} from '@angular/common';
import {MovieModel} from '../../models/movie.model';

@Component({
  selector: 'app-hall-settings',
  imports: [
    HeaderComponent,
    FooterComponent,
    NgOptimizedImage
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  cinemaList: {
    id: number,
    name: string
  }[] = [];

  movieList: {
    id: number,
    name: string,
    imageURL: string
  }[] = [];

  constructor(private readonly localStorageService: LocalStorageService,
              private readonly apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    const jwtToken = await this.apiService.login(
      "baudoin.mathieu@protonmail.com", "0123456789"
    );

    this.localStorageService.addJwtToken(jwtToken.value);

    const movies: MovieModel[] = await this.apiService.getMovies(jwtToken);

    console.log(movies);

    /*const halls: HallModel[] = await this.apiService.getHalls(1);

    for (const hall of halls) {
      this.hallList.push(await this.hallSettingsRenderer.render(hall));
    }*/
  }

  public loadMovies(cinemaId: number) {
    console.log('loadMovies');
  }
}
