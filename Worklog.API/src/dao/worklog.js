"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
function getWorklogs() {
    return index_1.worklogDB.Worklog.findAll();
}
exports.getWorklogs = getWorklogs;
function addWorklog(worklog) {
    let date = new Date();
    return index_1.worklogDB.Worklog.create({
        WorklogID: null,
        Subject: worklog.Subject,
        Author: worklog.Author,
        DateCreated: worklog.DateCreated,
        StartTime: worklog.StartTime,
        HoursWorked: worklog.HoursWorked,
        Description: worklog.Description,
        Tasks: worklog.Tasks
    }).then((log) => {
        return index_1.worklogDB.Worklog.findOne({
            where: {
                WorklogID: log.WorklogID
            }
        });
    });
}
exports.addWorklog = addWorklog;
function deleteWorklog(worklog) {
    const WorklogID = worklog.WorklogID;
    return index_1.worklogDB.Worklog.destroy({
        where: {
            WorklogID: WorklogID
        }
    }).then((rowsAffected) => {
        return WorklogID;
    });
}
exports.deleteWorklog = deleteWorklog;
//# sourceMappingURL=worklog.js.map