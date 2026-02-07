import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShowtimeDialogComponent } from './update-showtime-dialog.component';

describe('UpdateShowtimeDialogComponent', () => {
  let component: UpdateShowtimeDialogComponent;
  let fixture: ComponentFixture<UpdateShowtimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateShowtimeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateShowtimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
