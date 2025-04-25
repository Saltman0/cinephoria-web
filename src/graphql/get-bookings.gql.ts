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
      query GetBookings($userId: Int!) {
        bookings(userId: $userId) {
          id
          qrCode
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
          bookingSeats {
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
