"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
function addWorklog(worklog) {
    let date = new Date();
    return index_1.worklogDB.Worklog.create({
        WorklogID: null,
        Subject: worklog.Subject,
        Author: worklog.Author
    }).then((log) => {
        return index_1.worklogDB.Worklog.findOne({
            where: {
                WorklogID: log.WorklogID
            }
        });
    });
}
exports.addWorklog = addWorklog;
//# sourceMappingURL=worklog.js.map