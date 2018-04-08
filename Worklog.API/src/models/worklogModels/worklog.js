"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
function defineWorklog(sequelize, dataTypes) {
    const Worklog = sequelize.define('Worklog', {
        WorklogID: {
            type: Sequelize.BIGINT,
            field: 'WorklogID',
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
        },
        DateCreated: {
            type: Sequelize.DATE,
            field: 'DateCreated',
            allowNull: true
        },
        StartTime: {
            type: Sequelize.STRING,
            field: 'StartTime',
            allowNull: true
        },
        HoursWorked: {
            type: Sequelize.BIGINT,
            field: 'HoursWorked',
            allowNull: true
        },
        Description: {
            type: Sequelize.STRING,
            field: 'Description',
            allowNull: true
        }
    }, {
        tableName: 'tbworklogs',
        timestamps: false
    });
    return Worklog;
}
exports.default = defineWorklog;
//# sourceMappingURL=worklog.js.map