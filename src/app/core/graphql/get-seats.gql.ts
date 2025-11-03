import {gql, Query} from 'apollo-angular';
import {Injectable} from '@angular/core';
import {SeatModel} from '../models/seat.model';

export interface Response {
    seats: SeatModel[];
}

@Injectable({
    providedIn: 'root',
})
export class GetSeatsGql extends Query<Response> {
    document = gql`
      query GetSeats($hallId: Int) {
        seats(hallId: $hallId) {
          id
          row
          number
        }
      }
    `;
}
