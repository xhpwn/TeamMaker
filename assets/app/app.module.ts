import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.compnent';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        HttpModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}