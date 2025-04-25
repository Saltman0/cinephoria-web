import { Injectable } from "@angular/core";
import { ShowtimeModel } from "../models/showtime.model";
import { HallModel } from "../models/hall.model";

@Injectable({
    providedIn: 'root'
})
export class HallFactory {

    public create(id: number, number: number, showtime: ShowtimeModel): HallModel {
        return new HallModel(id, number, showtime);
    }

}
