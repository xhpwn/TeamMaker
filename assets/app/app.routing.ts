import { Routes, RouterModule } from "@angular/router";

import { AuthenticationComponent } from "./auth/authentication.component";
import { HomeComponent } from "./uicomponents/home.component";
import { TeamsComponent } from "./uicomponents/teams.component";
import { NoUserComponent } from "./uicomponents/nouser.component";
import { NewTeamComponent } from "./uicomponents/newteam.component";
import { TutorialComponent } from "./uicomponents/tutorial.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'teams', component: TeamsComponent, loadChildren: './teams/team.module#TeamModule' },
    { path: 'nouser', component: NoUserComponent },
    { path: 'tutorial', component: TutorialComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);