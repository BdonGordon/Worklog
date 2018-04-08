/**
* This is mandatory to set up the database
**/

export interface IWorklogDB {
    username: string;
    password: string;
    database: string;
    host: string;
}

export interface ISettings {
    [key: string]: IEnvironmentSettings;
}

export interface IEnvironmentSettings {
    baseRoutePath: string;
    port: number;
    baseURL: string;
    applicationURL: string;
    worklogDB: IWorklogDB;
}

export interface IConfig {
    settings: ISettings;
}