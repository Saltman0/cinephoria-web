import {Component, ElementRef, Input, output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {ApiService} from '../../core/services/api/api.service';

@Component({
  selector: 'app-add-rating-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-rating-dialog.component.html',
  styleUrl: './add-rating-dialog.component.scss'
})
export class AddRatingDialogComponent {

  @Input() movieId!: number;
  @Input() userId!: number;

  ratingForm = new FormGroup({
    number: new FormControl(
      "", [Validators.required, Validators.min(1), Validators.max(5)]
    ),
    description: new FormControl(
      "", [Validators.required, Validators.minLength(10), Validators.maxLength(500)]
    )
  });

  isAddingRating: boolean = false;

  readonly ratingAddedEvent = output<boolean>();

  @ViewChild('addRatingDialog') addRatingDialog!: ElementRef<HTMLDialogElement>;

  constructor(private readonly localStorageService: LocalStorageService, private readonly apiService: ApiService) {}

  public async createRating(): Promise<void> {
    this.isAddingRating = true;

    await this.apiService.createRating(
      <string> this.localStorageService.getJwtToken(),
      <number><unknown> this.ratingForm.value.number,
      <string> this.ratingForm.value.description,
      false,
      this.movieId,
      this.userId
    );

    this.ratingAddedEvent.emit(true);

    this.closeAddRatingDialog();

    this.isAddingRating = false;
  }

  public showAddRatingDialog(): void {
    this.addRatingDialog.nativeElement.showModal();
  }

  public closeAddRatingDialog(): void {
    this.addRatingDialog.nativeElement.close();
  }
}
