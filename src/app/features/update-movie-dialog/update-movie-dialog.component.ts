import {Component, ElementRef, output, ViewChild} from '@angular/core';
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';
import {CategoryModel} from '../../core/models/category.model';
import {MovieShowtimeSettingsRenderer} from '../../core/renderers/movie-showtime-settings.renderer';
import {MovieApiService} from "../../core/services/api/movie.api.service";

@Component({
  selector: 'app-update-movie-dialog',
  imports: [
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './update-movie-dialog.component.html',
  styleUrl: './update-movie-dialog.component.scss'
})
export class UpdateMovieDialogComponent {
  categoryList: { id: number; name: string; }[] = [];

  movieForm = new FormGroup({
    categoryId: new FormControl(
      0, [Validators.required]
    ),
    title: new FormControl(
      "", [Validators.required, Validators.minLength(1), Validators.max(50)]
    ),
    description: new FormControl(
      "", [Validators.required, Validators.minLength(5), Validators.maxLength(200)]
    ),
    minimumAge: new FormControl(
      0, [Validators.min(1), Validators.max(18)]
    ),
    favorite: new FormControl(
      false, [Validators.required]
    ),
    imageURL: new FormControl(
      "", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]
    ),
    movieId: new FormControl(
        0, [Validators.required]
    ),
  });

  isUpdatingMovie: boolean = false;

  readonly movieUpdatedEvent = output<boolean>();

  @ViewChild('updateMovieDialog') updateMovieDialog!: ElementRef<HTMLDialogElement>;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly movieApiService: MovieApiService,
    private readonly movieShowtimeSettingsRenderer: MovieShowtimeSettingsRenderer) {}

  async ngOnInit(): Promise<void> {
    await this.loadCategoryList();
  }

  public async loadCategoryList(): Promise<void> {
    this.resetCategoryList();

    const categories: CategoryModel[] = await this.movieApiService.getCategories();

    for (const category of categories) {
      this.categoryList.push(this.movieShowtimeSettingsRenderer.renderCategory(category));
    }
  }

  public async updateMovie(): Promise<void> {
    this.isUpdatingMovie = true;

    await this.movieApiService.updateMovie(
        <string> this.localStorageService.getJwtToken(),
        Number(this.movieForm.value.movieId),
        <string> this.movieForm.value.title,
        <string> this.movieForm.value.description,
        <number|null> this.movieForm.value.minimumAge,
        <boolean> this.movieForm.value.favorite,
        <string> this.movieForm.value.imageURL,
        Number(this.movieForm.value.categoryId)
    );

    this.movieUpdatedEvent.emit(true);

    this.closeUpdateMovieDialog();

    this.isUpdatingMovie = false;
  }

  public showUpdateMovieDialog(
      movieId: number,
      categoryId: number,
      title: string,
      description: string,
      minimumAge: number|null,
      favorite: boolean,
      imageURL: string
  ): void {
    this.movieForm.patchValue({
      categoryId: categoryId,
      title: title,
      description: description,
      minimumAge: minimumAge,
      favorite: favorite,
      imageURL: imageURL,
      movieId: movieId
    });

    this.updateMovieDialog.nativeElement.showModal();
  }

  public closeUpdateMovieDialog(): void {
    this.updateMovieDialog.nativeElement.close();
  }

  private resetCategoryList(): void {
    this.categoryList = [];
  }
}
