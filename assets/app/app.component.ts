import { Component } from '@angular/core';


@Component({
    selector: 'my-app',
    template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-error></app-error>
`
})
export class AppComponent {
}