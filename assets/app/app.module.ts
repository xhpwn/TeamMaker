import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { HomeComponent } from './uicomponents/home.component';
import { TeamsComponent } from './uicomponents/teams.component';
import { NoUserComponent } from './uicomponents/nouser.component';
import { NavbarComponent } from './uicomponents/navbar.compnent';
import { MlComponent } from './uicomponents/ml.component';
import { TutorialComponent } from './uicomponents/tutorial.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        NavbarComponent,
        ErrorComponent,
        HomeComponent,
        TeamsComponent,
        NoUserComponent,
        MlComponent,
        TutorialComponent
    ],
    imports: [
        BrowserModule,
        routing,
        HttpModule
    ],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}