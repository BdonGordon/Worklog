import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import { IConfig, ISettings, IEnvironmentSettings, IWorklogDB } from '../../config/config';

const config: IConfig = require('../../config/config.json');
const settings: IEnvironmentSettings = config.settings[process.env.NODE_ENV];