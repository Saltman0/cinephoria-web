import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {GetBookingsGql} from "../../graphql/get-bookings.gql";
import {GetBookedSeatsGql} from "../../graphql/get-booked-seats.gql";
import {BookingFactory} from "../../factories/booking.factory";
import {SeatFactory} from "../../factories/seat.factory";
import {BookingModel} from "../../models/booking.model";
import {SeatModel} from "../../models/seat.model";
import {BookingSeatModel} from "../../models/bookingSeat.model";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BookingApiService {
    constructor(
        private readonly getBookingsGQL: GetBookingsGql,
        private readonly getBookedSeatsGql: GetBookedSeatsGql,
        private readonly bookingFactory: BookingFactory,
        private readonly seatFactory: SeatFactory,
        private readonly router: Router
    ) {}

    public async getBookings(userId: number | null, showtimeId: number | null): Promise<BookingModel[]> {
        let bookings: BookingModel[] = [];

        let result = await this.getBookingsGQL.watch(
            {userId: userId, showtimeId: showtimeId},
            {fetchPolicy: "no-cache"}
        ).result();

        result.data.bookings.forEach((booking: BookingModel) => {
            bookings.push(
                this.bookingFactory.create(booking.id, booking.qrCode, booking.user, booking.showtime, booking.bookingSeats)
            );
        });

        return bookings;
    }

    public async createBooking(token: string, userId: number, showtimeId: number, seatIds: number[]): Promise<any> {
        const response: Response = await fetch(environment.BOOKING_API_URL + "booking", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userId": userId,
                "showtimeId": showtimeId,
                "seats": seatIds
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

    public async getBookedSeats(showtimeId: number, userId: number | null): Promise<SeatModel[]> {
        let seats: SeatModel[] = [];

        let result = await this.getBookedSeatsGql.watch(
            {showtimeId: showtimeId, userId: userId},
            {fetchPolicy: "no-cache"}
        ).result();

        result.data.bookings.forEach((booking: BookingModel) => {

            booking.bookingSeats.forEach((bookingSeat: BookingSeatModel) => {

                const seat: SeatModel = bookingSeat.seat;
                seats.push(this.seatFactory.create(seat.id, seat.row, seat.number, seat.hall, seat.bookingSeats));

            });

        });

        return seats;
    }

    public async createPayment(token: string, price: number): Promise<any> {
        const response: Response = await fetch(environment.BOOKING_API_URL + "payment", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"price": price})
        });

        if (!response.ok) {
            if (response.status === 401) {
                this.router.navigate(['/login']);
            }
            throw new Error(response.status.toString());
        }

        return response.json();
    }
}