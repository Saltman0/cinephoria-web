import {Component, Input} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {LocalStorageService} from "../../services/local-storage/local-storage.service";
import {ApiService} from "../../services/api/api.service";
import {UserModel} from "../../models/user.model";

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
      private readonly apiService: ApiService,
      private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const jwtToken: string|null = this.localStorageService.getJwtToken();

    if (jwtToken !== null) {
      const user: UserModel = await this.apiService.getUser(jwtToken);
      this.role = user.role;
    }
  }

  public async logout(): Promise<void> {
    this.localStorageService.deleteJwtToken();

    await this.router.navigate(['/home']);
  }
}
