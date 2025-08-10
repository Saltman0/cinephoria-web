import {ShowtimeModel} from "./showtime.model";

export class HallModel {
    id: number;
    number: number;
    currentShowtime: ShowtimeModel|null;

    constructor(id: number, number: number, currentShowtime: ShowtimeModel|null) {
        this.id = id;
        this.number = number;
        this.currentShowtime = currentShowtime;
    }
}
