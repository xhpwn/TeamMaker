import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { teamRouting } from "./team.routing";
import { NewTeamComponent } from '../uicomponents/newteam.component';
import { TeamService } from './team.service';

@NgModule({
    declarations: [
        NewTeamComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        teamRouting,
        FormsModule
    ],
    providers: [TeamService]
})
export class TeamModule {

}