import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {ApiService} from '../../services/api/api.service';
import {FooterComponent} from '../footer/footer.component';
import {NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {EmployeeRenderer} from '../../renderers/employee.renderer';
import {UserModel} from '../../models/user.model';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FooterComponent,
    NgOptimizedImage,
    NgOptimizedImage,
    ReactiveFormsModule,
    TitleCasePipe
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  employeeList: { id: number, email: string, firstName: string, lastName: string, phoneNumber: string }[] = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly localStorageService: LocalStorageService,
    private readonly employeeRenderer: EmployeeRenderer
  ) {}

  async ngOnInit(): Promise<void> {
    const jwtToken = await this.apiService.login(
      "baudoin.mathieu@protonmail.com", "0123456789"
    );

    this.localStorageService.addJwtToken(jwtToken.value);

    const employees: UserModel[] = await this.apiService.getUsers(this.localStorageService.getJwtToken(), "employee");

    for (const employee of employees) {
      this.employeeList.push(await this.employeeRenderer.render(employee));
    }
  }
}
