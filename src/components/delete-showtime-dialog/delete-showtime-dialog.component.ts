import {Component, ElementRef, Input, output, ViewChild} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-delete-showtime-dialog',
  imports: [],
  templateUrl: './delete-showtime-dialog.component.html',
  styleUrl: './delete-showtime-dialog.component.scss'
})
export class DeleteShowtimeDialogComponent {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly apiService: ApiService
  ) {}

  @ViewChild('deleteShowtimeDialog') deleteMovieDialog!: ElementRef<HTMLDialogElement>;

  @Input() showtimeId: number = 0;

  isDeletingShowtime: boolean = false;

  readonly showtimeDeletedEvent = output<boolean>();

  public async deleteShowtime(): Promise<void> {
    this.isDeletingShowtime = true;

    await this.apiService.deleteShowtime(<string> this.localStorageService.getJwtToken(), this.showtimeId);

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
