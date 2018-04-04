export interface ISetting {
    baseRoutePath: string;
    port: number;
    baseURL: string;
    refreshTokenTime: number;
}

export interface ISettings {
    [key: string]: ISetting;
}

export interface IConfig {
    env: string;
    settings: ISettings;
}