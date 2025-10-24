import {Injectable} from "@angular/core";
import {MovieModel} from "../models/movie.model";
import {ShowtimeModel} from "../models/showtime.model";
import {CategoryModel} from '../models/category.model';
import {RatingModel} from "../models/rating.model";

@Injectable({
    providedIn: 'root'
})
export class MovieFactory {

    public create(
      id: number,
      favorite: boolean,
      title: string,
      description: string,
      imageUrl: string,
      minimumAge: number,
      showtimes: ShowtimeModel[],
      ratings: RatingModel[],
      category: CategoryModel
    ): MovieModel {
        return new MovieModel(id, favorite, title, description, imageUrl, minimumAge, showtimes, ratings, category);
    }

}
