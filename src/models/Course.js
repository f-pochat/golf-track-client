
export class Course {

    name;
    holes;
    description;
    clubHouseLocation;
    teeboxes = [];
    holesList = [];

    constructor(name, holes, description, clubHouseLocation, teeboxes) {
        this.name = name;
        this.holes = holes;
        this.description = description;
        this.clubHouseLocation = clubHouseLocation;
        this.teeboxes = teeboxes;
    }

    addHole = (hole) => {
        this.holesList.push(hole);
    }

    sendCourse = () => {
        console.log(this);
    }
}