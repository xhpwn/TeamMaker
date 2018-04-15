import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Team } from './team.model';
import { ErrorService } from "../errors/error.service";

@Injectable()
export class TeamService {
    private teams: Team[] = [];

    constructor(private http: Http, private errorService: ErrorService) {
    }

    addTeam(team: Team) {
        
        const body = JSON.stringify(team);
        console.log(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('https://teammaker-deployment.herokuapp.com/team/newteam' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const team = new Team(
                    result.obj.teamName,
                    result.obj.teamSize,
                    result.obj.adminId,
                    result.obj.adminEmail);
                this.teams.push(team);
                return team;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getTeams() {
        return this.http.get('https://teammaker-deployment.herokuapp.com/team')
            .map((response: Response) => {
                const teams = response.json().obj;
                let transformedTeams: Team[] = [];
                for (let team of teams) {
                    transformedTeams.push(new Team(
                        team.teamName,
                        team.teamSize,
                        team.adminId,
                        team.adminEmail)
                    );
                }
                this.teams = transformedTeams;
                return transformedTeams;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}