import {Injectable} from "@angular/core";
import {ShowtimeModel} from "../models/showtime.model";
import {BookingModel} from "../models/booking.model";
import {BookingSeatModel} from "../models/bookingSeat.model";
import {UserModel} from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class BookingFactory {

    public create(id: number, qrCode: string, user: UserModel, showtime: ShowtimeModel, bookingSeats: BookingSeatModel[]): BookingModel {
        return new BookingModel(id, qrCode, user, showtime, bookingSeats);
    }

}
