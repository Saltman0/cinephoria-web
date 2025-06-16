import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    public getJwtToken(): string {
        return <string>localStorage.getItem("jwtToken");
    }

    public addJwtToken(jwtToken: string): void {
        localStorage.setItem("jwtToken", jwtToken);
    }

    public deleteJwtToken(): void {
        localStorage.removeItem("jwtToken");
    }

}