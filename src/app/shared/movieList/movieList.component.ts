import {Component, Input} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './movieList.component.html',
  styleUrl: './movieList.component.scss'
})
export class MovieListComponent {
  @Input() title!: string;
  @Input() movieList!: {id: number, imageURL: string, title: string}[];
}
