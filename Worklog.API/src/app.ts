import * as bodyParser from 'body-parser';
import * as express from 'express';
import expressValidator = require('express-validator');
import * as path from 'path';
import * as http from 'http';

import { IConfig, ISettings, IEnvironmentSettings, IWorklogDB } from './config/config';
const config: IConfig = require('./config/config.json');
const settings: IEnvironmentSettings = config.settings[process.env.NODE_ENV];

//import routes 
import indexRoute from './routes/index';

class App {
    public express: express.Application;
    private server: http.Server;
    private port: number;

    //don't know what this stuff is 
    public static bootstrap(): App {
        return new App();
    }

    constructor() {
        
    }

    //Configure Express middleware... don't know what this is either yet lol
}