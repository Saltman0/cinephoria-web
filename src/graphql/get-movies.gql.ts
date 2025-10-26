import {gql, Query} from 'apollo-angular';
import {Injectable} from '@angular/core';
import {MovieModel} from "../models/movie.model";
import {RatingModel} from "../models/rating.model";
import {ShowtimeModel} from "../models/showtime.model";

export interface Response {
    movies: MovieModel[];
    ratings: RatingModel[];
    showtimes: ShowtimeModel[];
}

@Injectable({
    providedIn: 'root',
})
export class GetMoviesGql extends Query<Response> {
    document = gql`
        query GetMovies {
            movies {
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
                showtimes {
                    id
                    startTime
                    endTime
                }
            }
        }

    `;
}
