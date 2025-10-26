import {Injectable} from "@angular/core";
import {CinemaModel} from "../models/cinema.model";
import {MovieModel} from "../models/movie.model";
import {RatingModel} from "../models/rating.model";
import {CategoryModel} from "../models/category.model";
import {ShowtimeModel} from "../models/showtime.model";

@Injectable({
    providedIn: 'root'
})
export class MovieRenderer {
    public renderCinema(cinema: CinemaModel) {
        return {
            id: cinema.id,
            name: cinema.name
        }
    }

    public renderCategory(category: CategoryModel) {
        return {
            id: category.id,
            name: category.name
        }
    }

    public renderMovie(movie: MovieModel) {
        const ratings: RatingModel[] = movie.ratings;
        const ratingsLength: number = ratings.length;

        let averageRating: number = 0;
        if (ratingsLength > 0) {
            averageRating = ratings.reduce(
                (sum: number, rating: RatingModel) => sum + rating.number, 0
            ) / ratingsLength;
        }

        return {
            id: movie.id,
            favorite: movie.favorite,
            title: movie.title,
            description: movie.description,
            imageURL: movie.imageURL,
            minimumAge: movie.minimumAge,
            averageRating: averageRating
        }
    }

    public renderShowtime(showtime: ShowtimeModel) {
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
            hours: startHour + "h" + startMinute + " - " + endHour + "h" + endMinute
        }
    }
}