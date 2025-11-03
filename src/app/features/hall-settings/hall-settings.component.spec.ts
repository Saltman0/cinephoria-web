import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallSettingsComponent } from './hall-settings.component';

describe('HallSettingsComponent', () => {
  let component: HallSettingsComponent;
  let fixture: ComponentFixture<HallSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HallSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
