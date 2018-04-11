import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { NoUserComponent } from "./nouser.component";

@Component({
    selector: 'app-teams',
    template: `
    <div>
        <h1>Teams</h1>
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