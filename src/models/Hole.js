export class Hole{
    num;
    locationMidOfGreen;
    locationMidOfFw;
    teebox = [];


    constructor(num, locationMidOfGreen, locationMidOfFw) {
        this.num = num;
        this.locationMidOfGreen = locationMidOfGreen;
        this.locationMidOfFw = locationMidOfFw;
    }

    addTeebox = (name,color,par,scoringIndex,locationTeebox) => {
        this.teebox.push(new HoleTeebox(name,color,par,scoringIndex,locationTeebox));
    }

    modifyTeebox = (name,color,par,scoringIndex, locationTeebox) => {
        this.teebox.filter(value => {
            return value.name !== name;
        })
        this.teebox.push(new HoleTeebox(name,color,par,scoringIndex,locationTeebox))
    }
}

class HoleTeebox{
    name;
    color;
    par;
    scoringIndex;
    locationTeeBox


    constructor(name, color, par, scoringIndex, locationTeeBox) {
        this.name = name;
        this.color = color;
        this.par = par;
        this.scoringIndex = scoringIndex;
        this.locationTeeBox = locationTeeBox;
    }
}