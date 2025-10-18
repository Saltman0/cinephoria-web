import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMovieDialogComponent } from './update-movie-dialog.component';

describe('UpdateMovieDialogComponent', () => {
  let component: UpdateMovieDialogComponent;
  let fixture: ComponentFixture<UpdateMovieDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMovieDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMovieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
