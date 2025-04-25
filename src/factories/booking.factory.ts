import { Injectable } from "@angular/core";
import { ShowtimeModel } from "../models/showtime.model";
import { BookingModel } from "../models/booking.model";
import { BookingSeatModel } from "../models/bookingSeat.model";

@Injectable({
    providedIn: 'root'
})
export class BookingFactory {

    public create(id: number, qrCode: string, showtime: ShowtimeModel, bookingSeats: BookingSeatModel[]): BookingModel {
        return new BookingModel(id, qrCode, showtime, bookingSeats);
    }

}
