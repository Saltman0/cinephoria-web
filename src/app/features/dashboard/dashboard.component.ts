import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from '../../shared/header/header.component';
import {FooterComponent} from '../../shared/footer/footer.component';
import {NavMobileComponent} from '../nav-mobile/nav-mobile.component';
import {NgOptimizedImage} from "@angular/common";
import {InfrastructureApiService} from "../../core/services/api/infrastructure.api.service";
import {CinemaModel} from "../../core/models/cinema.model";
import {CategoryModel} from "../../core/models/category.model";
import {MovieApiService} from "../../core/services/api/movie.api.service";

@Component({
  selector: 'app-contact',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    NavMobileComponent,
    NgOptimizedImage
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  cinemaList: { id: number, name: string }[] = [];
  categoryList: { id: number, name: string }[] = [];
  dateStart: Date = new Date();
  dateEnd: Date = new Date();

  selectedCinema: number|null = null;
  selectedCategory: number|null = null;
  selectedDateStart: Date|null = null;
  selectedDateEnd: Date|null = null;

  isLoadingDashboard: boolean = false;

  constructor(
      private readonly movieApiService: MovieApiService,
      private readonly infrastructureApiService: InfrastructureApiService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadCinemaList();
    await this.loadCategoryList();
  }

  private async loadCinemaList(): Promise<void> {
    this.cinemaList = [];

    const cinemas: CinemaModel[] = await this.infrastructureApiService.getCinemas();

    for (const cinema of cinemas) {
      this.cinemaList.push({
        id: cinema.id,
        name: cinema.name
      });
    }
  }

  private async loadCategoryList(): Promise<void> {
    this.categoryList = [];

    const categories: CategoryModel[] = await this.movieApiService.getCategories();

    for (const category of categories) {
      this.categoryList.push({
        id: category.id,
        name: category.name
      });
    }
  }

  public loadDashboard() {
    // TODO Charger dashboard
  }
}
