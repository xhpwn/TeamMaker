import { Routes, RouterModule } from "@angular/router";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);