import {Component, ElementRef, Input, output, ViewChild} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-delete-employee-dialog',
  imports: [],
  templateUrl: './delete-employee-dialog.component.html',
  styleUrl: './delete-employee-dialog.component.scss'
})
export class DeleteEmployeeDialogComponent {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly apiService: ApiService
  ) {}

  @ViewChild('deleteEmployeeDialog') deleteEmployeeDialog!: ElementRef<HTMLDialogElement>;

  @Input() employeeId: number = 0;

  isDeletingEmployee: boolean = false;

  readonly employeeDeletedEvent = output<boolean>();

  public async deleteEmployee(employeeId: number) {
    this.isDeletingEmployee = true;

    const jwtToken = await this.apiService.login(
      "baudoin.mathieu@protonmail.com", "0123456789"
    );

    this.localStorageService.addJwtToken(jwtToken.value);

    await this.apiService.deleteUser(this.localStorageService.getJwtToken(), employeeId);

    this.employeeDeletedEvent.emit(true);

    this.closeDeleteEmployeeDialog();

    this.isDeletingEmployee = false;
  }

  public showDeleteEmployeeDialog() {
    this.deleteEmployeeDialog.nativeElement.showModal();
  }

  public closeDeleteEmployeeDialog() {
    this.deleteEmployeeDialog.nativeElement.close();
  }
}
