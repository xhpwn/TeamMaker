import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { NoUserComponent } from "./nouser.component";

@Component({
    selector: 'app-teams',
    template: `
    <div>
        <h1>Teams</h1>
        <div class="container">
            <div class="col-md-4"><button [routerLink]="['myteams']" class="btn btn-success"><span class="glyphicon glyphicon-user"></span> My Teams</button></div>
            <div class="col-md-4"></div>
            <div class="col-md-4"><button [routerLink]="['newteam']" class="btn btn-primary"><span class="glyphicon glyphicon-plus"></span> New Team</button></div>
        </div>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    </div>
    `
})

export class TeamsComponent {

    constructor(private authService: AuthService) {}

    username: string;
    isLoggedIn() {
        this.username = localStorage.getItem('userName');
        return this.authService.isLoggedIn();
    }
}