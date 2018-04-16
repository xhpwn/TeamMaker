import { Component, Input } from "@angular/core";
import { Team } from "./team.model";
import { TeamService } from "./team.service";

@Component({
    selector: 'app-team',
    template: `
    <article class="panel panel-default" *ngIf="belongsToUser()">
        <div class="panel-body">
            {{ team.teamName }}
        </div>
        <footer class="panel-footer">
            <div class="author">
                Owner : {{ team.adminEmail }}
            </div>
            <div class="config">
                <a data-toggle="collapse" data-target="#teams" style="color: darkblue" (click)="onEdit()">Teams</a> | 
                <a data-toggle="collapse" data-target="#members" style="color: darkblue" (click)="onEdit()">Manage Group</a> | 
                <a style="color: darkblue" (click)="onGenerate()">Generate</a>
            </div>
            <div style="padding-bottom: 2%;" id="teams" class="collapse">Teams
                <div style="padding-top: 2%; color: red" *ngIf="!anyTeams()">No Teams yet! Hit the generate button after adding members!
                </div>
            </div>
            <div style="padding-bottom: 2%;" id="members" class="collapse">Members
                <div style="padding-top: 2%; color: red" *ngIf="!anyMembers()">No Members yet! Add someone to this group below!
                </div>
                <div style="padding-top: 2%; color: red" *ngIf="anyMembers()">
                </div>
            </div>
        </footer>
    </article>
    `,
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 50%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 49%;
            padding-bottom: 2%;
        }
        a:hover {
            cursor: pointer;
        }
    `]
})

export class TeamComponent {

    @Input() team: Team;

    constructor(private teamService: TeamService) {}

    belongsToUser() {
        return localStorage.getItem('userId') == this.team.adminId;
    }

    anyMembers() {
        return false;
    }

    anyTeams() {
        return false;
    }

}