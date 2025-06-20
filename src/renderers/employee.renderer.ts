import {Injectable} from "@angular/core";
import {UserModel} from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeRenderer {

    public async render(user: UserModel) {
        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber
        }
    }

}
