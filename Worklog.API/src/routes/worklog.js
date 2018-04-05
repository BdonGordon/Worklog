"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Worklog {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
    }
}
exports.Worklog = Worklog;
const worklog = new Worklog();
const router = worklog.router;
exports.default = router;
//# sourceMappingURL=worklog.js.map