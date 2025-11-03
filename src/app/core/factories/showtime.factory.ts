import {Injectable} from "@angular/core";
import {MovieModel} from "../models/movie.model";
import {ShowtimeModel} from "../models/showtime.model";
import {HallModel} from "../models/hall.model";
import {BookingModel} from "../models/booking.model";

@Injectable({
    providedIn: 'root'
})
export class ShowtimeFactory {

    public create(id: number, startTime: Date, endTime: Date, price: number,
                  movie: MovieModel, hall: HallModel, bookings: BookingModel[]): ShowtimeModel {
        return new ShowtimeModel(id, startTime, endTime, price, movie, hall, bookings);
    }

}
