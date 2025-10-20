import {ShowtimeModel} from "./showtime.model";
import {CinemaModel} from './cinema.model';
import {SeatModel} from './seat.model';
import {IncidentModel} from "./incident.model";

export class HallModel {
    id: number;
    number: number;
    projectionQuality: string;
    cinema: CinemaModel;
    currentShowtime: ShowtimeModel|null;
    incidents: IncidentModel[];
    seats: SeatModel[];

    constructor(id: number, number: number, projectionQuality: string, cinema: CinemaModel,
                currentShowtime: ShowtimeModel|null, incidents: IncidentModel[], seats: SeatModel[]) {
        this.id = id;
        this.number = number;
        this.projectionQuality = projectionQuality;
        this.cinema = cinema;
        this.currentShowtime = currentShowtime;
        this.incidents = incidents;
        this.seats = seats;
    }
}
