import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Team } from './team.model';
import { ErrorService } from "../errors/error.service";
import { Group } from "./group.model";

@Injectable()
export class TeamService {
    private teams: Team[] = [];

    private groups: Group[] = [];

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
        return this.http.get('https://teammaker-deployment.herokuapp.com/team')
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
                        team.members,
                        team._id)
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

    generateTeams(teamId: String) {
        return this.http.get('https://teammaker-deployment.herokuapp.com/team/generate/' + teamId)
        .map((response: Response) => response.json())
        .catch((error: Response) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    }

    addMember(team: Team, inviteEmail: String) {
        const body = JSON.stringify(inviteEmail);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get('https://teammaker-deployment.herokuapp.com/team/add/' + team.teamId + '/' + inviteEmail + '/', {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getGroups(teamId: String) {
        return this.http.get('https://teammaker-deployment.herokuapp.com/team/getGroups/' + teamId)
            .map((response: Response) => {
                const groups = response.json().obj;
                let transformedGroups: Group[] = [];
                for (let group of groups) {
                    transformedGroups.push(new Group(
                        group.groupNumber,
                        group.teamID,
                        group.members)
                    );
                }
                this.groups = transformedGroups;
                return transformedGroups;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}