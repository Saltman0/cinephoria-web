import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {MovieModel} from '../../core/models/movie.model';
import {ApiService} from '../../core/services/api/api.service';
import {FooterComponent} from '../footer/footer.component';
import {NgOptimizedImage} from '@angular/common';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FooterComponent,
    NavMobileComponent,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  firstName: string = "Mathieu";
  lastName: string = "Baudoin";

  lastMovies: MovieModel[] = [];
  favoriteMovies: MovieModel[] = [];

  constructor(private readonly apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    this.lastMovies = await this.apiService.getLastMovies(7);
    this.favoriteMovies = await this.apiService.getFavoriteMovies(7);
  }
}
