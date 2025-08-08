import {Injectable} from "@angular/core";
import {MovieModel} from '../models/movie.model';
import {ShowtimeModel} from '../models/showtime.model';

@Injectable({
    providedIn: 'root'
})
export class MovieShowtimeSettingsRenderer {

  public async renderMovie(movie: MovieModel) {
    return {
      id: movie.id,
      favorite: movie.favorite,
      imageUrl: movie.imageURL,
      minimumAge: movie.minimumAge,
      title: movie.title
    }
  }

  public async renderShowtime(showtime: ShowtimeModel) {

    const startTime = new Date(showtime.startTime);
    const endTime = new Date(showtime.endTime);

    const day: string = startTime.getDate().toString().padStart(2, "0");
    const month: string = (startTime.getMonth() + 1).toString().padStart(2, "0");
    const year: string = startTime.getFullYear().toString().padStart(2, "0");

    const startHour: string = startTime.getHours().toString().padStart(2, "0");
    const startMinute: string = startTime.getMinutes().toString().padStart(2, "0");
    const endHour: string = endTime.getHours().toString().padStart(2, "0");
    const endMinute: string = endTime.getMinutes().toString().padStart(2, "0");

    return {
      id: showtime.id,
      date: day + "/" + month + "/" + year,
      hours: startHour + "h" + startMinute + "-" + endHour + "h" + endMinute,
      hallNumber: showtime.hall.number
    }
  }

}
