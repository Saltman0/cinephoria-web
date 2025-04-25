import { gql, Query } from 'apollo-angular';
import { Injectable } from '@angular/core';
import {MovieModel} from '../models/movie.model';

export interface Response {
  movies: MovieModel[];
}

@Injectable({
  providedIn: 'root',
})
export class GetMoviesGql extends Query<Response> {
  document = gql`
    query GetMovies($userId: Int!) {
      movies(userId: $userId) {
        id
      }
    }
  `;
}
