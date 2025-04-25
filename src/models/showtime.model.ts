import { MovieModel } from "./movie.model";
import { HallModel } from "./hall.model";
import { BookingModel } from "./booking.model";

export class ShowtimeModel {
    id: number|null;
    startTime: Date;
    endTime: Date;
    movie: MovieModel;
    hall: HallModel;
    booking: BookingModel;

    constructor(id: number|null, movie: MovieModel, startTime: Date, endTime: Date, hall: HallModel, booking: BookingModel) {
        this.id = id;
        this.movie = movie;
        this.startTime = startTime;
        this.endTime = endTime;
        this.hall = hall;
        this.booking = booking;
    }
}
