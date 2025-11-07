import {Component, ElementRef, Input, output, ViewChild} from '@angular/core';
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {ShowtimeApiService} from "../../core/services/api/showtime.api.service";

@Component({
  selector: 'app-delete-showtime-dialog',
  imports: [],
  templateUrl: './delete-showtime-dialog.component.html',
  styleUrl: './delete-showtime-dialog.component.scss'
})
export class DeleteShowtimeDialogComponent {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly showtimeApiService: ShowtimeApiService
  ) {}

  @ViewChild('deleteShowtimeDialog') deleteMovieDialog!: ElementRef<HTMLDialogElement>;

  @Input() showtimeId: number = 0;

  isDeletingShowtime: boolean = false;

  readonly showtimeDeletedEvent = output<boolean>();

  public async deleteShowtime(): Promise<void> {
    this.isDeletingShowtime = true;

    await this.showtimeApiService.deleteShowtime(<string> this.localStorageService.getJwtToken(), this.showtimeId);

    this.showtimeDeletedEvent.emit(true);

    this.closeDeleteShowtimeDialog();

    this.isDeletingShowtime = false;
  }

  public showDeleteMovieDialog() {
    this.deleteMovieDialog.nativeElement.showModal();
  }

  public closeDeleteShowtimeDialog() {
    this.deleteMovieDialog.nativeElement.close();
  }
}
