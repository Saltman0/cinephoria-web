import { Injectable } from "@angular/core";
import { BookingSeatModel } from "../models/bookingSeat.model";
import { SeatModel } from "../models/seat.model";

@Injectable({
    providedIn: 'root'
})
export class SeatFactory {

    public create(id: number, row: string, number: number, bookingSeats: BookingSeatModel[]): SeatModel {
        return new SeatModel(id, row, number, bookingSeats);
    }

}
