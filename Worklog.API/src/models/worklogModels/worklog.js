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
        }
    }, {
        tableName: 'tbworklogs',
        timestamps: true
    });
    return Worklog;
}
exports.default = defineWorklog;
//# sourceMappingURL=worklog.js.map