import { BookingModel } from "./booking.model";
import { SeatModel } from "./seat.model";

export class BookingSeatModel {
    id: number;
    booking: BookingModel;
    seat: SeatModel;

    constructor(id: number, booking: BookingModel, seat: SeatModel) {
        this.id = id;
        this.booking = booking;
        this.seat = seat;
    }
}
