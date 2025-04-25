import { Injectable } from "@angular/core";
import { MovieModel } from "../models/movie.model";
import { ShowtimeModel } from "../models/showtime.model";
import { HallModel } from "../models/hall.model";
import { BookingModel } from "../models/booking.model";

@Injectable({
    providedIn: 'root'
})
export class ShowtimeFactory {

    public create(id: number|null, movie: MovieModel, startTime: Date, endTime: Date, hall: HallModel, booking: BookingModel): ShowtimeModel {
        return new ShowtimeModel(id, movie, startTime, endTime, hall, booking);
    }

}
