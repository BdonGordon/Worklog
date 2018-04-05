import { Router } from 'express';

export class Worklog {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    private init(): void {

    }
}

//object of the class Worklog
const worklog: Worklog = new Worklog();
const router: Router = worklog.router;

//exporting the Router object of Worklog to app.ts to use
export default router;