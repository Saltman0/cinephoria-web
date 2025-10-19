import {Component, ElementRef, Input, output, ViewChild} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {ApiService} from '../../services/api/api.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';
import {CinemaModel} from '../../models/cinema.model';
import {HallSettingsRenderer} from '../../renderers/hall-settings.renderer';
import {SeatModel} from '../../models/seat.model';

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
      "", [Validators.required]
    ),
    number: new FormControl(
      "", [Validators.required, Validators.min(1), Validators.max(50)]
    ),
    projectionQuality: new FormControl(
      "", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]
    ),
    nbRows: new FormControl(
      "", [Validators.required, Validators.min(1), Validators.max(50)]
    ),
    nbSeats: new FormControl(
      "", [Validators.required, Validators.min(1), Validators.max(100)]
    )
  });

  isUpdatingHall: boolean = false;

  readonly hallUpdatedEvent = output<boolean>();

  @Input() hallId: number = 0;
  @Input() cinemaId: number = 0;
  @Input() number: number = 0;
  @Input() projectionQuality: string|null = null;
  @Input() nbRows: number = 0;
  @Input() nbSeats: number = 0;

  @ViewChild('updateHallDialog') updateHallDialog!: ElementRef<HTMLDialogElement>;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly apiService: ApiService,
    private readonly hallSettingsRenderer: HallSettingsRenderer) {}

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

  public async updateHall(): Promise<void> {
    this.isUpdatingHall = true;

    const jwtToken: string = <string> this.localStorageService.getJwtToken();

    const hall = await this.apiService.updateHall(
        jwtToken,
      this.hallId,
      <number><unknown> this.hallForm.value.number,
      <string> this.hallForm.value.projectionQuality,
      <number><unknown> this.hallForm.value.cinemaId
    );

    const seats: SeatModel[] = hall.seats;

    for (const seat of seats) {
      await this.apiService.deleteSeat(jwtToken, seat.id);
    }

    const nbRows = <number><unknown> this.hallForm.value.nbRows;
    const nbSeats = <number><unknown> this.hallForm.value.nbSeats;
    for (let i: number = 0; i < nbRows; i++) {

      const row: string = String.fromCharCode(65 + i);

      for (let j: number = 0; j < nbSeats; j++) {
        const number: number = j + 1;

        await this.apiService.createSeat(
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

  public showUpdateHallDialog(): void {
    this.updateHallDialog.nativeElement.showModal();
  }

  public closeUpdateHallDialog(): void {
    this.updateHallDialog.nativeElement.close();
  }

  private resetCinemaList(): void {
    this.cinemaList = [];
  }
}
