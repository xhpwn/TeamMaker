export class Team {
    teamName: string;
    teamSize: Number;
    adminId: string;
    adminEmail: string;

    constructor(teamName: string, teamSize: Number, adminId: string, adminEmail: string) {
        this.teamName = teamName;
        this.teamSize = teamSize;
        this.adminId = adminId;
        this.adminEmail = adminEmail;
    }
}