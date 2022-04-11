import {gql, useMutation} from "@apollo/client";

export class Course {

    name;
    creator;
    holes;
    description;
    clubHouseLocation;
    teeboxes = [];
    holesList = [];

    constructor(name,creator,holes, description, clubHouseLocation, teeboxes) {
        this.name = name;
        this.creator = creator;
        this.holes = holes;
        this.description = description;
        this.clubHouseLocation = clubHouseLocation;
        this.teeboxes = teeboxes;
    }

    addHole = (hole) => {
        this.holesList.push(hole);
    }
}