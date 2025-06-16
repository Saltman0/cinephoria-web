import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {Router} from '@angular/router';
import {MovieModel} from '../../models/movie.model';
import {ApiService} from '../../services/api/api.service';
import {FooterComponent} from '../footer/footer.component';
import {NgOptimizedImage} from '@angular/common';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FooterComponent,
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

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly localStorageService: LocalStorageService) {}

  async ngOnInit(): Promise<void> {
    this.lastMovies = await this.apiService.getLastMovies(this.localStorageService.getJwtToken(), 7);
    this.favoriteMovies = await this.apiService.getFavoriteMovies(this.localStorageService.getJwtToken(), 7);
    console.log(this.favoriteMovies);
  }
}
