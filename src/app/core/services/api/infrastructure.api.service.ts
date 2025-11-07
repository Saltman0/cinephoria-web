import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {GetHallSettingsGql} from "../../graphql/get-hall-settings.gql";
import {GetSeatsGql} from "../../graphql/get-seats.gql";
import {HallFactory} from "../../factories/hall.factory";
import {SeatFactory} from "../../factories/seat.factory";
import {environment} from "../../../../environments/environment";
import {CinemaModel} from "../../models/cinema.model";
import {HallModel} from "../../models/hall.model";
import {SeatModel} from "../../models/seat.model";

@Injectable({
    providedIn: 'root'
})
export class InfrastructureApiService {
    constructor(
        private readonly router: Router,
        private readonly getHallSettingsGql: GetHallSettingsGql,
        private readonly getSeatsGql: GetSeatsGql,
        private readonly hallFactory: HallFactory,
        private readonly seatFactory: SeatFactory
    ) {}

    public async getCinemas(): Promise<CinemaModel[]> {
        const response: Response = await fetch(environment.INFRASTRUCTURE_API_URL + `cinema`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async createHall(token: string, number: number, projectionQuality: string, cinemaId: number): Promise<any> {
        const response: Response = await fetch(environment.INFRASTRUCTURE_API_URL + "hall", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "number": number,
                "projectionQuality": projectionQuality,
                "cinemaId": cinemaId
            })
        });

        if (!response.ok) {
            if (response.status === 401) {
                this.router.navigate(['/login']);
            }
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async updateHall(
        token: string,
        hallId: number,
        number: number,
        projectionQuality: string,
        cinemaId: number
    ): Promise<any> {
        const response: Response = await fetch(environment.INFRASTRUCTURE_API_URL + `hall/${encodeURIComponent(hallId)}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "number": number,
                "projectionQuality": projectionQuality,
                "cinemaId": cinemaId
            })
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async getHalls(cinemaId: number): Promise<HallModel[]> {
        let halls: HallModel[] = [];

        let result = await this.getHallSettingsGql.watch(
            {cinemaId: cinemaId},
            {fetchPolicy: "no-cache"}
        ).result();

        result.data.halls.forEach((hall: HallModel) => {
            halls.push(
                this.hallFactory.create(
                    hall.id, hall.number, hall.projectionQuality, hall.cinema, hall.currentShowtime, hall.incidents, hall.seats
                )
            );
        });

        return halls;
    }

    public async deleteHall(token: string, hallId: number): Promise<any> {
        const response: Response = await fetch(environment.INFRASTRUCTURE_API_URL + `hall/${encodeURIComponent(hallId)}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async createSeat(token: string, row: string, number: number, hallId: number): Promise<any> {
        const response: Response = await fetch(environment.INFRASTRUCTURE_API_URL + "seat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "row": row,
                "number": number,
                "hallId": hallId
            })
        });

        if (!response.ok) {
            if (response.status === 401) {
                this.router.navigate(['/login']);
            }
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async getSeats(hallId: number): Promise<SeatModel[]> {
        let seats: SeatModel[] = [];

        let result = await this.getSeatsGql.watch(
            {hallId: hallId},
            {fetchPolicy: "no-cache"}
        ).result();

        result.data.seats.forEach((seat: SeatModel) => {
            seats.push(this.seatFactory.create(seat.id, seat.row, seat.number, seat.hall, seat.bookingSeats));
        });

        return seats;
    }

    public async deleteSeat(token: string, seatId: number): Promise<any> {
        const response: Response = await fetch(environment.INFRASTRUCTURE_API_URL + `seat/${encodeURIComponent(seatId)}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        return response.json();
    }
}