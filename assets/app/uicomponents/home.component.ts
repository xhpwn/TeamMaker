import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-home',
    template: `    
    
<div *ngIf="!isLoggedIn()" class="text-center" style="padding-top: 5%; margin-left: 30%; margin-right: 30%; background-color: white">

<h1><span class="glyphicon glyphicon-indent-left"></span> TeamMaker</h1>

<h3>Vector Space Model based Team Generation</h3>

    <button class="btn btn-lg btn-success marginer" [routerLink]="['/auth/signin']" >Login</button>
    <button class="btn btn-lg btn-danger" [routerLink]="['/auth/signup']">Sign Up</button>
</div>

<div *ngIf="isLoggedIn()" class="text-center" style="padding-top: 5%; margin-left: 30%; margin-right: 30%; background-color: white">
    <h2>Hello, {{ username }}.</h2>
    <h1>Welcome to TeamMaker</h1>
    <div>
    <span style="font-size: 6em; padding-bottom: 6%; color: darkslateblue" class="glyphicon glyphicon-indent-left"></span>
    </div>
    <button style="margin-right: 2%" class="btn btn-lg btn-primary" [routerLink]="['/teams']">Tutorial</button>
    <button style="margin-right: 2%" class="btn btn-lg btn-success" [routerLink]="['/teams']">My Groups</button>
    <button class="btn btn-lg btn-danger" [routerLink]="['/auth']">Account</button>
</div>
<div class="text-center" style="padding-top: 5%; left: 50%; transform: translate(-50%, 0); position: fixed; padding-bottom: 5%; background-color: white">
    <app-ml></app-ml>
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