import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { NoUserComponent } from "./nouser.component";

@Component({
    selector: 'app-teams',
    template: `
    <div class="text-center paddingclass col-md-8 col-md-offset-2">
        <h2>New Team</h2>
        <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
                <label for="email">Email</label>
                <input
                        type="email"
                        id="email"
                        class="form-control"
                        formControlName="email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input
                        type="password"
                        id="password"
                        class="form-control"
                        formControlName="password">
            </div>
            <button
                    class="btn btn-primary"
                    type="submit"
                    [disabled]="!myForm.valid">Submit</button>
        </form>
    </div>
    `
})

export class NewTeamComponent {

    myForm: FormGroup;

    constructor(private authService: AuthService) {}

    
    username: string;
    isLoggedIn() {
        this.username = localStorage.getItem('userName');
        return this.authService.isLoggedIn();
    }
}