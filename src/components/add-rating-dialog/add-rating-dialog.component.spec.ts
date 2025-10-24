import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRatingDialogComponent } from './add-rating-dialog.component';

describe('AddRatingDialogComponent', () => {
  let component: AddRatingDialogComponent;
  let fixture: ComponentFixture<AddRatingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRatingDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRatingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
