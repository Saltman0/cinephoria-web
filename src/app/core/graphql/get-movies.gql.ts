import {gql, Query} from 'apollo-angular';
import {Injectable} from '@angular/core';
import {MovieModel} from "../models/movie.model";
import {RatingModel} from "../models/rating.model";
import {ShowtimeModel} from "../models/showtime.model";
import {HallModel} from "../models/hall.model";

export interface Response {
    movies: MovieModel[];
    ratings: RatingModel[];
    showtimes: ShowtimeModel[];
    hall: HallModel;
}

@Injectable({
    providedIn: 'root',
})
export class GetMoviesGql extends Query<Response> {
    document = gql`
        query GetMovies($categoryId: Int, $startDate: String, $endDate: String, $cinemaId: Int) {
            movies(categoryId: $categoryId) {
                id
                favorite
                title
                description
                imageURL
                minimumAge
                ratings {
                    id
                    number
                }
                showtimes(startDate: $startDate, endDate: $endDate) {
                    id
                    startTime
                    endTime
                    hall(cinemaId: $cinemaId) {
                        id
                    }
                }
            }
        }
    `;
}
