import {gql, Query} from 'apollo-angular';
import {Injectable} from '@angular/core';
import {ShowtimeModel} from '../models/showtime.model';

export interface Response {
    showtimes: ShowtimeModel[];
}

@Injectable({
    providedIn: 'root',
})
export class GetShowtimesGql extends Query<Response> {
    document = gql`
      query GetShowtimes($movieId: Int) {
        showtimes(movieId: $movieId) {
          id
          startTime
          endTime
          price
          hall {
            id
            number
            projectionQuality
          }
          movie {
            id
          }
        }
      }
    `;
}
