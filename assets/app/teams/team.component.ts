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
                <a style="color: darkblue" (click)="onEdit()">View Teams</a> | 
                <a style="color: darkblue" (click)="onEdit()">Manage Group</a> | 
                <a style="color: darkblue" (click)="onDelete()">Delete</a>
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
        }
    `]
})

export class TeamComponent {

    @Input() team: Team;

    constructor(private teamService: TeamService) {}

    belongsToUser() {
        return localStorage.getItem('userId') == this.team.adminId;
    }

}