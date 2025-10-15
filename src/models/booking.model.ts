import {ShowtimeModel} from "./showtime.model";
import {BookingSeatModel} from "./bookingSeat.model";
import {UserModel} from './user.model';

export class BookingModel {
    id: number;
    qrCode: string;
    user: UserModel;
    showtime: ShowtimeModel;
    bookingSeats: BookingSeatModel[];

    constructor(id: number, qrCode: string, user: UserModel, showtime: ShowtimeModel, bookingSeats: BookingSeatModel[]) {
        this.id = id;
        this.qrCode = qrCode;
        this.user = user;
        this.showtime = showtime;
        this.bookingSeats = bookingSeats;
    }
}
