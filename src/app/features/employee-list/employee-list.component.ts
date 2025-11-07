import {Component, ViewChild} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {FooterComponent} from '../../shared/footer/footer.component';
import {NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {EmployeeRenderer} from '../../core/renderers/employee.renderer';
import {UserModel} from '../../core/models/user.model';
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {DeleteEmployeeDialogComponent} from '../delete-employee-dialog/delete-employee-dialog.component';
import {UpdateEmployeeDialogComponent} from '../update-employee-dialog/update-employee-dialog.component';
import {UserApiService} from "../../core/services/api/user.api.service";

@Component({
  selector: 'app-employee-list',
  imports: [
    HeaderComponent,
    FooterComponent,
    UpdateEmployeeDialogComponent,
    DeleteEmployeeDialogComponent,
    NgOptimizedImage,
    NgOptimizedImage,
    ReactiveFormsModule,
    TitleCasePipe,
    FormsModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
  employeeList: { id: number, email: string, firstName: string, lastName: string, phoneNumber: string }[] = [];

  employeeForm = new FormGroup({
    firstName: new FormControl(
      "", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]
    ),
    lastName: new FormControl(
      "", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]
    ),
    email: new FormControl(
      "", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]
    ),
    password: new FormControl(
      "", [Validators.required, Validators.minLength(12), Validators.maxLength(64)]
    ),
    phoneNumber: new FormControl(
      "",
      [Validators.required, Validators.pattern("[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}")]
    )
  });

  employeeIdToUpdate: number = 0;
  employeeEmailToUpdate: string = "";
  employeeFirstNameToUpdate: string = "";
  employeeLastNameToUpdate: string = "";
  employeePhoneNumberToUpdate: string = "";

  employeeIdToDelete: number = 0;

  isCreatingEmployee: boolean = false;

  @ViewChild(UpdateEmployeeDialogComponent) updateEmployeeDialogComponent!: UpdateEmployeeDialogComponent;
  @ViewChild(DeleteEmployeeDialogComponent) deleteEmployeeDialogComponent!: DeleteEmployeeDialogComponent;

  constructor(
    private readonly userApiService: UserApiService,
    private readonly localStorageService: LocalStorageService,
    private readonly employeeRenderer: EmployeeRenderer
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadEmployeeList();
  }

  public async createEmployee() {
    this.isCreatingEmployee = true;

    await this.userApiService.createUser(
      <string> this.localStorageService.getJwtToken(),
      <string> this.employeeForm.value.email,
      <string> this.employeeForm.value.password,
      <string> this.employeeForm.value.firstName,
      <string> this.employeeForm.value.lastName,
      <string> this.employeeForm.value.phoneNumber,
      "employee"
    );

    this.employeeForm.reset();

    this.isCreatingEmployee = false;

    await this.loadEmployeeList();
  }

  public openUpdateEmployeeDialog(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ): void {
    this.employeeIdToUpdate = id;
    this.employeeEmailToUpdate = email;
    this.employeeFirstNameToUpdate = firstName;
    this.employeeLastNameToUpdate = lastName;
    this.employeePhoneNumberToUpdate = phoneNumber;
    this.updateEmployeeDialogComponent.showUpdateEmployeeDialog();
  }

  public openDeleteEmployeeDialog(id: number) {
    this.employeeIdToDelete = id;
    this.deleteEmployeeDialogComponent.showDeleteEmployeeDialog();
  }

  public async loadEmployeeList(): Promise<void> {
    this.resetEmployeeList();

    const employees: UserModel[] = await this.userApiService.getUsers("employee");

    for (const employee of employees) {
      this.employeeList.push(this.employeeRenderer.render(employee));
    }
  }

  private resetEmployeeList(): void {
    this.employeeList = [];
  }

}
