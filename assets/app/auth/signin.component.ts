import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "./user.model";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-signin',
    template: `
    <div class="text-center paddingclass col-md-8 col-md-offset-2">
        <h2>Sign in to your account</h2>
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
                    [disabled]="!myForm.valid">Login</button>
        </form>
    </div>
    `
})
export class SigninComponent {
    myForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit() {
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('userName', data.userName);
                    localStorage.setItem('userEmail', data.userEmail);
                    localStorage.setItem('skillset', data.skillset);
                    localStorage.setItem('preferenceSet', data.preferenceSet);
                    this.router.navigateByUrl('/');
                },
                error => console.error(error)
            );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}