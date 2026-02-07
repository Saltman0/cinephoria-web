export class BookingHistoryModel {
    bookingId: number;
    date: Date;

    constructor(bookingId: number, date: Date) {
        this.bookingId = bookingId;
        this.date = date;
    }
}
