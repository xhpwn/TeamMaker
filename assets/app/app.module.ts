import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.compnent';
import { routing } from './app.routing';
import { AuthService } from './auth/auth.service';
import { ErrorService } from './errors/error.service';
import { HomeComponent } from './uicomponents/home.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        routing
    ],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}