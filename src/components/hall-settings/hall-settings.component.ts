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
import {UpdateHallDialogComponent} from '../update-hall-dialog/update-hall-dialog.component';
import {DeleteHallDialogComponent} from '../delete-hall-dialog/delete-hall-dialog.component';

@Component({
  selector: 'app-hall-settings',
  imports: [
    HeaderComponent,
    FooterComponent,
    NgOptimizedImage,
    NgOptimizedImage,
    ReactiveFormsModule,
    AddHallDialogComponent,
    UpdateHallDialogComponent,
    DeleteHallDialogComponent
  ],
  templateUrl: './hall-settings.component.html',
  styleUrl: './hall-settings.component.scss'
})
export class HallSettingsComponent {
  cinemaList: { id: number; name: string; }[] = [];

  hallList: {
    id: number,
    cinemaId: number,
    number: number,
    projectionQuality: string|null,
    nbRows: number,
    nbSeats: number,
    movieTitle: string|null,
    movieImage: string|null,
    hours: string|null
  }[] = [];

  hallIdToUpdate: number = 0;
  cinemaIdToUpdate: number = 0;
  numberToUpdate: number = 0;
  projectionQualityToUpdate: string|null = "";
  nbRowsToUpdate: number = 0;
  nbSeatsToUpdate: number = 0;

  hallIdToDelete: number = 0;

  isHallListLoading: boolean = false;

  @ViewChild(AddHallDialogComponent) addHallDialogComponent!: AddHallDialogComponent;
  @ViewChild(UpdateHallDialogComponent) updateHallDialogComponent!: UpdateHallDialogComponent;
  @ViewChild(DeleteHallDialogComponent) deleteHallDialogComponent!: DeleteHallDialogComponent;

  constructor(private readonly hallSettingsRenderer: HallSettingsRenderer, private readonly apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    await this.loadCinemaList();
  }

  public async loadCinemaList(): Promise<void> {
    this.resetCinemaList();

    const cinemas: CinemaModel[] = await this.apiService.getCinemas();

    for (const cinema of cinemas) {
      this.cinemaList.push(this.hallSettingsRenderer.renderCinema(cinema));
    }
  }

  public async loadHallList(): Promise<void> {
    this.isHallListLoading = true;

    this.resetHallList();

    let cinemaId = 1;

    const halls: HallModel[] = await this.apiService.getHalls(cinemaId);

    for (const hall of halls) {
      this.hallList.push(await this.hallSettingsRenderer.renderHall(hall, cinemaId));
    }

    this.isHallListLoading = false;
  }

  public openAddHallDialog() {
    this.addHallDialogComponent.showAddHallDialog();
  }

  public openUpdateHallDialog(
    hallId: number,
    cinemaId: number,
    number: number,
    projectionQuality: string | null,
    nbRows: number,
    nbSeats: number
  ): void {
    this.hallIdToUpdate = hallId;
    this.cinemaIdToUpdate = cinemaId;
    this.numberToUpdate = number;
    this.projectionQualityToUpdate = projectionQuality;
    this.nbRowsToUpdate = nbRows;
    this.nbSeatsToUpdate = nbSeats;

    this.updateHallDialogComponent.showUpdateHallDialog();
  }

  public openDeleteHallDialog(hallId: number) {
    this.hallIdToDelete = hallId;
    this.deleteHallDialogComponent.showDeleteHallDialog();
  }

  private resetCinemaList(): void {
    this.cinemaList = [];
  }

  private resetHallList(): void {
    this.hallList = [];
  }
}
