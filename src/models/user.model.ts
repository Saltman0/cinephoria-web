export class UserModel {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;

    constructor(id: number, email: string, firstName: string, lastName: string, phoneNumber: string) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }
}
