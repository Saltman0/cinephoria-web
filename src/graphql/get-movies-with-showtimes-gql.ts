import {gql, Query} from 'apollo-angular';
import {Injectable} from '@angular/core';
import {MovieModel} from '../models/movie.model';
import {ShowtimeModel} from '../models/showtime.model';

export interface Response {
    movies: MovieModel[];
    showtimes: ShowtimeModel[];
}

@Injectable({
    providedIn: 'root',
})
export class GetMoviesWithShowtimesGql extends Query<Response> {
    document = gql`
      query GetMovieShowtimeSettings {
        movies {
          id
          favorite
          imageURL
          minimumAge
          title
          showtimes {
            id
            startTime
            endTime
            hall {
              number
            }
          }
        }
      }
    `;
}
