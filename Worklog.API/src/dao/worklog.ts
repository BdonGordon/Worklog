import { worklogDB } from '../models/index';
import { IWorklogAttributes } from '../models/worklogModels/worklog';

/**
 * We will be retrieving an array of IWorklogs from the database hence the Signature of the Promise
 */
export function getWorklogs(): Promise<Array<IWorklogAttributes>> {
    return worklogDB.Worklog.findAll();
}




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
        Description: worklog.Description,
        Tasks: worklog.Tasks
    }).then((log: IWorklogAttributes) => {
        return worklogDB.Worklog.findOne({
            where: {
                WorklogID: log.WorklogID
            }
        });
        });
}

//API STEP 2: 
export function deleteWorklog(worklog: IWorklogAttributes): Promise<number> {
    const WorklogID: number = worklog.WorklogID;

    return worklogDB.Worklog.destroy({
        where: {
            WorklogID: WorklogID
        }
    }).then((rowsAffected: number) => {
        return WorklogID;
    });
}