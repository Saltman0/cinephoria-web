import {gql, Query} from 'apollo-angular';
import {Injectable} from '@angular/core';
import {BookingModel} from "../models/booking.model";

export interface Response {
    bookings: BookingModel[];
}

@Injectable({
    providedIn: 'root',
})
export class GetBookedSeatsGql extends Query<Response> {
    document = gql`
      query GetBookedSeats($showtimeId: Int, $userId: Int) {
        bookings(showtimeId: $showtimeId, userId: $userId) {
          id
          bookingSeats {
            id
            seat {
              id
              row
              number
            }
          }
        }
      }
    `;
}
