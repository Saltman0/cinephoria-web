import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieShowtimeSettingsComponent } from './movie-showtime-settings.component';

describe('HomeComponent', () => {
  let component: MovieShowtimeSettingsComponent;
  let fixture: ComponentFixture<MovieShowtimeSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieShowtimeSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieShowtimeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
