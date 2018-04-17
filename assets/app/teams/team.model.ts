export class Team {
    teamName: string;
    teamSize: Number;
    skills: String;
    adminId: string;
    adminEmail: string;
    members: [string];
    teamId?: string;

    constructor(teamName: string, teamSize: Number, skills: string, adminId: string, adminEmail: string, members: [string], teamId?: string) {
        this.teamName = teamName;
        this.teamSize = teamSize;
        this.skills = skills;
        this.adminId = adminId;
        this.adminEmail = adminEmail;
        this.members = members;
        this.teamId = teamId;
    }
}