import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {ApiService} from '../../services/api/api.service';
import {FooterComponent} from '../footer/footer.component';
import {NgOptimizedImage} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HallSettingsRenderer} from '../../renderers/hall-settings.renderer';
import {HallModel} from '../../models/hall.model';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-hall-settings',
  imports: [
    HeaderComponent,
    FooterComponent,
    NgOptimizedImage,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './hall-settings.component.html',
  styleUrl: './hall-settings.component.scss'
})
export class HallSettingsComponent {
  hallList: {
    id: number,
    number: number,
    movieTitle: string|null,
    movieImage: string|null,
    hours: string|null
  }[] = [];

  constructor(
    private readonly hallSettingsRenderer: HallSettingsRenderer,
    private readonly apiService: ApiService,
    private readonly localStorageService: LocalStorageService) {}

  async ngOnInit(): Promise<void> {
    const jwtToken = await this.apiService.login(
      "baudoin.mathieu@protonmail.com", "0123456789"
    );

    this.localStorageService.addJwtToken(jwtToken.value);

    const halls: HallModel[] = await this.apiService.getHalls(1);

    for (const hall of halls) {
      this.hallList.push(await this.hallSettingsRenderer.render(hall));
    }
  }

  public editHall(id: number) {

  }

  public deleteHall(id: number) {

  }
}
