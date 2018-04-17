import { Team } from "../teams/team.model";

export class User {
    constructor(public email: string,
                public password: string,
                public skillset: string,
                public preferenceSet: string,
                public firstName?: string,
                public lastName?: string){}
}