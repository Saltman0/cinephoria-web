import {Component, ElementRef, output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';
import {MovieModel} from "../../core/models/movie.model";
import {HallModel} from "../../core/models/hall.model";
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {ApiService} from '../../core/services/api/api.service';

@Component({
  selector: 'app-add-showtime-dialog',
  imports: [
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './add-showtime-dialog.component.html',
  styleUrl: './add-showtime-dialog.component.scss'
})
export class AddShowtimeDialogComponent {
  movieList: { id: number; title: string; }[] = [];
  hallList: { id: number; number: number; }[] = [];

  showtimeForm = new FormGroup({
    movieId: new FormControl(
      0, [Validators.required]
    ),
    hallId: new FormControl(
        0, [Validators.required]
    ),
    startTime: new FormControl(
      "", [Validators.required, Validators.minLength(1), Validators.max(50)]
    ),
    endTime: new FormControl(
      "", [Validators.required, Validators.minLength(5), Validators.maxLength(200)]
    ),
    price: new FormControl(
      0, [Validators.min(0), Validators.max(100)]
    )
  });

  isAddingShowtime: boolean = false;

  readonly showtimeAddedEvent = output<boolean>();

  @ViewChild('addShowtimeDialog') addShowtimeDialog!: ElementRef<HTMLDialogElement>;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly apiService: ApiService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadMovieList();
    await this.loadHallList();
  }

  public async loadMovieList(): Promise<void> {
    this.resetMovieList();

    const movies: MovieModel[] = await this.apiService.getMovies();

    for (const movie of movies) {
      this.movieList.push({id: movie.id, title: movie.title});
    }
  }

  public async loadHallList(): Promise<void> {
    this.resetHallList();

    const halls: HallModel[] = await this.apiService.getHalls(1);

    for (const hall of halls) {
      this.hallList.push({id: hall.id, number: hall.number});
    }
  }

  public async createShowtime(): Promise<void> {
    this.isAddingShowtime = true;

    await this.apiService.createShowtime(
        <string> this.localStorageService.getJwtToken(),
        <number><unknown> this.showtimeForm.value.movieId,
        <number><unknown> this.showtimeForm.value.hallId,
        <string> this.showtimeForm.value.startTime,
        <string> this.showtimeForm.value.endTime,
        <number><unknown> this.showtimeForm.value.price
    );

    this.showtimeAddedEvent.emit(true);

    this.closeAddShowtimeDialog();

    this.isAddingShowtime = false;
  }

  public showAddShowtimeDialog(): void {
    this.addShowtimeDialog.nativeElement.showModal();
  }

  public closeAddShowtimeDialog(): void {
    this.addShowtimeDialog.nativeElement.close();
  }

  private resetMovieList(): void {
    this.movieList = [];
  }

  private resetHallList(): void {
    this.hallList = [];
  }
}
