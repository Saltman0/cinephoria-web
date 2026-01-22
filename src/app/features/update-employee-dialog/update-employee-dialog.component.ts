import {Component, ElementRef, output, ViewChild} from '@angular/core';
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';
import {UserApiService} from "../../core/services/api/user.api.service";

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
    ),
    employeeId: new FormControl(
        0, [Validators.required]
    ),
  });

  readonly employeeUpdatedEvent = output<boolean>();

  isUpdatingEmployee: boolean = false;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly userApiService: UserApiService
  ) {}

  public async updateEmployee(): Promise<void> {
    this.isUpdatingEmployee = true;

    await this.userApiService.updateUser(
      Number(this.employeeForm.value.employeeId),
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

  public showUpdateEmployeeDialog(
      employeeId: number,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string
  ): void {
    this.employeeForm.patchValue({
      employeeId: employeeId,
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber
    });

    this.updateEmployeeDialog.nativeElement.showModal();
  }

  public closeUpdateEmployeeDialog(): void {
    this.updateEmployeeDialog.nativeElement.close();
  }
}
