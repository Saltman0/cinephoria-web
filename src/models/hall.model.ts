import { ShowtimeModel } from "./showtime.model";

export class HallModel {
    id: number;
    number: number;
    showtime: ShowtimeModel;

    constructor(id: number, number: number, showtime: ShowtimeModel) {
        this.id = id;
        this.number = number;
        this.showtime = showtime;
    }
}
