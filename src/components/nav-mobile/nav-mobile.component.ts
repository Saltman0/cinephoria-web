import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {LocalStorageService} from "../../services/local-storage/local-storage.service";

@Component({
  selector: 'app-nav-mobile',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage
  ],
  templateUrl: './nav-mobile.component.html',
  styleUrl: './nav-mobile.component.scss'
})
export class NavMobileComponent {
  @Input() role: string = "visitor";

  constructor(
      private readonly localStorageService: LocalStorageService,
      private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.role = this.localStorageService.getCurrentRole() !== null
        ? <string> this.localStorageService.getCurrentRole()
        : "visitor";
  }

  public async logout(): Promise<void> {
    this.localStorageService.deleteJwtToken();
    this.localStorageService.deleteCurrentRole();

    this.role = "visitor";

    await this.router.navigate(['/home']);
  }
}
