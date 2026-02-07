import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LocalStorageService} from "../services/local-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService, private router: Router) {}

  public canActivate(): boolean {
    const currentUser: string|null = this.localStorageService.getCurrentUser();

    if (currentUser === null) {
      this.router.navigate(['/home']);
      return false;
    }

    const currentRole: string = JSON.parse(currentUser).role;
    if (currentRole !== "user") {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
