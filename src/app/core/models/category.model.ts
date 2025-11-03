import {MovieModel} from './movie.model';

export class CategoryModel {
  id: number;
  name: string;
  movies: MovieModel[];

  constructor(id: number, name: string, movies: MovieModel[]) {
    this.id = id;
    this.name = name;
    this.movies = movies;
  }
}
