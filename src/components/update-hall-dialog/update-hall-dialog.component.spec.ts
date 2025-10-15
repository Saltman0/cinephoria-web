import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHallDialogComponent } from './update-hall-dialog.component';

describe('UpdateHallDialogComponent', () => {
  let component: UpdateHallDialogComponent;
  let fixture: ComponentFixture<UpdateHallDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateHallDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHallDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
