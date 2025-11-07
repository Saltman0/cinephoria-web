import {Component, ElementRef, Input, output, ViewChild} from '@angular/core';
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {SeatModel} from '../../core/models/seat.model';
import {InfrastructureApiService} from "../../core/services/api/infrastructure.api.service";

@Component({
  selector: 'app-delete-hall-dialog',
  imports: [],
  templateUrl: './delete-hall-dialog.component.html',
  styleUrl: './delete-hall-dialog.component.scss'
})
export class DeleteHallDialogComponent {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly infrastructureApiService: InfrastructureApiService
  ) {}

  @ViewChild('deleteHallDialog') deleteHallDialog!: ElementRef<HTMLDialogElement>;

  @Input() hallId: number = 0;

  isDeletingHall: boolean = false;

  readonly hallDeletedEvent = output<boolean>();

  public async deleteHall() {
    this.isDeletingHall = true;

    const jwtToken: string = <string> this.localStorageService.getJwtToken();

    const seats: SeatModel[] = await this.infrastructureApiService.getSeats(this.hallId);

    await this.infrastructureApiService.deleteHall(jwtToken, this.hallId);

    for (const seat of seats) {
      await this.infrastructureApiService.deleteSeat(jwtToken, seat.id);
    }

    this.hallDeletedEvent.emit(true);

    this.closeDeleteHallDialog();

    this.isDeletingHall = false;
  }

  public showDeleteHallDialog() {
    this.deleteHallDialog.nativeElement.showModal();
  }

  public closeDeleteHallDialog() {
    this.deleteHallDialog.nativeElement.close();
  }
}
