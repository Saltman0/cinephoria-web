import {Injectable} from "@angular/core";
import {MovieModel} from "../models/movie.model";
import {ShowtimeModel} from "../models/showtime.model";

@Injectable({
    providedIn: 'root'
})
export class MovieFactory {

    public create(id: number, favorite: boolean, title: string, imageUrl: string, minimumAge: number, showtimes: ShowtimeModel[]): MovieModel {
        return new MovieModel(id, favorite, title, imageUrl, minimumAge, showtimes);
    }

}
