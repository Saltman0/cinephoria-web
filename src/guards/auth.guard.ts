import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {jwtDecode} from "jwt-decode";
import {LocalStorageService} from "../services/local-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService, private router: Router) {}

  public canActivate(): boolean {
    const token: string|null = this.localStorageService.getJwtToken();

    if (token === null) {
      this.router.navigate(['/home']);
      return false;
    }

    const expiredTime: number = <number> jwtDecode(token).exp * 1000;
    if (new Date().getTime() >= expiredTime) {
      this.router.navigate(['/home']);
      return false
    }

    return true;
  }
}
