import {Injectable} from "@angular/core";
import {MovieModel} from "../models/movie.model";
import {ShowtimeModel} from "../models/showtime.model";
import {CategoryModel} from '../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class MovieFactory {

    public create(
      id: number,
      favorite: boolean,
      title: string,
      imageUrl: string,
      minimumAge: number,
      showtimes: ShowtimeModel[],
      category: CategoryModel
    ): MovieModel {
        return new MovieModel(id, favorite, title, imageUrl, minimumAge, showtimes, category);
    }

}
