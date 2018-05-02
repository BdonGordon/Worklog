import { Request, Response, NextFunction } from 'express';
import { WorklogDoa } from '../dao/index';
import { IWorklogAttributes } from '../models/worklogModels/worklog';

/**
 * API Controller for Worklog
 */
export class WorklogController {

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    getWorklogs(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        return WorklogDoa
            .getWorklogs()
            .then((worklogList: Array<IWorklogAttributes>) => res.status(200).send({
                worklogList: worklogList
        })).catch((error: Error) => next(error));
    }

    /**
     * Creates the given worklog, then returns the created worklog
     * @param req { Request } express.Request
     * @param res { Response } express.Response
     * @param next { NextFunction } express.NextFunction
     */
    addWorklog(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        let newWorklog: IWorklogAttributes = req.body.worklog;
        let addedWorklog: IWorklogAttributes; 

        return WorklogDoa
            .addWorklog(newWorklog)
            .then((log: IWorklogAttributes) => {
                res.status(200).send({ worklog: log })
                addedWorklog = log;
            }).catch((error: Error) => next(error));

            
            //.catch((error: Error) => next(error));
    }

    //API STEP 3:
    deleteWorklog(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        return WorklogDoa
            .deleteWorklog(req.body.worklog)
            .then((worklogID: number) => res.status(200).send({
                WorklogID: worklogID
            })).catch((error: Error) => next(error));
    }
}

const instance: WorklogController = new WorklogController();
export default instance;