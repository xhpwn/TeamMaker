import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { Component } from "@angular/core";
import { TeamService } from "../teams/team.service";
import { NoUserComponent } from "./nouser.component";
import { Team } from "../teams/team.model";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-teams',
    template: `
    <div class="text-center paddingclass col-md-8 col-md-offset-2">
        <h2>New Team</h2>
        <form (ngSubmit)="onSubmit(f)" #f="ngForm">
            <div class="form-group">
            <label for="teamName">Name</label>
            <input
                    type="text"
                    id="teamName"
                    class="form-control"
                    [ngModel]="team?.teamName"
                    name="teamName"
                    required>
            </div>
            <button class="btn btn-primary" type="submit">Submit</button>
        </form>
    </div>
    `
})

export class NewTeamComponent {

    team: Team;

    constructor(private teamService: TeamService, private authService: AuthService) {}

    onSubmit(form: NgForm) {
        
        const team = new Team(form.value.teamName, localStorage.getItem('userId'));
        this.teamService.addTeam(team)
            .subscribe(
                data => console.log(data),
        );
        form.resetForm();
    }
    
    username: string;
    isLoggedIn() {
        this.username = localStorage.getItem('userName');
        return this.authService.isLoggedIn();
    }
}