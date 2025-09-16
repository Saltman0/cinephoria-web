import { UserModel } from "../models/user.model";
import { Injectable } from "@angular/core";
import {BookingModel} from '../models/booking.model';

@Injectable({
    providedIn: 'root'
})
export class UserFactory {

    public create(id: number, email: string, password: string, firstName: string, lastName: string,
                  phoneNumber: string, role: string, bookings: BookingModel[]): UserModel {
        return new UserModel(id, email, password, firstName, lastName, phoneNumber, role, bookings);
    }

}
