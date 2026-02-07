import {Component} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {MovieModel} from '../../core/models/movie.model';
import {FooterComponent} from '../../shared/footer/footer.component';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';
import {MovieListComponent} from '../../shared/movieList/movieList.component';
import {MovieApiService} from "../../core/services/api/movie.api.service";

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FooterComponent,
    NavMobileComponent,
    MovieListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  firstName: string = "Mathieu";
  lastName: string = "Baudoin";

  lastMovies: MovieModel[] = [];
  favoriteMovies: MovieModel[] = [];

  constructor(private readonly movieApiService: MovieApiService) {}

  async ngOnInit(): Promise<void> {
    this.lastMovies = await this.movieApiService.getLastMovies(7);
    this.favoriteMovies = await this.movieApiService.getFavoriteMovies(7);
  }
}
