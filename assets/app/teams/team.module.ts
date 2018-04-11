import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { teamRouting } from "./team.routing";
import { NewTeamComponent } from '../uicomponents/newteam.component';

@NgModule({
    declarations: [
        NewTeamComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        teamRouting
    ]
})
export class TeamModule {

}