import { Component, OnInit } from "@angular/core";
import { Team } from "./team.model";
import { TeamService } from "./team.service";
import { TeamComponent } from "./team.component";

@Component({
    selector: 'app-team-list',
    template: `
    <h2>My Groups</h2>
        <div class="col-md-8 col-md-offset-2">
            <app-team
                   [team]="team"
                    *ngFor="let team of teams"></app-team>
        </div>
    `,
    styles: [`
    `]
})

export class TeamListComponent implements OnInit {
    teams: Team[];

    constructor(private teamService: TeamService) {}

    ngOnInit() {
        this.teamService.getTeams()
            .subscribe(
                (teams: Team[]) => {
                    this.teams = teams;
                }
            );
    }
}