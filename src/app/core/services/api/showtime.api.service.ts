import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {GetShowtimesGql} from "../../graphql/get-showtimes.gql";
import {ShowtimeFactory} from "../../factories/showtime.factory";
import {ShowtimeModel} from "../../models/showtime.model";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ShowtimeApiService {
    constructor(
        private readonly getShowtimesGql: GetShowtimesGql,
        private readonly showtimeFactory: ShowtimeFactory,
        private readonly router: Router
    ) {}

    public async getShowtimes(movieId: number): Promise<ShowtimeModel[]> {
        let showtimes: ShowtimeModel[] = [];

        let result = await this.getShowtimesGql.watch(
            {movieId: movieId},
            {fetchPolicy: "no-cache"}
        ).result();

        result.data.showtimes.forEach((showtime: ShowtimeModel) => {
            showtimes.push(
                this.showtimeFactory.create(
                    showtime.id, showtime.startTime, showtime.endTime, showtime.price,
                    showtime.movie, showtime.hall, showtime.bookings
                )
            );
        });

        return showtimes;
    }

    public async createShowtime(
        token: string,
        movieId: number,
        hallId: number,
        startTime: string,
        endTime: string,
        price: number
    ): Promise<any> {
        const response: Response = await fetch(environment.SHOWTIME_API_URL + "showtime", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "movieId": movieId,
                "hallId": hallId,
                "startTime": startTime,
                "endTime": endTime,
                "price": price
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

    public async updateShowtime(
        token: string,
        showtimeId: number,
        movieId: number,
        hallId: number,
        startTime: string,
        endTime: string,
        price: number
    ): Promise<any> {
        const response: Response = await fetch(environment.SHOWTIME_API_URL + `showtime/${encodeURIComponent(showtimeId)}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "movieId": movieId,
                "hallId": hallId,
                "startTime": startTime,
                "endTime": endTime,
                "price": price
            })
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async deleteShowtime(token: string, showtimeId: number) {
        const response: Response = await fetch(environment.SHOWTIME_API_URL + `showtime/${encodeURIComponent(showtimeId)}`, {
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