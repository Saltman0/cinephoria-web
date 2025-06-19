import { ShowtimeModel } from "./showtime.model";
import { BookingSeatModel } from "./bookingSeat.model";

export class BookingModel {
    id: number;
    showtime: ShowtimeModel;
    bookingSeats: BookingSeatModel[];

    constructor(id: number, showtime: ShowtimeModel, bookingSeats: BookingSeatModel[]) {
        this.id = id;
        this.showtime = showtime;
        this.bookingSeats = bookingSeats;
    }
}
