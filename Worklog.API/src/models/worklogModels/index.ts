import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import { IConfig, ISettings, IEnvironmentSettings, IWorklogDB } from '../../config/config';

const config: IConfig = require('../../config/config.json');
const settings: IEnvironmentSettings = config.settings[process.env.NODE_ENV];

//importing from the MODEL of worklog
import { IWorklogAttributes, IWorklogInstance } from './worklog';

export interface IDbConnectionConfig {
    Worklog: Sequelize.Model<IWorklogInstance, IWorklogAttributes>;
    sequelize: Sequelize.Sequelize; //added and probably needed
}

//Including the db stuff below 
const worklogDB: any = {};

const dbConfig: IWorklogDB = settings.worklogDB;
export const sequelize: Sequelize.Sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
);
//don't know where 'module' came from lol
const basename: string = path.basename(module.filename);

//A whole lot of unknowningness is occurring here lol
fs.readdirSync(__dirname).filter((file: string): boolean => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach((file: string) => {
    const model: any = sequelize.import(path.join(__dirname, file));
    worklogDB[model.name] = model;
    });

Object.keys(worklogDB).forEach((modelName: string) => {
    if (worklogDB[modelName].associate) {
        worklogDB[modelName].associate(worklogDB);
    }
});

worklogDB.sequelize = sequelize;
worklogDB.Sequelize = Sequelize;

export default worklogDB as IDbConnectionConfig;