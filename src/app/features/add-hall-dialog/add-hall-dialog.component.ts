import {Component, ElementRef, output, ViewChild} from '@angular/core';
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';
import {CinemaModel} from '../../core/models/cinema.model';
import {HallSettingsRenderer} from '../../core/renderers/hall-settings.renderer';
import {InfrastructureApiService} from "../../core/services/api/infrastructure.api.service";

@Component({
  selector: 'app-add-hall-dialog',
  imports: [
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './add-hall-dialog.component.html',
  styleUrl: './add-hall-dialog.component.scss'
})
export class AddHallDialogComponent {
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

  isAddingHall: boolean = false;

  readonly hallAddedEvent = output<boolean>();

  @ViewChild('addHallDialog') addHallDialog!: ElementRef<HTMLDialogElement>;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly infrastructureApiService: InfrastructureApiService,
    private readonly hallSettingsRenderer: HallSettingsRenderer) {}

  async ngOnInit(): Promise<void> {
    await this.loadCinemas();
  }

  public async loadCinemas(): Promise<void> {
    this.resetCinemas();

    const cinemas: CinemaModel[] = await this.infrastructureApiService.getCinemas();

    for (const cinema of cinemas) {
      this.cinemaList.push(this.hallSettingsRenderer.renderCinema(cinema));
    }
  }

  public async createHall(): Promise<void> {
    this.isAddingHall = true;

    const hall = await this.infrastructureApiService.createHall(
      <string> this.localStorageService.getJwtToken(),
      <number><unknown> this.hallForm.value.number,
      <string> this.hallForm.value.projectionQuality,
      <number><unknown> this.hallForm.value.cinemaId
    );

    const nbRows = <number><unknown> this.hallForm.value.nbRows;
    const nbSeats = <number><unknown> this.hallForm.value.nbSeats;
    for (let i: number = 0; i < nbRows; i++) {

      const row: string = String.fromCharCode(65 + i);

      for (let j: number = 0; j < nbSeats; j++) {
        const number: number = j + 1;

        await this.infrastructureApiService.createSeat(
          <string> this.localStorageService.getJwtToken(),
          row,
          number,
          hall.id
        );
      }

    }

    this.hallAddedEvent.emit(true);

    this.closeAddHallDialog();

    this.isAddingHall = false;
  }

  public showAddHallDialog(): void {
    this.addHallDialog.nativeElement.showModal();
  }

  public closeAddHallDialog(): void {
    this.addHallDialog.nativeElement.close();
  }

  private resetCinemas(): void {
    this.cinemaList = [];
  }
}
