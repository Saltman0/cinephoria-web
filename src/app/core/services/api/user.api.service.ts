import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";
import {UserModel} from "../../models/user.model";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserApiService {
    constructor(private readonly router: Router) {}

    public async login(email: string, password: string): Promise<any> {
        const response: Response = await fetch(environment.USER_API_URL + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: email, password: password})
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async getUser(token: string) {
        const userId: number = jwtDecode<{ id: number }>(token).id;
        const response: Response = await fetch(environment.USER_API_URL + `user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    /**
     * Retourne les utilisateurs
     * @param role
     */
    public async getUsers(role: string | null): Promise<UserModel[]> {
        let roleQueryParam: string | null = null;
        if (role !== null) {
            roleQueryParam = "?role=" + encodeURIComponent(role);
        }
        const response: Response = await fetch(environment.USER_API_URL + `user` + roleQueryParam, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async createUser(
        token: string,
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        role: string
    ): Promise<any> {
        const response: Response = await fetch(environment.USER_API_URL + "user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
                "phoneNumber": phoneNumber,
                "role": role
            })
        });

        if (!response.ok) {
            if (response.status === 401) {
                this.router.navigate(['/login']);
            }
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async updateUser(
        employeeId: number,
        token: string,
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        role: string
    ): Promise<any> {
        const response: Response = await fetch(environment.USER_API_URL + `user/${encodeURIComponent(employeeId)}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
                "phoneNumber": phoneNumber,
                "role": role
            })
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async deleteUser(token: string, userId: number) {
        const response: Response = await fetch(environment.USER_API_URL + `user/${encodeURIComponent(userId)}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async forgotPassword(email: string): Promise<any> {
        const response: Response = await fetch(environment.USER_API_URL + "password/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"email": email})
        });

        if (!response.ok) {
            if (response.status === 401) {
                this.router.navigate(['/login']);
            }
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async resetPassword(token: string, password: string): Promise<any> {
        const response: Response = await fetch(environment.USER_API_URL + "password/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"token": token, "password": password})
        });

        if (!response.ok) {
            if (response.status === 401) {
                this.router.navigate(['/login']);
            }
            throw new Error(response.status.toString());
        }

        return response.json();
    }
}