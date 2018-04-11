import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: `
    <div *ngIf="isLoggedIn()" class="text-center">
        <h2 class="paddingclass">Hello, {{ username }}.</h2>
        <h3>Your email address is {{ useremail }}</h3>
    </div>
    <div class="text-center paddingclass">
        <a [routerLink]="['signin']"><button class="btn btn-lg btn-success marginer" *ngIf="!isLoggedIn()">Sign In</button></a>
        <a [routerLink]="['signup']"><button class="btn btn-lg btn-primary" routerLinkActive="active" *ngIf="!isLoggedIn()">Sign Up</button></a>
        <a><button class="btn btn-lg btn-danger" routerLinkActive="active" *ngIf="isLoggedIn()" (click)="onLogout()">Logout</button></a>
    </div>
    <div class="row spacing">
        <router-outlet></router-outlet>
    </div>
    `
})
export class AuthenticationComponent {
    constructor(private authService: AuthService, private router: Router) {}

    username: string;
    useremail: string;

    isLoggedIn() {
        if (this.authService.isLoggedIn()) {
            this.username = localStorage.getItem('userName');
            this.useremail = localStorage.getItem('userEmail');
        }
        return this.authService.isLoggedIn();
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
    }
}