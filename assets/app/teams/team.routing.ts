import { Routes, RouterModule } from "@angular/router";

import { NewTeamComponent } from "../uicomponents/newteam.component";

const TEAM_ROUTES: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'newteam', component: NewTeamComponent }
];

export const teamRouting = RouterModule.forChild(TEAM_ROUTES);