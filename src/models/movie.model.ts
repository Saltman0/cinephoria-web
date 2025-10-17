import {ShowtimeModel} from "./showtime.model";
import {CategoryModel} from './category.model';

export class MovieModel {
    id: number;
    favorite: boolean;
    imageURL: string;
    minimumAge: number;
    title: string;
    showtimes: ShowtimeModel[];
    category: CategoryModel;

    constructor(
      id: number,
      favorite: boolean,
      title: string,
      imageURL: string,
      minimumAge: number,
      showtimes: ShowtimeModel[],
      category: CategoryModel
    ) {
        this.id = id;
        this.favorite = favorite;
        this.imageURL = imageURL;
        this.minimumAge = minimumAge;
        this.title = title;
        this.showtimes = showtimes;
        this.category = category;
    }
}
