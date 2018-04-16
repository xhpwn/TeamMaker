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
    <h2>New Group</h2>
    <div class="text-center col-md-8 col-md-offset-2">
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
            <div class="form-group">
            <label for="skills">Skills Needed</label>
            <input
                    type="text"
                    id="skills"
                    class="form-control"
                    [ngModel]="team?.skills"
                    name="skills"
                    required>
            </div>
            <label for="sel1">Team Size</label>
            <select 
                class="form-control"
                    id="teamSize"
                    class="form-control"
                    [ngModel]="team?.teamSize"
                    name="teamSize"
                    required
                >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select>
            <button style="margin-top: 2%" class="btn btn-primary" type="submit">Create</button>
        </form>
    </div>
    `
})

export class NewTeamComponent {

    team: Team;

    constructor(private teamService: TeamService, private authService: AuthService, private router: Router) {}

    onSubmit(form: NgForm) {
        
        const team = new Team(form.value.teamName, form.value.teamSize, form.value.skills, localStorage.getItem('userId'), localStorage.getItem('userEmail'));
        this.teamService.addTeam(team)
            .subscribe(
                data => console.log(data),
        );
        form.resetForm();
        alert("Team Successfully Created!");
        this.router.navigate(['/teams', 'myteams']);
    }
    
    username: string;
    isLoggedIn() {
        this.username = localStorage.getItem('userName');
        return this.authService.isLoggedIn();
    }
}