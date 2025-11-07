import {Component, ElementRef, output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {MovieModel} from "../../core/models/movie.model";
import {HallModel} from "../../core/models/hall.model";
import {MovieApiService} from "../../core/services/api/movie.api.service";
import {InfrastructureApiService} from "../../core/services/api/infrastructure.api.service";
import {ShowtimeApiService} from "../../core/services/api/showtime.api.service";

@Component({
  selector: 'app-update-showtime-dialog',
  imports: [
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './update-showtime-dialog.component.html',
  styleUrl: './update-showtime-dialog.component.scss'
})
export class UpdateShowtimeDialogComponent {
  showtimeId: number = 0;
  movieId: number = 0;
  hallId: number = 0;
  startTime: string = "";
  endTime: string = "";
  price: number = 0;

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

  isUpdatingShowtime: boolean = false;

  readonly showtimeUpdatedEvent = output<boolean>();

  @ViewChild('updateShowtimeDialog') updateShowtimeDialog!: ElementRef<HTMLDialogElement>;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly movieApiService: MovieApiService,
    private readonly infrastructureApiService: InfrastructureApiService,
    private readonly showtimeApiService: ShowtimeApiService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadMovieList();
    await this.loadHallList();
  }

  public async loadMovieList(): Promise<void> {
    this.resetMovieList();

    const movies: MovieModel[] = await this.movieApiService.getMovies();

    for (const movie of movies) {
      this.movieList.push({id: movie.id, title: movie.title});
    }
  }

  public async loadHallList(): Promise<void> {
    this.resetHallList();

    const halls: HallModel[] = await this.infrastructureApiService.getHalls(1);

    for (const hall of halls) {
      this.hallList.push({id: hall.id, number: hall.number});
    }
  }

  public async updateShowtime(): Promise<void> {
    this.isUpdatingShowtime = true;

    await this.showtimeApiService.updateShowtime(
        <string> this.localStorageService.getJwtToken(),
        this.showtimeId,
        <number><unknown> this.showtimeForm.value.movieId,
        <number><unknown> this.showtimeForm.value.hallId,
        <string> this.showtimeForm.value.startTime,
        <string> this.showtimeForm.value.endTime,
        <number><unknown> this.showtimeForm.value.price
    );

    this.showtimeUpdatedEvent.emit(true);

    this.closeUpdateMovieDialog();

    this.isUpdatingShowtime = false;
  }

  public showUpdateShowtimeDialog(
      showtimeId: number,
      movieId: number,
      hallId: number,
      startTime: string,
      endTime: string,
      price: number
  ): void {
    this.showtimeId = showtimeId;
    this.movieId = movieId;
    this.hallId = hallId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.price = price;
    this.updateShowtimeDialog.nativeElement.showModal();
  }

  public closeUpdateMovieDialog(): void {
    this.updateShowtimeDialog.nativeElement.close();
  }

  private resetMovieList(): void {
    this.movieList = [];
  }

  private resetHallList(): void {
    this.hallList = [];
  }
}
