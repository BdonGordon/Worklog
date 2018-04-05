"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
/**
* Express Router for Index
**/
var IndexRoute = /** @class */ (function () {
    function IndexRoute() {
        this.router = express_1.Router();
        this.init();
    }
    IndexRoute.prototype.initRoute = function (req, res, next) {
        res.json({
            message: 'Hello from Worklog Web API'
        });
    };
    //Gets the route path to this function 
    IndexRoute.prototype.init = function () {
        this.router.get('/', this.initRoute);
    };
    return IndexRoute;
}());
exports.IndexRoute = IndexRoute;
var indexRoute = new IndexRoute();
var router = indexRoute.router;
exports.default = router;
//# sourceMappingURL=index.js.map