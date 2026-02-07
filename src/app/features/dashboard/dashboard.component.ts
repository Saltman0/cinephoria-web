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
import ApexCharts from 'apexcharts';
import {DashboardApiService} from "../../core/services/api/dashboard.api.service";
import {BookingHistoryModel} from "../../core/models/bookingHistory.model";

@Component({
  selector: 'app-dashboard',
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

  selectedCinema: number|null = null;
  selectedCategory: number|null = null;
  selectedDateStart: Date|null = null;
  selectedDateEnd: Date|null = null;

  constructor(
      private readonly movieApiService: MovieApiService,
      private readonly infrastructureApiService: InfrastructureApiService,
      private readonly dashboardApiService: DashboardApiService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadCinemaList();
    await this.loadCategoryList();
    await this.loadDashboard();
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

  public async loadDashboard() {
    const bookingHistory: BookingHistoryModel[] = await this.dashboardApiService.getBookingHistory();

    const countsByDate = bookingHistory.reduce<Record<string, number>>(
        (acc, { bookingId, date }: BookingHistoryModel) => {
          const newDate: Date = new Date(date);
          const day: number = newDate.getDate();
          const month: number = newDate.getMonth()+1;
          const year: number = newDate.getFullYear();
          const formattedDate: string = day+"/"+month+"/"+year;

          acc[formattedDate] = (acc[formattedDate] ?? 0) + 1;
          return acc;
        },
        {}
    );

    const arrNbBookingByDate = Object.entries(countsByDate).map(
        ([date, count]) => ({ date, count })
    );


    let arrNbBooking: number[] = [];
    let arrDate: string[] = [];
    for (const nbBookingByDate of arrNbBookingByDate) {
      arrNbBooking.push(nbBookingByDate.count);
      arrDate.push(nbBookingByDate.date);
    }


    const options = {
      chart: {
        type: 'area'
      },
      series: [{
        name: 'Réservations',
        data: arrNbBooking
      }],
      xaxis: {
        categories: arrDate
      },
      tooltip: {
        enabled: false
      }
    }

    const chart: ApexCharts = new ApexCharts(document.querySelector("#chart"), options);

    await chart.render();
  }

  public selectCinemaId(event: Event): void {
    const value: string = (event.target as HTMLSelectElement).value;
    this.selectedCinema = Number(value);
  }

  public selectCategoryId(event: Event): void {
    const value: string = (event.target as HTMLSelectElement).value;
    this.selectedCategory = Number(value);
  }

  public selectShowtimeDateStart(event: Event): void {
    const value: string = (event.target as HTMLSelectElement).value;
    this.selectedDateStart = new Date(value);
  }

  public selectShowtimeDateEnd(event: Event): void {
    const value: string = (event.target as HTMLSelectElement).value;
    this.selectedDateEnd = new Date(value);
  }
}
