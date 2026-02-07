import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {BookingHistoryModel} from "../../models/bookingHistory.model";

@Injectable({
    providedIn: 'root'
})
export class DashboardApiService {
    constructor() {}

    public async getBookingHistory(): Promise<BookingHistoryModel[]> {
        const response: Response = await fetch(environment.DASHBOARD_API_URL + `dashboard/bookingHistory`, {
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
}