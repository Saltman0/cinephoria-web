import { BookingSeatModel } from "./bookingSeat.model";

export class SeatModel {
    id: number;
    row: string;
    number: number;
    bookingSeats: BookingSeatModel[];

    constructor(id: number, row: string, number: number, bookingSeats: BookingSeatModel[]) {
        this.id = id;
        this.number = number;
        this.row = row;
        this.bookingSeats = bookingSeats;
    }
}
