import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";

import { Component, Input, OnInit } from "@angular/core";
import { Team } from "./team.model";
import { TeamService } from "./team.service";
import { Router } from "@angular/router";
import { Group } from "./group.model";

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
                <a data-toggle="collapse" [attr.data-target]="'#t' + team.teamId" style="color: darkblue" (click)="getGroups(team)">Teams</a> | 
                <a data-toggle="collapse" [attr.data-target]="'#m' + team.teamId" style="color: darkblue">Members</a> | 
                <a style="color: darkblue" (click)="onGenerate(team)">Generate</a>
            </div>
            <div style="padding-bottom: 2%;" id="{{'t' + team.teamId}}" class="collapse">Teams
                <div style="padding-top: 2%; color: red" *ngIf="!anyTeams()">No Teams yet! Hit the generate button after adding members!
                </div>
                <div style="padding-top: 2%; padding-bottom: 2%; color: black" *ngIf="anyTeams(groups)">
                    <div style="padding-bottom: 2%" *ngFor="let members of groups">Group {{members.groupNumber}}:
                        <div *ngFor="let each of members.members">{{each}}</div>
                    </div>
                </div>
            </div>
            <div style="padding-bottom: 2%;" id="{{'m' + team.teamId}}" class="collapse">Members
                <div style="padding-top: 2%; padding-bottom: 2%; color: red" *ngIf="!anyMembers()">No Members yet! Add someone to this group below!
                </div>
                <div style="padding-top: 2%; padding-bottom: 2%; color: black" *ngIf="anyMembers()">
                    <div *ngFor="let member of team.members">
                        <div *ngFor="let each of member">{{each.firstName}} {{each.lastName}} : {{ each.email }}</div>
                    </div>
                </div>
                <form [formGroup]="myForm" (ngSubmit)="addMember(team)">
                <div class="form-group" style="text-align: center">
                <input style="margin-bottom: 2%"
                        type="text"
                        id="inviteEmail"
                        class="form-control"
                        formControlName="inviteEmail">
                    <button
                    class="btn btn-primary"
                    type="submit"
                    [disabled]="!myForm.valid">Invite</button>
                    </div>
                </form>
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

export class TeamComponent implements OnInit {

    myForm: FormGroup;

    @Input() team: Team;

    groups: Group[];

    constructor(private teamService: TeamService, private router: Router) {}

    belongsToUser() {
        return localStorage.getItem('userId') == this.team.adminId;
    }

    anyMembers() {
        if (this.team.members.length.toString() != '0')
            return true;
        return false;
    }

    anyTeams(team: Team) {
        return true;
    }

    addMember(team: Team) {
        console.log(team);
        this.teamService.addMember(team, this.myForm.value.inviteEmail)
        .subscribe(
            data => console.log(data),
            error => console.error(error)
        );
        alert("User added");
        this.myForm.reset();
        this.router.navigate(['/home']);
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            inviteEmail: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ])
        });
    }

    onGenerate(team: Team) {
        this.teamService.generateTeams(team.teamId)
            .subscribe(
                data => console.log(data),
        );
        alert("Teams Generated");
    }

    getGroups(team) {
        console.log(team.teamId);
        this.teamService.getGroups(team.teamId)
            .subscribe(
                (groups: Group[]) => {
                    this.groups = groups;
            }
        );
    }

}