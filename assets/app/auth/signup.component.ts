import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
    selector: 'app-signup',
    template: `
    <div class="text-center paddingclass col-md-8 col-md-offset-2">
            <h2>Sign up for TeamMaker</h2>
        <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input
                        type="text"
                        id="firstName"
                        class="form-control"
                        formControlName="firstName">
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input
                        type="text"
                        id="lastName"
                        class="form-control"
                        formControlName="lastName">
            </div>
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
            <div class="form-group">
                <label for="skillset">Skillset</label><br>
                Example: "Javascript: 5, Python: 4"
                <input
                        type="text"
                        id="skillset"
                        class="form-control"
                        formControlName="skillset">
            </div>
            <div class="form-group">
                <label for="preferenceSet">Preferences</label><br>
                The teammate skillset you prefer
                <input
                        type="text"
                        id="preferenceSet"
                        class="form-control"
                        formControlName="preferenceSet">
            </div>
            <button
                    class="btn btn-primary"
                    type="submit"
                    [disabled]="!myForm.valid">Sign Up</button>
        </form>
    </div>
    `
})
export class SignupComponent implements OnInit {

    myForm: FormGroup;

    constructor(private authService: AuthService) {}

    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.skillset,
            this.myForm.value.preferenceSet,
            this.myForm.value.firstName,
            this.myForm.value.lastName
        );
        this.authService.signup(user)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
        this.myForm.reset();
        alert("Successfully Registered!");
    }


    ngOnInit() {
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            skillset: new FormControl(null, Validators.required),
            preferenceSet: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }

}