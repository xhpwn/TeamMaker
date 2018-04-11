import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-home',
    templateUrl: `    
    
<div *ngIf="!isLoggedIn()" class="text-center">

<h1><span class="glyphicon glyphicon-indent-left"></span> TeamMaker</h1>

<h3>Intelligent team making</h3>

    <button class="btn btn-lg btn-success marginer" [routerLink]="['/auth/signin']" >Login</button>
    <button class="btn btn-lg btn-danger" [routerLink]="['/auth/signup']">Sign Up</button>
</div>

<div *ngIf="isLoggedIn()" class="text-center">
    <h2 style="padding-top: 5%">Hello, {{ username }}.</h2>
    <h6>Welcome to TeamMaker</h6>
    <div>
    <span style="font-size: 6em; padding-top: 2%; padding-bottom: 4%; color: darkslateblue" class="glyphicon glyphicon-indent-left"></span>
    </div>
    <button style="margin-right: 2%" class="btn btn-lg btn-success" [routerLink]="['/teams']">My Teams</button>
    <button class="btn btn-lg btn-danger" [routerLink]="['/auth']">My Account</button>
</div>
    `
})

export class HomeComponent {
    constructor(private authService: AuthService) {}

    username: string;

    isLoggedIn() {
        this.username = localStorage.getItem('userName');
        return this.authService.isLoggedIn();
    }
}