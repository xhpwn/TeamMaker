import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Team } from './team.model';
import { ErrorService } from "../errors/error.service";

@Injectable()
export class MessageService {
    private teams: Team[] = [];

    constructor(private http: Http, private errorService: ErrorService) {
    }

    addMessage(team: Team) {
        const body = JSON.stringify(team);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:3000/team' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const message = new Team(
                    result.obj.teamName,
                    result.obj.user);
                this.teams.push(team);
                return message;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}