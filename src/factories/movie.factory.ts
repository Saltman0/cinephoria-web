import { Injectable } from "@angular/core";
import { MovieModel } from "../models/movie.model";
import { ShowtimeModel } from "../models/showtime.model";

@Injectable({
    providedIn: 'root'
})
export class MovieFactory {

    public create(id: number|null, title: string, imageUrl: string, showtime: ShowtimeModel): MovieModel {
        return new MovieModel(id, title, imageUrl, showtime);
    }

}
