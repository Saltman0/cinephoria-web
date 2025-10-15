import {Component, ElementRef, Input, output, ViewChild} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {ApiService} from '../../services/api/api.service';
import {SeatModel} from '../../models/seat.model';

@Component({
  selector: 'app-delete-hall-dialog',
  imports: [],
  templateUrl: './delete-hall-dialog.component.html',
  styleUrl: './delete-hall-dialog.component.scss'
})
export class DeleteHallDialogComponent {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly apiService: ApiService
  ) {}

  @ViewChild('deleteHallDialog') deleteHallDialog!: ElementRef<HTMLDialogElement>;

  @Input() hallId: number = 0;

  isDeletingHall: boolean = false;

  readonly hallDeletedEvent = output<boolean>();

  public async deleteHall() {
    this.isDeletingHall = true;

    const jwtToken = await this.apiService.login(
      "baudoin.mathieu@protonmail.com", "0123456789"
    );

    this.localStorageService.addJwtToken(jwtToken.value);

    const seats: SeatModel[] = await this.apiService.getSeats(this.hallId);

    await this.apiService.deleteHall(this.localStorageService.getJwtToken(), this.hallId);

    for (const seat of seats) {
      await this.apiService.deleteSeat(this.localStorageService.getJwtToken(), seat.id);
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
