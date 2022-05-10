

export class Hole{
    num;
    par;
    scoringIndex;
    locationMidOfGreen;
    locationMidOfFw;
    teebox = [];


    constructor(num, par, scoringIndex, locationMidOfGreen, locationMidOfFw) {
        this.num = num;
        this.par = par;
        this.scoringIndex = scoringIndex;
        this.locationMidOfGreen = locationMidOfGreen;
        this.locationMidOfFw = locationMidOfFw;
    }
}