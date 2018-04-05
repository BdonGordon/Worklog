"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require('./config/config.json');
var settings = config.settings[process.env.NODE_ENV];
var App = /** @class */ (function () {
    function App() {
    }
    //don't know what this stuff is 
    App.bootstrap = function () {
        return new App();
    };
    return App;
}());
//# sourceMappingURL=app.js.map