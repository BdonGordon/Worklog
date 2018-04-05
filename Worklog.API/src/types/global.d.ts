
declare module '*.json' {
    const value: any;
    export default value;
}

interface Error {
    status?: number;
}


//declare module Express {
//    interface Response {
//        locals: {
//            user: IUserLocals
//        }
//    }
//    interface IUserLocals {
//        username: string;
//        displayName: string;
//        email: string;
//        sid?: string;
//        entities: string[];
//        roles: Array<number>;
//        employeeRefID: number;
//        employeeID: number;
//        facilityID: string;
//        aud?: string;
//        dn?: string;
//        exp: number;
//        iat: number;
//        iss: string;
//        sub: string;
//    }
//}

