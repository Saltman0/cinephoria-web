import { Injectable } from "@angular/core";
import { BookingModel } from "../models/booking.model";
import { BookingSeatModel } from "../models/bookingSeat.model";
import { SeatModel } from "../models/seat.model";

@Injectable({
    providedIn: 'root'
})
export class BookingSeatFactory {

    public create(id: number, booking: BookingModel, seat: SeatModel): BookingSeatModel {
        return new BookingSeatModel(id, booking, seat);
    }

}
