import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHallDialogComponent } from './add-hall-dialog.component';

describe('AddHallDialogComponent', () => {
  let component: AddHallDialogComponent;
  let fixture: ComponentFixture<AddHallDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHallDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHallDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
