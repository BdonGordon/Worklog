import { Router } from 'express';
import WorklogController from '../controllers/worklogController';

export class Worklog {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    private init(): void {
        this.router.get('/getWorklogs', WorklogController.getWorklogs);
        this.router.post('/addWorklog', WorklogController.addWorklog);
        this.router.delete('/deleteWorklog', WorklogController.deleteWorklog);
    }
}

//object of the class Worklog
const worklog: Worklog = new Worklog();
const router: Router = worklog.router;

//exporting the Router object of Worklog to app.ts to use
export default router;