import {Component, ElementRef, output, ViewChild} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {ApiService} from '../../services/api/api.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';
import {CategoryModel} from '../../models/category.model';
import {MovieShowtimeSettingsRenderer} from '../../renderers/movie-showtime-settings.renderer';

@Component({
  selector: 'app-add-movie-dialog',
  imports: [
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './add-movie-dialog.component.html',
  styleUrl: './add-movie-dialog.component.scss'
})
export class AddMovieDialogComponent {
  categoryList: { id: number; name: string; }[] = [];

  movieForm = new FormGroup({
    categoryId: new FormControl(
      "", [Validators.required]
    ),
    title: new FormControl(
      "", [Validators.required, Validators.minLength(1), Validators.max(50)]
    ),
    description: new FormControl(
      "", [Validators.required, Validators.minLength(5), Validators.maxLength(200)]
    ),
    minimumAge: new FormControl(
      null, [Validators.min(1), Validators.max(18)]
    ),
    favorite: new FormControl(
      false, [Validators.required]
    ),
    imageURL: new FormControl(
      "", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]
    )
  });

  isAddingMovie: boolean = false;

  readonly movieAddedEvent = output<boolean>();

  @ViewChild('addMovieDialog') addMovieDialog!: ElementRef<HTMLDialogElement>;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly apiService: ApiService,
    private readonly movieShowtimeSettingsRenderer: MovieShowtimeSettingsRenderer) {}

  async ngOnInit(): Promise<void> {
    await this.loadCategoryList();
  }

  public async loadCategoryList(): Promise<void> {
    this.resetCategoryList();

    const categories: CategoryModel[] = await this.apiService.getCategories();

    for (const category of categories) {
      this.categoryList.push(this.movieShowtimeSettingsRenderer.renderCategory(category));
    }
  }

  public async createMovie(): Promise<void> {
    this.isAddingMovie = true;

    const jwtToken = await this.apiService.login(
      "baudoin.mathieu@protonmail.com", "0123456789"
    );

    this.localStorageService.addJwtToken(jwtToken.value);

    await this.apiService.createMovie(
      this.localStorageService.getJwtToken(),
      <string> this.movieForm.value.title,
      <string> this.movieForm.value.description,
      <number|null> this.movieForm.value.minimumAge,
      <boolean><unknown> this.movieForm.value.favorite,
      <string> this.movieForm.value.imageURL,
      <number><unknown> this.movieForm.value.categoryId
    );

    this.movieAddedEvent.emit(true);

    this.closeAddMovieDialog();

    this.isAddingMovie = false;
  }

  public showAddMovieDialog(): void {
    this.addMovieDialog.nativeElement.showModal();
  }

  public closeAddMovieDialog(): void {
    this.addMovieDialog.nativeElement.close();
  }

  private resetCategoryList(): void {
    this.categoryList = [];
  }
}
