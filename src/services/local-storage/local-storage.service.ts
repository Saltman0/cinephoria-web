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

    public getCurrentRole(): string|null {
        return localStorage.getItem("currentRole");
    }

    public addCurrentRole(currentRole: string): void {
        localStorage.setItem("currentRole", currentRole);
    }

    public deleteCurrentRole(): void {
        localStorage.removeItem("currentRole");
    }

}