import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    public getJwtToken(): string|null {
        return localStorage.getItem("jwtToken");
    }

    public addJwtToken(jwtToken: string): void {
        localStorage.setItem("jwtToken", jwtToken);
    }

    public deleteJwtToken(): void {
        localStorage.removeItem("jwtToken");
    }

    public getCurrentUser(): string|null {
        return localStorage.getItem("currentUser");
    }

    public addCurrentUser(user: string): void {
        localStorage.setItem("currentUser", user);
    }

    public deleteCurrentUser(): void {
        localStorage.removeItem("currentUser");
    }

}
