import {Component, ElementRef, Input, output, ViewChild} from '@angular/core';
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {ApiService} from '../../core/services/api/api.service';

@Component({
  selector: 'app-delete-movie-dialog',
  imports: [],
  templateUrl: './delete-movie-dialog.component.html',
  styleUrl: './delete-movie-dialog.component.scss'
})
export class DeleteMovieDialogComponent {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly apiService: ApiService
  ) {}

  @ViewChild('deleteMovieDialog') deleteMovieDialog!: ElementRef<HTMLDialogElement>;

  @Input() movieId: number = 0;

  isDeletingMovie: boolean = false;

  readonly movieDeletedEvent = output<boolean>();

  public async deleteMovie() {
    this.isDeletingMovie = true;

    await this.apiService.deleteMovie(<string> this.localStorageService.getJwtToken(), this.movieId);

    this.movieDeletedEvent.emit(true);

    this.closeDeleteMovieDialog();

    this.isDeletingMovie = false;
  }

  public showDeleteMovieDialog() {
    this.deleteMovieDialog.nativeElement.showModal();
  }

  public closeDeleteMovieDialog() {
    this.deleteMovieDialog.nativeElement.close();
  }
}
