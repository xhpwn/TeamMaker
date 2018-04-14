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
                {{ team.admin }}
            </div>
            <div class="config">
                <a (click)="onEdit()">Edit</a>
                <a (click)="onDelete()">Delete</a>
            </div>
        </footer>
    </article>
    `,
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})

export class TeamComponent {

    @Input() team: Team;

    constructor(private teamService: TeamService) {}

    belongsToUser() {
        return localStorage.getItem('userId') == this.team.admin;
    }

}