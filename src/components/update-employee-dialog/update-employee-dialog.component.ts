import {Component, ElementRef, Input, output, ViewChild} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {ApiService} from '../../services/api/api.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-update-employee-dialog',
  imports: [
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './update-employee-dialog.component.html',
  styleUrl: './update-employee-dialog.component.scss'
})
export class UpdateEmployeeDialogComponent {
  @Input() employeeId: number = 0;
  @Input() firstName: string = "";
  @Input() lastName: string = "";
  @Input() email: string = "";
  @Input() password: string = "";
  @Input() phoneNumber: string = "";
  @ViewChild('updateEmployeeDialog') updateEmployeeDialog!: ElementRef<HTMLDialogElement>;

  employeeForm = new FormGroup({
    email: new FormControl(
      "", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]
    ),
    password: new FormControl(
      "", [Validators.required, Validators.minLength(12), Validators.maxLength(64)]
    ),
    firstName: new FormControl(
      "", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]
    ),
    lastName: new FormControl(
      "", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]
    ),
    phoneNumber: new FormControl(
      "",
      [Validators.required, Validators.pattern("[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}")]
    )
  });

  readonly employeeUpdatedEvent = output<boolean>();

  isUpdatingEmployee: boolean = false;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly apiService: ApiService
  ) {}

  public async updateEmployee(employeeId: number) {
    this.isUpdatingEmployee = true;

    await this.apiService.updateUser(
      employeeId,
      <string> this.localStorageService.getJwtToken(),
      <string> this.employeeForm.value.email,
      <string> this.employeeForm.value.password,
      <string> this.employeeForm.value.firstName,
      <string> this.employeeForm.value.lastName,
      <string> this.employeeForm.value.phoneNumber,
      "employee"
    );

    this.employeeUpdatedEvent.emit(true);

    this.closeUpdateEmployeeDialog();

    this.isUpdatingEmployee = false;
  }

  public showUpdateEmployeeDialog() {
    this.updateEmployeeDialog.nativeElement.showModal();
  }

  public closeUpdateEmployeeDialog() {
    this.updateEmployeeDialog.nativeElement.close();
  }
}
