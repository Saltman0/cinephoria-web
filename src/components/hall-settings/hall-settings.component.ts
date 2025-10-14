import {Component, ViewChild} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {ApiService} from '../../services/api/api.service';
import {FooterComponent} from '../footer/footer.component';
import {NgOptimizedImage} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HallSettingsRenderer} from '../../renderers/hall-settings.renderer';
import {HallModel} from '../../models/hall.model';
import {CinemaModel} from '../../models/cinema.model';
import {AddHallDialogComponent} from '../add-hall-dialog/add-hall-dialog.component';

@Component({
  selector: 'app-hall-settings',
  imports: [
    HeaderComponent,
    FooterComponent,
    NgOptimizedImage,
    NgOptimizedImage,
    ReactiveFormsModule,
    AddHallDialogComponent
  ],
  templateUrl: './hall-settings.component.html',
  styleUrl: './hall-settings.component.scss'
})
export class HallSettingsComponent {
  cinemaList: { id: number; name: string; }[] = [];

  hallList: {
    id: number,
    number: number,
    movieTitle: string|null,
    movieImage: string|null,
    hours: string|null
  }[] = [];

  isHallListLoading: boolean = false;

  @ViewChild(AddHallDialogComponent) addHallDialogComponent!: AddHallDialogComponent;

  constructor(private readonly hallSettingsRenderer: HallSettingsRenderer, private readonly apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    await this.loadCinemas();
  }

  public async loadCinemas(): Promise<void> {
    this.resetCinemas();

    const cinemas: CinemaModel[] = await this.apiService.getCinemas();

    for (const cinema of cinemas) {
      this.cinemaList.push(this.hallSettingsRenderer.renderCinema(cinema));
    }
  }

  public async loadHalls(): Promise<void> {
    this.isHallListLoading = true;

    this.resetHalls();

    const halls: HallModel[] = await this.apiService.getHalls(1);

    for (const hall of halls) {
      this.hallList.push(await this.hallSettingsRenderer.renderHall(hall));
    }

    this.isHallListLoading = false;
  }

  public openAddHallDialog() {
    this.addHallDialogComponent.showAddHallDialog();
  }

  public editHall(id: number) {

  }

  public deleteHall(id: number) {

  }

  private resetCinemas(): void {
    this.cinemaList = [];
  }

  private resetHalls(): void {
    this.hallList = [];
  }
}
