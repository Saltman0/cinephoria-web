import {Injectable} from "@angular/core";
import {ShowtimeModel} from '../models/showtime.model';
import {MovieModel} from '../models/movie.model';
import {HallModel} from '../models/hall.model';
import {CinemaModel} from '../models/cinema.model';
import {SeatModel} from '../models/seat.model';

@Injectable({
  providedIn: 'root'
})
export class HallSettingsRenderer {

  public async renderHall(hall: HallModel, cinemaId: number) {

    const currentShowtime: ShowtimeModel|null = hall.currentShowtime;
    let currentMovieTitle: string|null = null;
    let currentMovieImage: string|null = null;
    let startHour: string|null = null;
    let startMinute: string|null = null;
    let endHour: string|null = null;
    let endMinute: string|null = null;
    let hours: string|null = null;

    if (currentShowtime !== null) {

      const currentMovie: MovieModel = currentShowtime.movie;
      currentMovieTitle = currentMovie.title;
      currentMovieImage = currentMovie.imageURL

      const startTime: Date = new Date(currentShowtime.startTime);
      const endTime: Date = new Date(currentShowtime.endTime);
      startHour = startTime.getHours().toString().padStart(2, "0");
      startMinute = startTime.getMinutes().toString().padStart(2, "0");
      endHour = endTime.getHours().toString().padStart(2, "0");
      endMinute = endTime.getMinutes().toString().padStart(2, "0");
      hours = startHour + "h" + startMinute + "-" + endHour + "h" + endMinute;

    }

    const seats: SeatModel[] = hall.seats;

    return {
      id: hall.id,
      cinemaId: cinemaId,
      number: hall.number,
      projectionQuality: hall.projectionQuality,
      nbRows: new Set(seats.map(seat => seat.row)).size,
      nbSeats: new Set(seats.map(seat => seat.number)).size,
      movieTitle: currentMovieTitle,
      movieImage: currentMovieImage,
      hours: hours
    }
  }

  public renderCinema(cinema: CinemaModel) {
    return {
      id: cinema.id,
      name: cinema.name
    }
  }

}
