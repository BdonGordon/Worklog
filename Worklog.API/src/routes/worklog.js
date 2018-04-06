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
        this.router.post('/addWorklog', worklogController_1.default.addWorklog);
    }
}
exports.Worklog = Worklog;
const worklog = new Worklog();
const router = worklog.router;
exports.default = router;
//# sourceMappingURL=worklog.js.map