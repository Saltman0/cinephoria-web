import {Injectable} from "@angular/core";
import {BookingModel} from '../models/booking.model';
import {ShowtimeModel} from '../models/showtime.model';
import {MovieModel} from '../models/movie.model';

@Injectable({
    providedIn: 'root'
})
export class BookingRenderer {

    public async render(booking: BookingModel) {

      const showtime: ShowtimeModel = booking.showtime;
      const movie: MovieModel = showtime.movie;

      const movieTitle: string = movie.title;
      const movieImage: string = movie.imageURL;

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
          id: booking.id,
          movieTitle: movieTitle,
          movieImage: movieImage,
          showtimeDate: day + "/" + month + "/" + year,
          hours: startHour + "h" + startMinute + "-" + endHour + "h" + endMinute,
          numberOfSeats: booking.bookingSeats.length + "place(s)"
        }
    }

}
