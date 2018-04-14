import { Routes, RouterModule } from "@angular/router";

import { NewTeamComponent } from "../uicomponents/newteam.component";
import { TeamListComponent } from  './team-list.component';

const TEAM_ROUTES: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'newteam', component: NewTeamComponent },
    { path: 'myteams', component: TeamListComponent }
];

export const teamRouting = RouterModule.forChild(TEAM_ROUTES);