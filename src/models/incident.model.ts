import {HallModel} from "./hall.model";

export class IncidentModel {
    id: number;
    type: string;
    description: string;
    date: Date;
    solved: boolean;
    hall: HallModel;


    constructor(id: number, type: string, description: string, date: Date, solved: boolean, hall: HallModel) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.date = date;
        this.solved = solved;
        this.hall = hall;
    }
}
