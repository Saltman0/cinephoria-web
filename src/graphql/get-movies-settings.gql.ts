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
export class GetMoviesSettingsGql extends Query<Response> {
    document = gql`
      query GetMoviesSettings {
        movies {
          id
          imageURL
          favorite
          title
          minimumAge
          showtimes {
            id
            price
            startTime
            endTime
          }
        }
      }
    `;
}
