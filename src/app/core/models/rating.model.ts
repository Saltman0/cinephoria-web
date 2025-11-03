import {MovieModel} from './movie.model';
import {UserModel} from './user.model';

export class RatingModel {
  id: number;
  number: number;
  description: string;
  validated: boolean;
  movie: MovieModel;
  user: UserModel;

  constructor(id: number, number: number, description: string, validated: boolean, movie: MovieModel, user: UserModel) {
    this.id = id;
    this.number = number;
    this.description = description;
    this.validated = validated;
    this.movie = movie;
    this.user = user;
  }
}
