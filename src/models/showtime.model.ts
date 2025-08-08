import {MovieModel} from "./movie.model";
import {HallModel} from "./hall.model";
import {BookingModel} from "./booking.model";

export class ShowtimeModel {
    id: number;
    startTime: Date;
    endTime: Date;
    movie: MovieModel;
    hall: HallModel;
    bookings: BookingModel[];

    constructor(id: number, movie: MovieModel, startTime: Date, endTime: Date, hall: HallModel, bookings: BookingModel[]) {
        this.id = id;
        this.movie = movie;
        this.startTime = startTime;
        this.endTime = endTime;
        this.hall = hall;
        this.bookings = bookings;
    }
}
