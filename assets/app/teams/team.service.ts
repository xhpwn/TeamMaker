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
        return this.http.post('http://localhost:3000/team/newteam' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const team = new Team(
                    result.obj.teamName,
                    result.obj.teamSize,
                    result.obj.skills,
                    result.obj.adminId,
                    result.obj.adminEmail,
                    result.obj._id);
                this.teams.push(team);
                return team;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getTeams() {
        return this.http.get('http://localhost:3000/team')
            .map((response: Response) => {
                const teams = response.json().obj;
                let transformedTeams: Team[] = [];
                for (let team of teams) {
                    transformedTeams.push(new Team(
                        team.teamName,
                        team.teamSize,
                        team.skills,
                        team.adminId,
                        team.adminEmail,
                        team.teamId)
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

    generateTeams() {
        return this.http.get('http://localhost:3000/team/generate')

    }

    addMember(teamName: String, inviteEmail: String) {
        console.log(inviteEmail);
        const body = JSON.stringify(inviteEmail);
        const headers = new Headers({'Content-Type': 'application/json'});
        
        return this.http.post('http://localhost:3000/team/add/' + teamName + '/' + inviteEmail, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}