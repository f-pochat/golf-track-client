import {gql, useMutation} from "@apollo/client";

export class Course {

    name;
    creator;
    holes;
    description;
    clubHouseLocation;
    holesList = [];

    constructor(name,creator,holes, description, clubHouseLocation) {
        this.name = name;
        this.creator = creator;
        this.holes = holes;
        this.description = description;
        this.clubHouseLocation = clubHouseLocation;
    }

    addHole = (hole) => {
        this.holesList.push(hole);
    }
}