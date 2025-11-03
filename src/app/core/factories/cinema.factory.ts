import {Injectable} from "@angular/core";
import {CinemaModel} from '../models/cinema.model';
import {HallModel} from '../models/hall.model';

@Injectable({
    providedIn: 'root'
})
export class CinemaFactory {

    public create(id: number, name: string, address: string, postalCode: number, city: string, phoneNumber: string,
                  openHour: string, closeHour: string, halls: HallModel[]): CinemaModel {
        return new CinemaModel(id, name, address, postalCode, city, phoneNumber, openHour, closeHour, halls);
    }

}
