import * as Sequelize from 'sequelize';
import { IDbConnectionConfig } from './index';

export interface IWorklogAttributes {
    WorklogID: number;
    Subject: string;
    Author: string;
}

export interface IWorklogInstance extends IWorklogAttributes, Sequelize.Instance<IWorklogAttributes> { }

export default function defineWorklog(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.Sequelize): Sequelize.Model<IWorklogInstance, IWorklogAttributes> {
    //Here's where I will be basically 'creating' the table with the Sequelize format; this is based off the attributes I defined above 
    const Worklog: Sequelize.Model<IWorklogInstance, IWorklogAttributes> = sequelize.define('Worklog', {
        WorklogID: {
            type: Sequelize.BIGINT,
            field: 'WorklogID', //referring to the name of the column in the database... i believe
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Subject: {
            type: Sequelize.STRING,
            field: 'Subject',
            allowNull: true
        },
        Author: {
            type: Sequelize.STRING,
            field: 'Author',
            allowNull: true
        }
    }, {
            //Here is where we refer to the table name and any type of forgein keys.. what I have here should be enough
            tableName: 'tbworklogs',
        });

    return Worklog;
}