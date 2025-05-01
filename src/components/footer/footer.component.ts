import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
/*import { Router } from "@angular/router";
import { DatabaseService } from "../../services/database/database.service";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";*/

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgOptimizedImage
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  firstName: string = "Mathieu";
  lastName: string = "Baudoin";

  /*constructor(private readonly router: Router,
              private readonly databaseService: DatabaseService,
              private readonly localStorageService: LocalStorageService) {}*/

  /*async disconnect(): Promise<void> {
    this.databaseService.closeDatabase();
    this.databaseService.deleteDatabase();
    this.localStorageService.deleteJwtToken();
    await this.router.navigate(['login']);
  }*/
}
