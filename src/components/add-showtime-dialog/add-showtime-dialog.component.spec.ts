import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddShowtimeDialogComponent } from './add-showtime-dialog.component';

describe('AddShowtimeDialogComponent', () => {
  let component: AddShowtimeDialogComponent;
  let fixture: ComponentFixture<AddShowtimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShowtimeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShowtimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
