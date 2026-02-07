import { gql, Query } from 'apollo-angular';
import { Injectable } from '@angular/core';
import {CinemaModel} from '../models/cinema.model';

export interface Response {
    cinemas: CinemaModel[];
}

@Injectable({
    providedIn: 'root',
})
export class GetCinemasGql extends Query<Response> {
    document = gql`
      query GetCinemas {
        cinemas {
          id
          name
          address
          postalCode
          city
          phoneNumber
          openHour
          closeHour
        }
      }
    `;
}
