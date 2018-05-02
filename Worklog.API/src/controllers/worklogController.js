"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
class WorklogController {
    getWorklogs(req, res, next) {
        return index_1.WorklogDoa
            .getWorklogs()
            .then((worklogList) => res.status(200).send({
            worklogList: worklogList
        })).catch((error) => next(error));
    }
    addWorklog(req, res, next) {
        let newWorklog = req.body.worklog;
        let addedWorklog;
        return index_1.WorklogDoa
            .addWorklog(newWorklog)
            .then((log) => {
            res.status(200).send({ worklog: log });
            addedWorklog = log;
        }).catch((error) => next(error));
    }
    deleteWorklog(req, res, next) {
        return index_1.WorklogDoa
            .deleteWorklog(req.body.worklog)
            .then((worklogID) => res.status(200).send({
            WorklogID: worklogID
        })).catch((error) => next(error));
    }
}
exports.WorklogController = WorklogController;
const instance = new WorklogController();
exports.default = instance;
//# sourceMappingURL=worklogController.js.map