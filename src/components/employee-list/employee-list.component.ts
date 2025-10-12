import {Component, ElementRef, ViewChild} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {ApiService} from '../../services/api/api.service';
import {FooterComponent} from '../footer/footer.component';
import {NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {EmployeeRenderer} from '../../renderers/employee.renderer';
import {UserModel} from '../../models/user.model';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {DeleteEmployeeDialogComponent} from '../delete-employee-dialog/delete-employee-dialog.component';

@Component({
  selector: 'app-employee-list',
  imports: [
    HeaderComponent,
    FooterComponent,
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

  employeeIdToDelete: number = 0;

  isCreatingEmployee: boolean = false;

  @ViewChild(DeleteEmployeeDialogComponent) deleteEmployeeDialogComponent!: DeleteEmployeeDialogComponent;

  constructor(
    private readonly apiService: ApiService,
    private readonly localStorageService: LocalStorageService,
    private readonly employeeRenderer: EmployeeRenderer
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadEmployeeList();
  }

  public async submit() {
    this.isCreatingEmployee = true;

    await this.apiService.createUser(
      this.localStorageService.getJwtToken(),
      <string> this.employeeForm.value.email,
      <string> this.employeeForm.value.password,
      <string> this.employeeForm.value.firstName,
      <string> this.employeeForm.value.lastName,
      <string> this.employeeForm.value.phoneNumber,
      "employee"
    );

    this.isCreatingEmployee = false;

    await this.loadEmployeeList();
  }

  public openDeleteEmployeeDialog(id: number) {
    this.employeeIdToDelete = id;
    this.deleteEmployeeDialogComponent.showDeleteEmployeeDialog();
  }

  public async loadEmployeeList(): Promise<void> {
    this.resetEmployeeList();

    const jwtToken = await this.apiService.login(
      "baudoin.mathieu@protonmail.com", "0123456789"
    );

    this.localStorageService.addJwtToken(jwtToken.value);

    const employees: UserModel[] = await this.apiService.getUsers(
      this.localStorageService.getJwtToken(), "employee"
    );

    for (const employee of employees) {
      this.employeeList.push(this.employeeRenderer.render(employee));
    }
  }

  private resetEmployeeList(): void {
    this.employeeList = [];
  }

}
