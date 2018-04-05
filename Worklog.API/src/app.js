"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const expressValidator = require("express-validator");
const path = require("path");
const http = require("http");
const config = require('./config/config.json');
const settings = config.settings[process.env.NODE_ENV];
const index_1 = require("./routes/index");
const worklog_1 = require("./routes/worklog");
class App {
    static bootstrap() {
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
    middleware() {
        this.express.use(cors());
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));
        this.express.use(expressValidator());
        this.express.use(express.static(path.join(__dirname, 'public')));
    }
    verifyToken() {
        this.express.use(settings.baseRoutePath + '/', index_1.default);
    }
    routes() {
        this.express.use(settings.baseRoutePath + '/worklog', worklog_1.default);
    }
    config() {
        this.port = settings.port || 3000;
    }
    createServer() {
        this.server = http.createServer(this.express);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
    }
    handleExceptions() {
        process.on('uncaughtException', (err) => {
            if (err.code === 'ECONNRESET') {
                console.log(err.message);
            }
            else {
                throw err;
            }
        });
    }
}
const server = App.bootstrap();
exports.default = server.express;
//# sourceMappingURL=app.js.map