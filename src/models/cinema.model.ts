import {HallModel} from './hall.model';

export class CinemaModel {
    id: number;
    name: string;
    address: string;
    postalCode: number;
    city: string;
    phoneNumber: string;
    openHour: string;
    closeHour: string;
    halls: HallModel[];

  constructor(id: number, name: string, address: string, postalCode: number, city: string, phoneNumber: string,
              openHour: string, closeHour: string, halls: HallModel[]) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.postalCode = postalCode;
    this.city = city;
    this.phoneNumber = phoneNumber;
    this.openHour = openHour;
    this.closeHour = closeHour;
    this.halls = halls;
  }
}
