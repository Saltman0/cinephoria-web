import {BookingModel} from './booking.model';

export class UserModel {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: string;
    bookings: BookingModel[];

    constructor(id: number, email: string, password: string, firstName: string, lastName: string, phoneNumber: string, role: string, bookings: BookingModel[]) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.bookings = bookings;
    }
}
