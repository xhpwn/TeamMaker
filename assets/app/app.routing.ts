import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./uicomponents/home.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTES);