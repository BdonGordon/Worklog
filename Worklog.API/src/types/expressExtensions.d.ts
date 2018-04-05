
import * as express from 'express';
declare module 'express' {
    interface Response {
        locals: {
            user: IUserLocals
        }

    }
    interface IUserLocals {
        username: string;
        displayName: string;
        email: string;
        sid?: string;
        entities: string[];
        roles: Array<number>;
        employeeRefID: number;
        employeeID: number;
        facilityID: string;
        aud?: string;
        dn?: string;
        exp: number;
        iat: number;
        iss: string;
        sub: string;
    }
}
