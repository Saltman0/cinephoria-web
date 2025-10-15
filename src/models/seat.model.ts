import { BookingSeatModel } from "./bookingSeat.model";
import {HallModel} from './hall.model';

export class SeatModel {
    id: number;
    row: string;
    number: number;
    hall: HallModel;
    bookingSeats: BookingSeatModel[];

    constructor(id: number, row: string, number: number, hall: HallModel, bookingSeats: BookingSeatModel[]) {
        this.id = id;
        this.number = number;
        this.row = row;
        this.hall = hall;
        this.bookingSeats = bookingSeats;
    }
}
