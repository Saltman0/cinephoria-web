import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShowtimeDialogComponent } from './delete-showtime-dialog.component';

describe('DeleteShowtimeDialogComponent', () => {
  let component: DeleteShowtimeDialogComponent;
  let fixture: ComponentFixture<DeleteShowtimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteShowtimeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteShowtimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
