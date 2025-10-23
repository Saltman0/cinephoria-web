import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LocalStorageService} from "../services/local-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService, private router: Router) {}

  canActivate(): boolean {
    const currentRole: string|null = this.localStorageService.getCurrentRole();

    if (currentRole === "admin" || currentRole === "employee") {
      return true;
    }

    this.router.navigate(['/home']);

    return false;
  }
}
