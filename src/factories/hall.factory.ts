import {Injectable} from "@angular/core";
import {ShowtimeModel} from "../models/showtime.model";
import {HallModel} from "../models/hall.model";
import {CinemaModel} from '../models/cinema.model';
import {IncidentModel} from '../../../../Back/CinephoriaGraphQL/src/models';
import {SeatModel} from '../models/seat.model';

@Injectable({
    providedIn: 'root'
})
export class HallFactory {

    public create(id: number, number: number, projectionQuality: string, cinema: CinemaModel,
                  currentShowtime: ShowtimeModel|null, incidents: IncidentModel[], seats: SeatModel[]): HallModel {
        return new HallModel(id, number, projectionQuality, cinema, currentShowtime, incidents, seats);
    }

}
