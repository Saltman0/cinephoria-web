import {Injectable} from '@angular/core';
import {SeatModel} from '../../models/seat.model';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor() {}

  public groupSeatsByRow(seats: SeatModel[]) {
    return seats.reduce((acc, seat) => {
      let group = acc.find(g => g.row === seat.row);
      if (!group) {
        group = {row: seat.row, seats: []};
        acc.push(group);
      }
      group.seats.push(seat);
      return acc;
    }, [] as { row: string; seats: { id: number; row: string; number: number }[] }[]);
  }
}
