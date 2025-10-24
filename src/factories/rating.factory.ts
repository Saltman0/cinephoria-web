import {Injectable} from "@angular/core";
import {RatingModel} from '../models/rating.model';
import {MovieModel} from "../models/movie.model";
import {UserModel} from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class RatingFactory {

    public create(
      id: number,
      number: number,
      description: string,
      validated: boolean,
      movie: MovieModel,
      user: UserModel
    ): RatingModel {
        return new RatingModel(id, number, description, validated, movie, user);
    }

}
