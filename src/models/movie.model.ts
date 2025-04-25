import { ShowtimeModel } from "./showtime.model";

export class MovieModel {
    id: number|null;
    title: string;
    imageUrl: string;
    showtime: ShowtimeModel;

    constructor(id: number|null, title: string, imageUrl: string, showtime: ShowtimeModel) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.showtime = showtime;
    }
}
