import { Component, OnInit } from "@angular/core";

import { Error } from "./error.model";
import { ErrorService } from "./error.service";

@Component({
    selector: 'app-error',
    template: `
    <div class="backdrop" [ngStyle]="{'display': display}"></div>
    <div class="modal" tabindex="-1" role="dialog" [ngStyle]="{'display': display}">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-label="Close" (click)="onErrorHandled()"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">{{ error?.title }}</h4>
                </div>
                <div class="modal-body">
                    <p>{{ error?.message }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" (click)="onErrorHandled()">Close</button>
                </div>
            </div>
        </div>
    </div>
    `,
    styles: [`
        .backdrop {
            background-color: rgba(0,0,0,0.6);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
        }
    `]
})
export class ErrorComponent implements OnInit {
    error: Error;
    display = 'none';

    constructor(private errorService: ErrorService) {}

    onErrorHandled() {
        this.display = 'none';
    }

    ngOnInit() {
        this.errorService.errorOccurred
            .subscribe(
                (error: Error) => {
                    this.error = error;
                    this.display = 'block';
                }
            );
    }
}