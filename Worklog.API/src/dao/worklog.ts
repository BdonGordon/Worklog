import { worklogDB } from '../models/index';
import { IWorklogAttributes } from '../models/worklogModels/worklog';

/**
 * We will be retrieving an array of IWorklogs from the database hence the Signature of the Promise
 */
export function getWorklogs(): Promise<Array<IWorklogAttributes>> {
    return worklogDB.Worklog.findAll();
}

/*
include: [{
            model: worklogDB.Worklog
        }]
*/


/**
 * "Creates the given worklog, then returns the newly created worklog"
 * @param worklog
 */
export function addWorklog(worklog: IWorklogAttributes): Promise<IWorklogAttributes> {
    let date: Date = new Date(); //this will be added LATER

    return worklogDB.Worklog.create({
        WorklogID: null,
        Subject: worklog.Subject,
        Author: worklog.Author,
        DateCreated: worklog.DateCreated,
        StartTime: worklog.StartTime,
        HoursWorked: worklog.HoursWorked,
        Description: worklog.Description
    }).then((log: IWorklogAttributes) => {
        return worklogDB.Worklog.findOne({
            where: {
                WorklogID: log.WorklogID
            }
        });
    });
}