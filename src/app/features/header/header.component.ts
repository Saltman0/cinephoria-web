import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {LocalStorageService} from "../../core/services/local-storage/local-storage.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() role: string = "visitor";

  constructor(
      private readonly localStorageService: LocalStorageService,
      private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const currentUser: string|null = this.localStorageService.getCurrentUser();

    if (currentUser !== null) {
      this.role = JSON.parse(currentUser).role;
    }
  }

  public async logout(): Promise<void> {
    this.localStorageService.deleteJwtToken();
    this.localStorageService.deleteCurrentUser();

    this.role = "visitor";

    await this.router.navigate(['/home']);
  }
}
