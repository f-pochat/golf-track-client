import {gql, useMutation} from "@apollo/client";

const NULL_LOCATION = {lat:0, lng: 0};

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
        this.holesList = this.emptyHoleList();
    }

    addHole = (number,hole) => {
        this.holesList[number-1] = hole;
    }

    emptyHoleList = () => {
        const aux = [];
        for (let i = 0; i < 18; i++) {
            aux.push(new Hole(i+1,3,1,null,NULL_LOCATION,NULL_LOCATION))
        }
        return aux;
    }

    setHoles = (num) => {
        if (num !== this.holesList.length){
            const auxHoles = [];
            if (num === 9) {
                for (let i = 0; i < 9; i++) {
                    auxHoles.push(this.holesList[i])
                }
                this.holesList = auxHoles;
            }else{
                for (let i = 0; i < 9; i++) {
                    auxHoles.push(this.holesList[i]);
                }
                for (let i = 9; i < 18; i++) {
                    auxHoles.push(new Hole(i+1,3,1,NULL_LOCATION,NULL_LOCATION))
                }
            }
            this.holesList = auxHoles;
        }

    }

    setName = (name) => {
        this.name = name;
    }

    setDescription = (desc) => {
        this.description = desc;
    }

    setClubHouseLoc = (loc) => {
        this.clubHouseLocation = loc;
    }

}



export class Hole{
    isSaved;
    num;
    par;
    scoringIndex;
    distance;
    locationMidOfGreen;
    locationTeebox;


    constructor(num, par, scoringIndex,distance, locationMidOfGreen, locationTeebox) {
        this.isSaved = false;
        this.num = num;
        this.par = par;
        this.scoringIndex = scoringIndex;
        this.distance = distance;
        this.locationMidOfGreen = locationMidOfGreen;
        this.locationTeebox= locationTeebox;
    }

    setSaved = () => {
        this.isSaved = true;
    }
}