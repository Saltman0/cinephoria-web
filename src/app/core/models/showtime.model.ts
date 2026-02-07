import {MovieModel} from "./movie.model";
import {HallModel} from "./hall.model";
import {BookingModel} from "./booking.model";

export class ShowtimeModel {
    id: number;
    startTime: Date;
    endTime: Date;
    price: number;
    movie: MovieModel;
    hall: HallModel;
    bookings: BookingModel[];

    constructor(id: number, startTime: Date, endTime: Date, price: number,
                movie: MovieModel, hall: HallModel, bookings: BookingModel[]) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.movie = movie;
        this.hall = hall;
        this.bookings = bookings;
    }
}
