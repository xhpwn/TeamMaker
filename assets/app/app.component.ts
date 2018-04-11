import { Component } from '@angular/core';


@Component({
    selector: 'my-app',
    template: `
    <app-navbar></app-navbar>
    <app-home></app-home>
    <app-error></app-error>
`
})
export class AppComponent {
}