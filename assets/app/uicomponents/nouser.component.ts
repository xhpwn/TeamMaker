import { Component } from "@angular/core";

@Component({
    selector: 'app-nouser',
    template: `
    <div style="padding-top: 5%; padding-bottom: 5%; margin-left: 30%; margin-right: 30%; background-color: white">
        <h1><span class="glyphicon glyphicon-indent-left"></span> TeamMaker</h1>
        <p class="text-center" style="color: #d24b4b; padding-bottom: 2%; font-size: 4em"><span class="glyphicon glyphicon-exclamation-sign"></span></p>
        <h2>Please log in to use TeamMaker</h2>
        <div class="text-center">
            <button class="btn btn-lg btn-success marginer" [routerLink]="['/auth/signin']">Login</button>
            <button class="btn btn-lg btn-danger" [routerLink]="['/auth/signup']">Sign Up</button>
        </div>
    </div>
    `
})

export class NoUserComponent {

}