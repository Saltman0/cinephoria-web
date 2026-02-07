import {Component, ElementRef, Input, output, ViewChild} from '@angular/core';
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {UserApiService} from "../../core/services/api/user.api.service";

@Component({
  selector: 'app-delete-employee-dialog',
  imports: [],
  templateUrl: './delete-employee-dialog.component.html',
  styleUrl: './delete-employee-dialog.component.scss'
})
export class DeleteEmployeeDialogComponent {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly userApiService: UserApiService
  ) {}

  @ViewChild('deleteEmployeeDialog') deleteEmployeeDialog!: ElementRef<HTMLDialogElement>;

  @Input() employeeId: number = 0;

  isDeletingEmployee: boolean = false;

  readonly employeeDeletedEvent = output<boolean>();

  public async deleteEmployee(employeeId: number) {
    this.isDeletingEmployee = true;

    await this.userApiService.deleteUser(<string> this.localStorageService.getJwtToken(), employeeId);

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
