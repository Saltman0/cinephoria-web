import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {Router} from '@angular/router';
import {MovieModel} from '../../models/movie.model';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  firstName: string = "Mathieu";
  lastName: string = "Baudoin";

  constructor(private readonly router: Router, private readonly apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    //const movies: MovieModel[] = await this.apiService.getMovies();
  }
}
