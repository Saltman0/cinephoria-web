import { gql, Query } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { BookingModel } from "../models/booking.model";

export interface Response {
    bookings: BookingModel[];
}

@Injectable({
    providedIn: 'root',
})
export class GetBookingsGql extends Query<Response> {
    document = gql`
      query GetBookings($userId: Int, $showtimeId: Int) {
        bookings(userId: $userId, showtimeId: $showtimeId) {
          id
          bookingSeats {
            id
            seat {
              id
              row
              number
            }
          }
          showtime {
            id
            startTime
            endTime
            movie {
              id
              title
              imageURL
            }
            hall {
              id
              number
            }
          }
        }
      }
    `;
}
