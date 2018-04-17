import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    template: `
    <div *ngIf="isLoggedIn()" class="text-center">
        <h2 class="paddingclass">Hello, {{ username }}.</h2>
        <p style="font-size: 2em; color: green; padding-bottom: 1%">Email: {{ useremail }}</p>
        <p style="font-size: 2em; color: green;">ID: {{ userId }}</p>
    </div>
    <div class="text-center paddingclass" style="padding-bottom: 2%">
        <a [routerLink]="['signin']"><button class="btn btn-lg btn-success marginer" *ngIf="!isLoggedIn()">Sign In</button></a>
        <a [routerLink]="['signup']"><button class="btn btn-lg btn-primary" routerLinkActive="active" *ngIf="!isLoggedIn()">Sign Up</button></a>
        <a><button class="btn btn-lg btn-danger" routerLinkActive="active" *ngIf="isLoggedIn()" (click)="onLogout()">Logout</button></a>
    </div>
    <div class="row spacing" style="border-radius: 20px; background-color: white; margin-left: 30%; margin-right: 30%; padding-bottom: 5%">
        <router-outlet></router-outlet>
    </div>
    `
})
export class AuthenticationComponent {
    constructor(private authService: AuthService, private router: Router) {}

    username: string;
    useremail: string;
    userId: string;

    isLoggedIn() {
        if (this.authService.isLoggedIn()) {
            this.username = localStorage.getItem('userName');
            this.useremail = localStorage.getItem('userEmail');
            this.userId = localStorage.getItem('userId');
        }
        return this.authService.isLoggedIn();
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
    }
}