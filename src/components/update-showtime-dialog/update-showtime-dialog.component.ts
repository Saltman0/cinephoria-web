import {Component, ElementRef, output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {ApiService} from '../../services/api/api.service';
import {MovieModel} from "../../models/movie.model";
import {HallModel} from "../../models/hall.model";

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

  public async updateShowtime(): Promise<void> {
    this.isUpdatingShowtime = true;

    const jwtToken = await this.apiService.login(
        "baudoin.mathieu@protonmail.com", "0123456789"
    );

    this.localStorageService.addJwtToken(jwtToken.value);

    await this.apiService.updateShowtime(
        this.localStorageService.getJwtToken(),
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
