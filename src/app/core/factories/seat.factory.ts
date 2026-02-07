import { Injectable } from "@angular/core";
import { BookingSeatModel } from "../models/bookingSeat.model";
import { SeatModel } from "../models/seat.model";
import {HallModel} from '../models/hall.model';

@Injectable({
    providedIn: 'root'
})
export class SeatFactory {

    public create(id: number, row: string, number: number, hall: HallModel, bookingSeats: BookingSeatModel[]): SeatModel {
        return new SeatModel(id, row, number, hall, bookingSeats);
    }

}
