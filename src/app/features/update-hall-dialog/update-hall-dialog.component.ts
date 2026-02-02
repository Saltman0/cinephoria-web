import {Component, ElementRef, output, ViewChild} from '@angular/core';
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';
import {CinemaModel} from '../../core/models/cinema.model';
import {HallSettingsRenderer} from '../../core/renderers/hall-settings.renderer';
import {SeatModel} from '../../core/models/seat.model';
import {InfrastructureApiService} from "../../core/services/api/infrastructure.api.service";

@Component({
  selector: 'app-update-hall-dialog',
  imports: [
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './update-hall-dialog.component.html',
  styleUrl: './update-hall-dialog.component.scss'
})
export class UpdateHallDialogComponent {
  cinemaList: { id: number; name: string; }[] = [];

  hallForm = new FormGroup({
    cinemaId: new FormControl(
      0, [Validators.required]
    ),
    number: new FormControl(
      1, [Validators.required, Validators.min(1), Validators.max(50)]
    ),
    projectionQuality: new FormControl(
      "", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]
    ),
    nbRows: new FormControl(
      1, [Validators.required, Validators.min(1), Validators.max(50)]
    ),
    nbSeats: new FormControl(
      1, [Validators.required, Validators.min(1), Validators.max(100)]
    ),
    hallId: new FormControl(
        0, [Validators.required]
    )
  });

  isUpdatingHall: boolean = false;

  readonly hallUpdatedEvent = output<boolean>();

  @ViewChild('updateHallDialog') updateHallDialog!: ElementRef<HTMLDialogElement>;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly infrastructureApiService: InfrastructureApiService,
    private readonly hallSettingsRenderer: HallSettingsRenderer) {}

  async ngOnInit(): Promise<void> {
    await this.loadCinemaList();
  }

  public async loadCinemaList(): Promise<void> {
    this.resetCinemaList();

    const cinemas: CinemaModel[] = await this.infrastructureApiService.getCinemas();

    for (const cinema of cinemas) {
      this.cinemaList.push(this.hallSettingsRenderer.renderCinema(cinema));
    }
  }

  public async updateHall(): Promise<void> {
    this.isUpdatingHall = true;

    const jwtToken: string = <string> this.localStorageService.getJwtToken();

    const hall = await this.infrastructureApiService.updateHall(
      jwtToken,
      Number(this.hallForm.value.hallId),
      Number(this.hallForm.value.number),
      <string> this.hallForm.value.projectionQuality,
      Number(this.hallForm.value.cinemaId)
    );

    const seats: SeatModel[] = await this.infrastructureApiService.getSeats(Number(this.hallForm.value.hallId));

    for (const seat of seats) {
      await this.infrastructureApiService.deleteSeat(jwtToken, seat.id);
    }

    const nbRows = <number><unknown> this.hallForm.value.nbRows;
    const nbSeats = <number><unknown> this.hallForm.value.nbSeats;
    for (let i: number = 0; i < nbRows; i++) {

      const row: string = String.fromCharCode(65 + i);

      for (let j: number = 0; j < nbSeats; j++) {
        const number: number = j + 1;

        await this.infrastructureApiService.createSeat(
            jwtToken,
            row,
            number,
            hall.id
        );
      }

    }

    this.hallUpdatedEvent.emit(true);

    this.closeUpdateHallDialog();

    this.isUpdatingHall = false;
  }

  public showUpdateHallDialog(
      hallId: number,
      cinemaId: number,
      number: number,
      projectionQuality: string|null,
      nbRows: number,
      nbSeats: number
  ): void {
    this.hallForm.patchValue({
      hallId: hallId,
      cinemaId: cinemaId,
      number: number,
      projectionQuality: projectionQuality,
      nbRows: nbRows,
      nbSeats: nbSeats
    });

    this.updateHallDialog.nativeElement.showModal();
  }

  public closeUpdateHallDialog(): void {
    this.updateHallDialog.nativeElement.close();
  }

  private resetCinemaList(): void {
    this.cinemaList = [];
  }
}
