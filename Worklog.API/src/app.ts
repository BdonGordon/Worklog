import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import expressValidator = require('express-validator');
import * as path from 'path';
import * as http from 'http';

import { IConfig, ISettings, IEnvironmentSettings, IWorklogDB } from './config/config';
const config: IConfig = require('./config/config.json');
const settings: IEnvironmentSettings = config.settings[process.env.NODE_ENV];

//import routes 
import indexRoute from './routes/index';
import worklog from './routes/worklog';

class App {
    public express: express.Application;
    private server: http.Server;
    private port: number;

    //don't know what this stuff is lol
    public static bootstrap(): App {
        return new App();
    }

    constructor() {
        this.express = express();
        this.middleware();
        this.verifyToken();
        this.routes();
        this.config();
        this.createServer();
        this.listen();
        this.handleExceptions();
    }

    //Configure Express middleware... don't know what this is either yet lol
    private middleware(): void {
        this.express.use(cors());
        this.express.use(bodyParser.json({ limit: '50mb' })); //THIS IS NEEDED. bodyParser is VERY IMPORTANT
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));
        this.express.use(expressValidator());
        this.express.use(express.static(path.join(__dirname, 'public')));
    }

    //I don't think I need most of the things that are in this function based on SRED ... still idk what this is lol
    private verifyToken(): void {
        this.express.use(settings.baseRoutePath + '/', indexRoute);

        this.express.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            req.params.decoded = true;
            next();
        });
    }

    private routes(): void {
        this.express.use(settings.baseRoutePath + '/worklog', worklog);
    }

    //Server config and listeners down below ... perhaps pretty understandable
    private config(): void {
        this.port = settings.port || 3000;
    }

    private createServer(): void {
        this.server = http.createServer(this.express);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.server.timeout = 0;
    }

    private handleExceptions(): void {
        process.on('uncaughtException', (err: any) => {
            if (err.code === 'ECONNRESET') {
                console.log(err.message);
            } else {
                throw err;
            }
        });
    }
}

const server = App.bootstrap();
export default server.express;