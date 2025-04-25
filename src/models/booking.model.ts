import { ShowtimeModel } from "./showtime.model";
import { BookingSeatModel } from "./bookingSeat.model";

export class BookingModel {
    id: number;
    qrCode: string;
    showtime: ShowtimeModel;
    bookingSeats: BookingSeatModel[];

    constructor(id: number, qrCode: string, showtime: ShowtimeModel, bookingSeats: BookingSeatModel[]) {
        this.id = id;
        this.qrCode = qrCode;
        this.showtime = showtime;
        this.bookingSeats = bookingSeats;
    }
}
