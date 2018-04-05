"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    initRoute(req, res, next) {
        res.json({
            message: 'Hello from Worklog Web API'
        });
    }
    init() {
        this.router.get('/', this.initRoute);
    }
}
exports.IndexRoute = IndexRoute;
const indexRoute = new IndexRoute();
const router = indexRoute.router;
exports.default = router;
//# sourceMappingURL=index.js.map