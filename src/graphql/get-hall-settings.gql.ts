import {gql, Query} from 'apollo-angular';
import {Injectable} from '@angular/core';
import {HallModel} from '../models/hall.model';

export interface Response {
    halls: HallModel[];
}

@Injectable({
    providedIn: 'root',
})
export class GetHallSettingsGql extends Query<Response> {
    document = gql`
      query GetHallSettings($cinemaId: Int!) {
        halls(cinemaId: $cinemaId) {
          id
          number
          currentShowtime {
            id
            startTime
            endTime
            movie {
              id
              title
            }
          }
        }
      }
    `;
}
