export class Group {
    groupNumber: number;
    teamID: string;
    members: [string]

    constructor(groupNumber: number, teamID: string, members: [string]) {
        this.groupNumber = groupNumber;
        this.teamID = teamID;
        this.members = members;
    }
}