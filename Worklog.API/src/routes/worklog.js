"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const worklogController_1 = require("../controllers/worklogController");
class Worklog {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/getWorklogs', worklogController_1.default.getWorklogs);
        this.router.post('/addWorklog', worklogController_1.default.addWorklog);
        this.router.delete('/deleteWorklog', worklogController_1.default.deleteWorklog);
    }
}
exports.Worklog = Worklog;
const worklog = new Worklog();
const router = worklog.router;
exports.default = router;
//# sourceMappingURL=worklog.js.map